using Microsoft.AspNetCore.Http.Features;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using project.Server.Entity;

public class Servicesdatabase : DbContext
{
    public DbSet<Project> project { get; set; }
    public DbSet<tache> tache{ get; set; }
    public DbSet<team> team { get; set; }
    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        optionsBuilder.UseSqlServer("Server=DESKTOP-F14RLIJ\\SQLEXPRESS;Database=gestionProjet;Trusted_Connection=True;TrustServerCertificate=True;");
    }
    public Servicesdatabase(DbContextOptions<Servicesdatabase> options) : base(options)
    {
    }
}
