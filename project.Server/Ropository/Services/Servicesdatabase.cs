using Microsoft.EntityFrameworkCore;
using project.Server.Ropository.Entity;

public class Servicesdatabase : DbContext
{
    public DbSet<Project> project { get; set; }
    public DbSet<tache> tache{ get; set; }
    public DbSet<team> team { get; set; }
    public DbSet<TeamProject> TeamProject { get; set; }
    
    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        optionsBuilder.UseSqlServer("Server=DESKTOP-TQ5Q2NL;Database=GestionProjetN2s;Trusted_Connection=True;TrustServerCertificate=True;");
    }
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<TeamProject>()
            .HasKey(pt => new { pt.ProjectId, pt.TeamId });

        modelBuilder.Entity<TeamProject>()
            .HasOne(pt => pt.Project)
            .WithMany(p => p.ProjectTeams)
            .HasForeignKey(pt => pt.ProjectId);

        modelBuilder.Entity<TeamProject>()
            .HasOne(pt => pt.Team)
            .WithMany(t => t.ProjectTeams)
            .HasForeignKey(pt => pt.TeamId);

        // ...
    }
    public Servicesdatabase(DbContextOptions<Servicesdatabase> options) : base(options)
    {
    }
}
