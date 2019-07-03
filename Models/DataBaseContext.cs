using System;
using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;
namespace IOTGW_Admin_Panel.Models
{
    public class DataBaseContext : DbContext
    {
        public DataBaseContext(DbContextOptions<DataBaseContext> options)
            : base(options)
        {
        }

        public DbSet<IOTGW_Admin_Panel.Models.User> User { get; set; }
        public DbSet<IOTGW_Admin_Panel.Models.Gateway> Gateway { get; set; }
        public DbSet<IOTGW_Admin_Panel.Models.Node> Node { get; set; }


        // protected override void OnModelCreating(ModelBuilder modelBuilder)
        // {
        //     // modelBuilder.Entity<Movie>()
        //     // .Property(p=>p.Id).IsRequired();
        // }
    }
}