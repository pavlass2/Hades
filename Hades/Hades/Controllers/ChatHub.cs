using Hades.Data;
using Hades.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.SignalR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Hades.Controllers
{    public class ChatHub : Hub
    {
        DbDataProvider dbDataProvider;
        UserManager<ApplicationUser> userManager;
        public ChatHub(DbDataProvider dbDataProvider, UserManager<ApplicationUser> userManager)
        {
            this.dbDataProvider = dbDataProvider;
            this.userManager = userManager;
        }
        public async Task SendMessage(string message, string userId, string groupName)
        {
            ApplicationUser author = await userManager.FindByIdAsync(userId);
            
            if (author != null)
            {
                Group group = dbDataProvider.GetGroup(groupName);
                if (group != null)
                {
                    await Clients.All.SendAsync("ReceiveMessage", message, author.NickName);

                    await dbDataProvider.AddMessageAsync(new Message(author, group, message));
                }
            }

            

            

            



        }
    }
}
