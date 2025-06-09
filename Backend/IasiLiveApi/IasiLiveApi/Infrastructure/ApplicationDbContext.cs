using Microsoft.EntityFrameworkCore;
using IasiLiveApi.Domain;

namespace IasiLiveApi.Infrastructure
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) 
            : base(options)
        {
        }
        public DbSet<Product> Products { get; set; }
        public DbSet<Event> Events { get; set; }
        
        public DbSet<User> Users { get; set; }
        
        public DbSet<Review> Reviews { get; set; }
        
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<User>().ToTable("users");
            
            modelBuilder.Entity<Review>().ToTable("reviews");
        }

    }
}
