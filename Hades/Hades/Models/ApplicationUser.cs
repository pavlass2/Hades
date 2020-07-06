using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Hades.Models
{
    public class ApplicationUser : IdentityUser
    {
        public ICollection<StudentGroup> ParticipatesInGroups { get; set; }

        [StringLength(255)]
        public string NickName { get; set; }

        public ApplicationUser()
        {}
    }
}
