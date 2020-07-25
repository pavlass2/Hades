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
        private DbDataProvider dbDataProvider;
        private UserManager<ApplicationUser> userManager;
        private ILogger<ChatHub> logger;
        private ControllerUtils controllerUtils;
        private static Dictionary<string, string> connectionLibrary = new Dictionary<string, string>();

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

        /// <summary>
        /// Sends message to other group members and stores it to the DB. Before this method is called, userId needs to be added to the "connectionLibrary" which is done by calling "ConnectClient".
        /// </summary>
        /// <param name="requestData">"message" - the text of the message; "userId" of the user sending message; ""</param>
        /// <returns></returns>
        public async Task SendMessage(JsonElement requestData)
        {
            Dictionary<string, Type> input = new Dictionary<string, Type> {
                { "message", typeof(string) },
                { "userId", typeof(string) },
                { "groupName", typeof(string) },
                { "date", typeof(string) }
            };
            Dictionary<string, object> result = controllerUtils.UnwrapJsonRequest(input, requestData);
            logger.LogInformation(result.ToString());

            if (result != null)
            {
                ApplicationUser author = await userManager.FindByIdAsync((string)result["userId"]);

                if (author != null)
                {
                    if (connectionLibrary.ContainsKey(Context.ConnectionId))
                    {
                        Group group = dbDataProvider.GetGroup((string)result["groupName"]);
                        if (group != null)
                        {
                            string textContent = (string)result["message"];
                            await Clients.Group(group.Name).SendAsync(
                                "ReceiveMessage", new JsonResult(new { Message = textContent, NickName = author.NickName, UserId = author.Id }));

                            await dbDataProvider.AddMessageAsync(new Message(author, group, textContent, DateTime.Now, (string)result["date"]));
                            logger.LogInformation("\"SendMessage\" processing for group " + group.Name + " successful.");
                        }
                        else
                        {
                            logger.LogError("Error occurred during \"SendMessage\" processing: Group was NOT found.");
                        }
                    }
                    else
                    {
                        logger.LogError("Error occurred during \"SendMessage\" processing: Message author was not found in \"connectionLibrary\"");
                    }
                }
                else
                {
                    logger.LogError("Error occurred during \"SendMessage\" processing: Message author was NOT found.");
                }
            }
            else
            {
                logger.LogError("Error occurred during \"SendMessage\" processing. Wrong parameters.");
            }
        }

        /// <summary>
        /// Adds client to a group that will be notified about group events. This needs to be called before SendMessage method is called.
        /// </summary>
        /// <param name="requestData">"userId" of the user and "groupName" that client is subscribing to.</param>
        /// <returns></returns>
        public async Task ConnectClient(JsonElement requestData)
        {
            Dictionary<string, Type> input = new Dictionary<string, Type> {
                { "userId", typeof(string) },
                { "groupName", typeof(string) }
            };
            Dictionary<string, object> result = controllerUtils.UnwrapJsonRequest(input, requestData);

            if (result != null)
            {
                string userId = (string)result["userId"];
                string groupName = (string)result["groupName"];

                ApplicationUser applicationUser = await userManager.FindByIdAsync(userId);

                if (applicationUser != null)
                {
                    // Add to group so client will be notified about new users and messages
                    await Groups.AddToGroupAsync(Context.ConnectionId, groupName);

                    // If this is the first connection of this user, notify other clients about it
                    if (!(connectionLibrary.ContainsKey(Context.ConnectionId)))
                    {
                        await Clients.OthersInGroup(groupName).SendAsync("NewUserConnected", new JsonResult(new { UserName = applicationUser.NickName }));
                    }

                    // Add the connection to the library so we can work with it later
                    connectionLibrary.Add(Context.ConnectionId, groupName);
                }
                else
                {
                    logger.LogError("Error occurred during \"ConnectClient\" processing. User trying to connect was not found in DB.");
                }
            }
            else
            {
                logger.LogError("Error occurred during \"ConnectClient\" processing. Wrong parameters.");
            }
        }
    }
}
