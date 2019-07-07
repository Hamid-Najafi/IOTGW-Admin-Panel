using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using IOTGW_Admin_Panel.Helpers;
using IOTGW_Admin_Panel.Models;

namespace IOTGW_Admin_Panel.Services
{
    public interface IUserService
    {
        // Dont use Task<> Cause cant catch : throw new AppException
        User Authenticate(string username, string password);
        IEnumerable<User> GetAll();
        User GetById(int id);
        User Create(User user, string password);
        void Update(User user, string password = null);
        void Delete(int id);
    }

    public class UserService : IUserService
    {

        private readonly AppSettings _appSettings;
        private readonly DataBaseContext _context;

        public UserService(IOptions<AppSettings> appSettings, DataBaseContext context)
        {
            _appSettings = appSettings.Value;
            _context = context;
        }

        public User Authenticate(string username, string password)
        {
            if (string.IsNullOrEmpty(username))
                throw new AppException("Username is required");

            if (string.IsNullOrEmpty(password))
                throw new AppException("Password is required");

            var user = _context.Users.SingleOrDefault(x => x.Username == username);

            // check if username exists
            if (user == null)
                throw new AppException("User not found");

            // check if password is correct
            if (!VerifyPasswordHash(password, user.PasswordHash, user.PasswordSalt))
                throw new AppException("Password is Wrong");

            // authentication successful so generate jwt token
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(_appSettings.Secret);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]
                {
                    new Claim(ClaimTypes.Name, user.Id.ToString()),
                    new Claim(ClaimTypes.Role, user.Role)
                }),
                Expires = DateTime.UtcNow.AddDays(7),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            user.Token = tokenHandler.WriteToken(token);

            _context.Entry(user).State = EntityState.Modified;
            _context.SaveChanges();

            // remove password before returning
            user.PasswordHash = null;
            user.PasswordSalt = null;

            return user;
        }

        public IEnumerable<User> GetAll()
        {
            if (!_context.Users.Any())
                throw new AppException("No User");

            return _context.Users.AsEnumerable().Select(record => new User()
            {
                Id = record.Id,
                Username = record.Username,
                PasswordHash = null,
                PasswordSalt = null,
                Token = null,
                Email = record.Email,
                Role = record.Role,
                FirstName = record.FirstName,
                LastName = record.LastName,
                EnrollmentDate = record.EnrollmentDate,
                Address = record.Address,
                City = record.City,
                Country = record.Country,
                PostalCode = record.PostalCode,
                CompanyName = record.CompanyName,
                Gateways = record.Gateways
            });
        }
        public User GetById(int id)
        {
            var user = _context.Users.Find(id);
            //var user = _context.Users.FirstOrDefault(x => x.Id == id);
            if (user == null)
                throw new AppException("User not found");

            // return user without passwords credentials
            user.PasswordHash = null;
            user.PasswordSalt = null;

            return user;
        }
        public User Create(User user, string password)
        {
            // validation
            if (string.IsNullOrWhiteSpace(password))
                throw new AppException("Password is required");

            if (_context.Users.Any(x => x.Username == user.Username))
                throw new AppException("Username '" + user.Username + "' is already taken");

            if (_context.Users.Any(x => x.Email == user.Email))
                throw new AppException("Email '" + user.Email + "' is already taken");

            byte[] passwordHash, passwordSalt;
            CreatePasswordHash(password, out passwordHash, out passwordSalt);

            user.Password = null;
            user.PasswordHash = passwordHash;
            user.PasswordSalt = passwordSalt;

            _context.Users.Add(user);
            _context.SaveChanges();

            user.PasswordHash = null;
            user.PasswordSalt = null;

            return user;
        }
        public void Update(User userParam, string password = null)
        {
            var user = _context.Users.Find(userParam.Id);

            if (user == null)
                throw new AppException("User not found");

            if (userParam.Username != null)
            {
                if (userParam.Username != user.Username)
                {
                    // username has changed so check if the new username is already taken
                    if (_context.Users.Any(x => x.Username == userParam.Username))
                        throw new AppException("Username " + userParam.Username + " is already taken");
                }
                user.Username = userParam.Username;
            }
            if (userParam.Email != null)
            {
                if (userParam.Email != user.Email)
                {
                    // email has changed so check if the new email is already taken
                    if (_context.Users.Any(x => x.Email == userParam.Email))
                        throw new AppException("Email " + userParam.Email + " is already taken");
                }
                user.Email = userParam.Email;
            }

            // update user properties / cant chane Role
            if (!string.IsNullOrWhiteSpace(userParam.FirstName))
                user.FirstName = userParam.FirstName;

            if (!string.IsNullOrWhiteSpace(userParam.LastName))
                user.LastName = userParam.LastName;

            if (!string.IsNullOrWhiteSpace(userParam.Address))
                user.Address = userParam.Address;

            if (!string.IsNullOrWhiteSpace(userParam.City))
                user.City = userParam.City;

            if (!string.IsNullOrWhiteSpace(userParam.Country))
                user.Country = userParam.Country;

            if (userParam.PostalCode != 0)
                user.PostalCode = userParam.PostalCode;

            if (!string.IsNullOrWhiteSpace(userParam.CompanyName))
                user.CompanyName = userParam.CompanyName;

            // update password if it was entered
            if (!string.IsNullOrWhiteSpace(password))
            {
                byte[] passwordHash, passwordSalt;
                CreatePasswordHash(password, out passwordHash, out passwordSalt);

                user.PasswordHash = passwordHash;
                user.PasswordSalt = passwordSalt;
            }

            _context.Users.Update(user);
            _context.SaveChanges();
        }
        public void Delete(int id)
        {
            var user = _context.Users.Find(id);

            if (user == null)
                throw new AppException("User not found");

            else
            {
                _context.Users.Remove(user);
                _context.SaveChanges();
            }
        }

        // private helper methods
        private static void CreatePasswordHash(string password, out byte[] passwordHash, out byte[] passwordSalt)
        {
            if (password == null) throw new ArgumentNullException("password");
            if (string.IsNullOrWhiteSpace(password)) throw new ArgumentException("Value cannot be empty or whitespace only string.", "password");

            using (var hmac = new System.Security.Cryptography.HMACSHA512())
            {
                passwordSalt = hmac.Key;
                passwordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
            }
        }

        private static bool VerifyPasswordHash(string password, byte[] storedHash, byte[] storedSalt)
        {
            if (password == null) throw new ArgumentNullException("password");
            if (string.IsNullOrWhiteSpace(password)) throw new ArgumentException("Value cannot be empty or whitespace only string.", "password");
            if (storedHash.Length != 64) throw new ArgumentException("Invalid length of password hash (64 bytes expected).", "passwordHash");
            if (storedSalt.Length != 128) throw new ArgumentException("Invalid length of password salt (128 bytes expected).", "passwordHash");

            using (var hmac = new System.Security.Cryptography.HMACSHA512(storedSalt))
            {
                var computedHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
                for (int i = 0; i < computedHash.Length; i++)
                {
                    if (computedHash[i] != storedHash[i]) return false;
                }
            }

            return true;
        }
    }
}