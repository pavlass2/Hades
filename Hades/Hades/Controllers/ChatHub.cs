using Hades.Data;
using Hades.Models;
using Hades.Utils;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;

namespace Hades.Controllers
{    public class ChatHub : Hub
    {
        DbDataProvider dbDataProvider;
        UserManager<ApplicationUser> userManager;
        ILogger<ChatHub> logger;
        ControllerUtils controllerUtils;
        public ChatHub(
            DbDataProvider dbDataProvider,
            UserManager<ApplicationUser> userManager,
            ILogger<ChatHub> logger,
            ControllerUtils controllerUtils
            )
        {
            this.dbDataProvider = dbDataProvider;
            this.userManager = userManager;
            this.logger = logger;
            this.controllerUtils = controllerUtils;
        }
        public async Task SendMessage(JsonElement requestData)
        {
            Dictionary<string, Type> input = new Dictionary<string, Type> {
                { "message", typeof(string) },
                { "userId", typeof(string) },
                { "groupName", typeof(string) }
            };
            Dictionary<string, object> result = controllerUtils.UnwrapJsonRequest(input, requestData);
            logger.LogInformation(result.ToString());

            if (result != null)
            {
                ApplicationUser author = await userManager.FindByIdAsync((string)result["userId"]);

                if (author != null)
                {
                    Group group = dbDataProvider.GetGroup((string)result["groupName"]);
                    if (group != null)
                    {
                        string message = (string)result["message"];
                        await Clients.All.SendAsync("ReceiveMessage", new JsonResult( new { Message = message, NickName = author.NickName, UserId = author.Id }));

                        await dbDataProvider.AddMessageAsync(new Message(author, group, message));
                        logger.LogInformation("\"SendMessage\" processing for group " + group.Name + " successful.");
                    }
                    else
                    {
                        logger.LogError("Error occurred during \"SendMessage\" processing: Group was NOT found.");
                    }
                }
                else
                {
                    logger.LogError("Error occurred during \"SendMessage\" processing: Message author was NOT found.");
                }
            }
            else
            {
                logger.LogError("Error occurred during \"SendMessage\" processing.");
            }
        }
    }
}
