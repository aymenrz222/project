using Microsoft.AspNetCore.Http.Features;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using project.Server.Entity;

public class Servicesdatabase : DbContext
{
    public DbSet<Project> projet { get; set; }
  
    public Servicesdatabase(DbContextOptions<Servicesdatabase> options) : base(options)
    {
    }
}
