using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.CodeAnalysis.Elfie.Serialization;
using Microsoft.EntityFrameworkCore;
using UniversityHub.Models;

namespace UniversityHub.Data
{
    public class DatabaseContext : IdentityDbContext<ApplicationUser>
    {

        public DatabaseContext(DbContextOptions<DatabaseContext> options) : base(options)
        {
            
        }


        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<ApplicationUser>().HasMany(w => w.applications).WithOne(w => w.User);
        }




        public DbSet<University> universities { get; set; }

        public DbSet<Applications> applications { get; set; }


    }
}
