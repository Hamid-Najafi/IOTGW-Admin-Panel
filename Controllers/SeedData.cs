using System;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;

namespace IOTGW_Admin_Panel.Models
{
    public static class SeedData
    {
        public async static void Initialize(IServiceProvider serviceProvider)
        {
            byte[] passwordHash, passwordSalt;
            CreatePasswordHash("1234", out passwordHash, out passwordSalt);

            using (var _context = new DataBaseContext(
                serviceProvider.GetRequiredService<
                DbContextOptions<DataBaseContext>>()))
            {
                //await _context.Database.EnsureCreatedAsync();

                if (await _context.Users.AnyAsync())
                {
                    return;
                }
                await _context.Users.AddRangeAsync(
               new User
               {
                   Username = "Hamid",
                   PasswordHash = passwordHash,
                   PasswordSalt = passwordSalt,
                   FirstName = "Hamid",
                   LastName = "Najafi",
                   //FullName = "Hamid Najafi",
                   Email = "Hamid.Najafi@email.com",
                   Address = "Ferdowsi Campus",
                   City = "Mashhad",
                   EnrollmentDate = DateTime.Now,
                   Role = Role.Admin
               },
               new User
               {
                   Username = "Shahla",
                   PasswordHash = passwordHash,
                   PasswordSalt = passwordSalt,
                   FirstName = "Shahla",
                   LastName = "Vaziri",
                   //FullName = "Shahla Vaziri",
                   Email = "vaziri.shahla24@gmail.com",
                   Address = "Ferdowsi Campus",
                   City = "Mashhad",
                   EnrollmentDate = DateTime.Now,
                   Role = Role.User
               }
             );

                await _context.Gateways.AddRangeAsync(
                   new Gateway
                   {
                       UserId = 2,
                       Name = "IOT-Lab-Gateway-1",
                       Description = "Test Gateway to test admin panel functionality"
                   },
                   new Gateway
                   {
                       UserId = 2,
                       Name = "IOT-Lab-Gateway-2",
                       Description = "Test Gateway 2 to test admin panel functionality"
                   }
               );

                await _context.SaveChangesAsync();
            }
        }
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
    }
}