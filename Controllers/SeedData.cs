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
            using (var _context = new DataBaseContext(
                serviceProvider.GetRequiredService<
                DbContextOptions<DataBaseContext>>()))
            {
                if (_context.Users.Any())
                {
                    return;
                }
                await _context.Users.AddRangeAsync(
                new User
                {
                    Username = "Hamid",
                    Password = "1234",
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
                    Password = "1234",
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
                await _context.SaveChangesAsync();
            }
        }
    }
}