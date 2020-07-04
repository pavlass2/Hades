using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Hades.Models
{
    public class Group
    {
        public Group()
        { }

        public Group(string name, ApplicationUser founder, string description) : this()
        {
            Name = name;
            Founder = founder;
            Description = description;
        }

        [Required]
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public string GroupId { get; set; }
        
        [Required]
        [StringLength(255)]
        public string Name { get; set; }

        [Required]
        public ApplicationUser Founder { get; set; }
        public ICollection<StudentGroup> Students { get; set; }

        [StringLength(4000)]
        public string Description { get; set; }
    }
}
