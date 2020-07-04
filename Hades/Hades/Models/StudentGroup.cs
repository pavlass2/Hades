using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Hades.Models
{
    /// <summary>
    /// ApplicationUser<=>Group relation for students
    /// </summary>
    public class StudentGroup
    {
        /// <summary>
        /// Actually represents ApplicationUserId
        /// </summary>
        [Key, Column(Order = 1)]
        public string StudentId { get; set; }
        [Key, Column(Order = 2)]
        public string GroupId { get; set; }
        public ApplicationUser Student { get; set; }
        public Group Group { get; set; }        
    }
}
