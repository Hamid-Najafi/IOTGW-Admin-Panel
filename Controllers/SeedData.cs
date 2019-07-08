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
                       UserId = 1,
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
                string WiFiConfig = System.IO.File.ReadAllText("GatewayNodesConfig/WiFi.json");
                string ZigbeeConfig = System.IO.File.ReadAllText("GatewayNodesConfig/Zigbee.json");
                string BluetoothConfig = System.IO.File.ReadAllText("GatewayNodesConfig/Bluetooth.json");
                string LoRaConfig = System.IO.File.ReadAllText("GatewayNodesConfig/LoRa.json");
                string EthernetConfig = System.IO.File.ReadAllText("GatewayNodesConfig/Ethernet.json");
                string SIM800Config = System.IO.File.ReadAllText("GatewayNodesConfig/SIM800.json");

                await _context.Nodes.AddRangeAsync(
                    new Node
                    {
                        Name = "Wifi",
                        GatewayId = 1,
                        Config = WiFiConfig,
                        Description = "ESP32",
                        Type = NodeType.WiFi,
                    }, new Node
                    {
                        Name = "Zigbee",
                        GatewayId = 1,
                        Config = ZigbeeConfig,
                        Description = "ZG-M1E",
                        Type = NodeType.Zigbee,
                    }, new Node
                    {
                        Name = "Bluetooth",
                        GatewayId = 2,
                        Config = BluetoothConfig,
                        Description = " HC-05",
                        Type = NodeType.Bluetooth,
                    }, new Node
                    {
                        Name = "LoRa",
                        GatewayId = 2,
                        Config = LoRaConfig,
                        Description = "RN2483",
                        Type = NodeType.Zigbee,
                    }
                );

                await _context.Messages.AddRangeAsync(
                new Message
                {
                    NodeId = 1,
                    Title = "Message 1",
                    SourceNode = "Client in Lab",
                    Data = "What hath God wrought"
                }, new Message
                {
                    NodeId = 2,
                    Title = "Message 2",
                    SourceNode = "Client in Home",
                    Data = "Mr. Watson, come here."
                }, new Message
                {
                    NodeId = 3,
                    Title = "Message 3",
                    SourceNode = "Client in Somewhere",
                    Data = "I want to see you"
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