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
    }
}
