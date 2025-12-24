using Microsoft.EntityFrameworkCore;
using WorldData.Models;


namespace WorldData.Data
{
    public class APIContext : DbContext
    {
        public APIContext(DbContextOptions<APIContext> options)
            : base(options)
        {
        }
        public DbSet<CrimeData> CrimeDataTable { get; set; } = null!;
        public DbSet<ElectricVehiclePopulationData> EletricDataTable { get; set; } = null!;
        public DbSet<Restaurants> RestaurantTable { get; set; } = null!;

    }
}
