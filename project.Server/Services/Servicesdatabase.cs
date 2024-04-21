using Microsoft.AspNetCore.Http.Features;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using project.Server.Entity;
using System.Collections.Generic;

public class Servicesdatabase : DbContext
{
    public DbSet<Project> projet { get; set; }
<<<<<<< HEAD
    public DbSet<tache> tache { get; set; }
=======
    public DbSet<tache> tache{ get; set; }
>>>>>>> 98dbe9bc3e2299e7236c9b920cd9b682ec90d62a
    public DbSet<team> team { get; set; }
    public Servicesdatabase(DbContextOptions<Servicesdatabase> options) : base(options)
    {
    }
}
