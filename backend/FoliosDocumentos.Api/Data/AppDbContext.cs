using FoliosDocumentos.Api.Models;
using Microsoft.EntityFrameworkCore;

namespace FoliosDocumentos.Api.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

    public DbSet<Event> Events => Set<Event>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<Event>(entity =>
        {
            entity.HasKey(e => e.Id);
            entity.Property(e => e.Name).IsRequired().HasMaxLength(200);
            entity.Property(e => e.Description).HasMaxLength(1000);
            entity.Property(e => e.OrganizerName).IsRequired().HasMaxLength(200);
            entity.Property(e => e.CreatedByUserId).IsRequired().HasMaxLength(100);
        });
    }
}
