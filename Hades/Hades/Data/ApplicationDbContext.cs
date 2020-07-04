using Hades.Models;
using IdentityServer4.EntityFramework.Options;
using Microsoft.AspNetCore.ApiAuthorization.IdentityServer;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Hades.Data
{
    public class ApplicationDbContext : ApiAuthorizationDbContext<ApplicationUser>
    {
        public ApplicationDbContext(
            DbContextOptions options,
            IOptions<OperationalStoreOptions> operationalStoreOptions) : base(options, operationalStoreOptions)
        {
        }

        public DbSet<ApplicationUser> Users { get; set; }
        public DbSet<Group> Groups { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            //Student-group join
            modelBuilder.Entity<StudentGroup>().HasKey(sg => new { sg.StudentId, sg.GroupId });
            modelBuilder.Entity<StudentGroup>()
                .HasOne(sg => sg.Student)
                .WithMany(s => s.ParticipatesInGroups)
                .HasForeignKey(sg => sg.StudentId);
            modelBuilder.Entity<StudentGroup>()
                .HasOne(sg => sg.Group)
                .WithMany(g => g.Students)
                .HasForeignKey(sg => sg.GroupId);

            base.OnModelCreating(modelBuilder);
        }
    }
}
