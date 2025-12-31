using Microsoft.EntityFrameworkCore;
using WorldData.Entities;


namespace WorldData.Data
{
    public class APIContext : DbContext
    {
        public APIContext(DbContextOptions<APIContext> options)
            : base(options)
        {
        }
        public DbSet<CrimeEntity> CrimeDataContext { get; set; } = null!;
        public DbSet<ElectricVehiclePopulationEntity> EletricDataContext { get; set; } = null!;
        public DbSet<RestaurantEntity> RestaurantDataContext { get; set; } = null!;

    }
}
