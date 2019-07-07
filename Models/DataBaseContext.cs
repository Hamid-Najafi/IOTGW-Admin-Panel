using Microsoft.EntityFrameworkCore;
namespace IOTGW_Admin_Panel.Models
{
    public class DataBaseContext : DbContext
    {
        public DataBaseContext(DbContextOptions<DataBaseContext> options)
            : base(options)
        {
        }

        public DbSet<IOTGW_Admin_Panel.Models.User> Users { get; set; }
        public DbSet<IOTGW_Admin_Panel.Models.Gateway> Gateways { get; set; }
        public DbSet<IOTGW_Admin_Panel.Models.Node> Nodes { get; set; }
        public DbSet<IOTGW_Admin_Panel.Models.Message> Messages { get; set; }

        // protected override void OnModelCreating(ModelBuilder modelBuilder)
        // {
        //     // modelBuilder.Entity<Movie>()
        //     // .Property(p=>p.Id).IsRequired();
        // }
    }
}