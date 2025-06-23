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

            modelBuilder.Entity<Event>(entity =>
            {
                entity.ToTable("events");
                entity.HasKey(e => e.Id).HasName("pk_events");
            });

            modelBuilder.Entity<User>(entity =>
            {
                entity.ToTable("users");
                entity.HasKey(u => u.Id).HasName("users_pkey");
            });

            modelBuilder.Entity<Review>(entity =>
            {
                entity.ToTable("reviews");
                entity.HasKey(r => r.Id).HasName("pk_reviews");

                entity.HasOne<Event>()
                    .WithMany()
                    .HasForeignKey(r => r.EventId)
                    .OnDelete(DeleteBehavior.Cascade)
                    .HasConstraintName("reviews_eventid_fkey");
            });
        }

    }
}
