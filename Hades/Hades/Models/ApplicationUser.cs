using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Hades.Models
{
    public class ApplicationUser : IdentityUser
    {
        public ICollection<StudentGroup> ParticipatesInGroups { get; set; }

        public ApplicationUser()
        {}
    }
}
