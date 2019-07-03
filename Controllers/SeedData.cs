using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using System.Linq;

namespace IOTGW_Admin_Panel.Models
{
    public static class SeedData
    {
        public async static void Initialize(IServiceProvider serviceProvider)
        {
            using (var context = new DataBaseContext(
                serviceProvider.GetRequiredService<
                DbContextOptions<DataBaseContext>>()))
            {
                if (context.Users.Any())
                { return; }
                context.Users.Add(
                    new User
                    {
                        Username = "sajad_mm",
                        Password = "123",
                        Email = "sajad_mm@mail.com",
                        Roll = Roll.Admin,
                        FirstName = "Sajad",
                        LastName = "Momeni",
                    }
                );

                await context.SaveChangesAsync();
            }
        }
    }
}