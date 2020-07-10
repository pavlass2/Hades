using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Hades.Models
{
    public class Message
    {
        public string Id { get; set; }
        public ApplicationUser Author { get; set; }
        public Group PostedInGroup { get; set; }
        public string TextContent { get; set; }

        public Message()
        {}

        public Message(ApplicationUser author, Group postedInGroup, string textContent)
        {
            Author = author;
            PostedInGroup = postedInGroup;
            TextContent = textContent;
        }
    }
}
