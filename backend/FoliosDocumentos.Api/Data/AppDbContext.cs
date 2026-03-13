using FoliosDocumentos.Api.Models;
using Microsoft.EntityFrameworkCore;

namespace FoliosDocumentos.Api.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

    public DbSet<Event> Events => Set<Event>();
    public DbSet<Template> Templates => Set<Template>();

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

        modelBuilder.Entity<Template>(entity =>
        {
            entity.HasKey(t => t.Id);
            entity.Property(t => t.Name).IsRequired().HasMaxLength(200);
            entity.Property(t => t.DocumentType).HasConversion<string>().IsRequired();
            entity.Property(t => t.LogoUrl).HasMaxLength(500);
            entity.HasOne(t => t.Event)
                  .WithMany()
                  .HasForeignKey(t => t.EventId)
                  .OnDelete(DeleteBehavior.Restrict);
        });
    }
}
