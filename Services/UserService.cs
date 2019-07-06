using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using IOTGW_Admin_Panel.Helpers;
using IOTGW_Admin_Panel.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;

namespace WebApi.Services
{
    public interface IUserService
    {
        Task<User> Authenticate(string username, string password);
        IEnumerable<User> GetAll(); //Task
        Task<User> GetById(int id);

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

        public async Task<User> Authenticate(string username, string password)
        {
            var user = await _context.Users.SingleOrDefaultAsync(x => x.Username == username && x.Password == password);

            // return null if user not found
            if (user == null)
                return null;

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
            await _context.SaveChangesAsync();

            // remove password before returning
            user.Password = null;

            return user;
        }

        public IEnumerable<User> GetAll() //async
        {
            return _context.Users.AsEnumerable().Select(record => new User()
            {
                Id = record.Id,
                Username = record.Username,
                Password = null,
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
        public async Task<User> GetById(int id)
        {
            // var User = await _context.Users.FindAsync(id);
            var user = await _context.Users.FirstOrDefaultAsync(x => x.Id == id);

            // return user without password
            if (user != null)
                user.Password = null;

            return user;
        }
    }
}