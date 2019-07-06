using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using IOTGW_Admin_Panel.Helpers;
using IOTGW_Admin_Panel.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;

namespace WebApi.Services
{
    public interface IUserService
    {
        User Authenticate(string username, string password);
        IEnumerable<User> GetAll();
    }

    public class UserService : IUserService
    {

        // users hardcoded for simplicity, store in a db with hashed passwords in production applications
        // private List<User> _users = new List<User>
        // {
        //     new User { Id = 1, FirstName = "Test", LastName = "User", Username = "test", Password = "test" }
        // };

        private readonly AppSettings _appSettings;
        private readonly DataBaseContext _context;

        public UserService(IOptions<AppSettings> appSettings, DataBaseContext context)
        {
            _appSettings = appSettings.Value;
            _context = context;
        }

        public User Authenticate(string username, string password)
        {
            var user = _context.Users.SingleOrDefault(x => x.Username == username && x.Password == password);

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
                    new Claim(ClaimTypes.Name, user.Id.ToString())
                }),
                Expires = DateTime.UtcNow.AddDays(7),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            user.Token = tokenHandler.WriteToken(token);

            _context.Entry(user).State = EntityState.Modified;
            _context.SaveChangesAsync();

            // remove password before returning
            user.Password = null;

            return user;
        }

        public IEnumerable<User> GetAll()
        {
            // return (
            //     new User
            //     {
            //         Username = "vaziri.shahla24",
            //         Password = "2475",
            //         Email = "vaziri.shahla24@gmail.com",
            //         Roll = Roll.Admin
            //     }
            // );

            return _context.Users.AsEnumerable().Select(record => new User()
            {
                Id = record.Id,
                Username = record.Username,
                Password = null,
                Token = null,
                Email = record.Email,
                Roll = record.Roll,
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

    }
}