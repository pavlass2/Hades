using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Hades.Models
{
    public class Message
    {
        [Required]
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public string Id { get; set; }
        public ApplicationUser Author { get; set; }
        public Group PostedInGroup { get; set; }
        public string TextContent { get; set; }
        public DateTime TimeStamp { get; set; }
        public string FrontEndTimeStamp { get; set; }

        public Message()
        {}

        public Message(
            ApplicationUser author,
            Group postedInGroup,
            string textContent,
            DateTime timeStamp,
            string frontEndTimeStamp)
        {
            Author = author;
            PostedInGroup = postedInGroup;
            TextContent = textContent;
            TimeStamp = timeStamp;
            FrontEndTimeStamp = frontEndTimeStamp;
        }
    }
}
