using Hades.Data;
using Hades.Models;
using Hades.Utils;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Collections.Immutable;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;

namespace Hades.Controllers
{
    /// <summary>
    /// Takes care of groups, messages and students participating in groups 
    /// </summary>
    [ApiController]
    [Route("api/[controller]/[action]")]
    public class GroupController : ControllerBase
    {
        private ILogger<GroupController> logger;
        private DbDataProvider dbDataProvider;
        private ControllerUtils controllerUtils;

        public GroupController(ILogger<GroupController> logger, DbDataProvider dbDataProvider, ControllerUtils controllerUtils)
        {
            this.logger = logger;
            this.dbDataProvider = dbDataProvider;
            this.controllerUtils = controllerUtils;
        }

        /// <summary>
        /// Gets all members of a group.
        /// </summary>
        /// <param name="requestData">groupName of a group to return the members of.</param>
        /// <returns>JSON containing list of all members nickNames.</returns>
        [HttpPost]
        public async Task<IActionResult> GetGroupMembers(JsonElement requestData)
        {
            // Unwrap data.
            Dictionary<string, Type> input = new Dictionary<string, Type> { { "groupName", typeof(string) } };
            Dictionary<string, object> result = controllerUtils.UnwrapJsonRequest(input, requestData);
            if (result != null)
            {
                // Get group from DB.
                string groupName = (string)result["groupName"];
                Group group = dbDataProvider.GetGroup(groupName);

                if (group != null)
                {
                    // Get group members from DB 
                    List<ApplicationUser> groupMembers = await dbDataProvider.GetGroupStudents(group).ToListAsync();
                    // Stick founder to 0 index, frontend counts on it.
                    groupMembers.Insert(0, group.Founder);
                    // Return just their nickNames.
                    IEnumerable<string> usersNicks = groupMembers.Select(s => s.NickName);
                    logger.LogInformation("Retrieving message for group: " + groupName);
                    return new JsonResult(JsonSerializer.Serialize(usersNicks));
                }
                else
                {
                    logger.LogInformation("Could NOT get group members - group not found: " + groupName);
                    return new JsonResult(new { Result = false, Message = "Could NOT get group members - group not found: " + groupName });
                }
                
            }
            else
            {
                logger.LogInformation("Could NOT get messages - invalid request data.");
                return new JsonResult(new { Result = false, Message = "Could NOT get messages - invalid request data." });
            }
        }

        [HttpPost]
        public IActionResult GetGroupMessages(JsonElement requestData)
        {
            // Unwrap data.
            Dictionary<string, Type> input = new Dictionary<string, Type> { { "groupName", typeof(string) } };
            Dictionary<string, object> result = controllerUtils.UnwrapJsonRequest(input, requestData);

            if (result != null)
            {
                // Get group and its messages from DB.
                string groupName = (string)result["groupName"];
                IQueryable<Message> messages = dbDataProvider.GetGroupMessages(dbDataProvider.GetGroup(groupName));

                if (messages != null)
                {
                    logger.LogInformation("Retrieving message for group: " + groupName);
                    List<GetGroupMessagesModel> models = new List<GetGroupMessagesModel>();
                    foreach (Message message in messages)
                    {
                        GetGroupMessagesModel model = new GetGroupMessagesModel();
                        model.Message = message.TextContent;
                        model.UserId = message.Author.Id;
                        model.NickName = message.Author.NickName;
                        model.Date = message.FrontEndTimeStamp;
                        models.Add(model);
                    }
                    return new JsonResult(models);
                }
                else
                {
                    logger.LogInformation("Could NOT get messages - group not found: " + groupName);
                    return new JsonResult(new { Result = false, Message = "Could NOT get messages - group not found: " + groupName });
                }
            }
            else
            {
                logger.LogInformation("Could NOT get messages - invalid request data.");
                return new JsonResult(new { Result = false, Message = "Could NOT get messages - invalid request data." });
            }
        }


        /// <summary>
        /// Creates group
        /// </summary>
        /// <param name="requestData">Data necessary to create group</param>
        /// <returns>False if group with this name already exists, true if creation was successful.</returns>
        [HttpPost]
        public async Task<IActionResult> CreateGroup(JsonElement requestData)
        {
            // Unwrap data
            Dictionary<string, Type> input = new Dictionary<string, Type> { 
                { "groupName", typeof(string) },
                { "userName", typeof(string) },
                { "groupDescription", typeof(string) }
            };
            Dictionary<string, object> result = controllerUtils.UnwrapJsonRequest(input, requestData);           
                        
            if (result != null)
            {
                string groupName = (string)result["groupName"];
                // Check if is the desired groupName available
                if (dbDataProvider.DoesGroupExist(groupName))
                {
                    return new JsonResult(new { Result = false, Message = "Group with this name already exists." });
                }

                // Proceed with founding user creation
                ApplicationUser applicationUser = new ApplicationUser();
                applicationUser.NickName = (string)result["userName"];

                // Proceed with group creation
                Group group = new Group(groupName, applicationUser, (string)result["groupDescription"]);

                // Create group (it also creates user)
                ApplicationUser founder = await dbDataProvider.CreateGroupAsync(group, applicationUser);

                logger.LogInformation("Creating group: " + groupName);
                return new JsonResult(new { Result = true, UserId = founder.Id });
            }
            else
            {
                logger.LogError("Error occurred during group creation.");
                return new JsonResult("Error occurred during group creation.");
            }
        }

        /// <summary>
        /// Checks if key word is associated with any group
        /// </summary>
        /// <param name="requestData">key word</param>
        /// <returns>is user allowed to join</returns>
        [HttpPost]
        public IActionResult IsGroupNameValid(JsonElement requestData)
        {
            string groupName = "";
            // Unwrap data
            Dictionary<string, Type> input = new Dictionary<string, Type> { { "groupName", groupName.GetType() } };
            Dictionary<string, object> result = controllerUtils.UnwrapJsonRequest(input, requestData);

            if (result != null)
            {
                // Check if group already exists
                groupName = (string)result["groupName"];
                logger.LogInformation("Group existence check: " + groupName);
                return new JsonResult(new { Result = dbDataProvider.DoesGroupExist(groupName) });
            }
            else
            {
                logger.LogError("Error occurred during group existence check.");
                return new JsonResult("Error occurred during group existence check.");
            }
        }

        /// <summary>
        /// Sets username for group for anonymous user
        /// </summary>
        /// <param name="requestData">User name and group name</param>
        /// <returns>was everything ok?</returns>
        [HttpPost]
        public async Task<IActionResult> AddStudentToGroup(JsonElement requestData)
        {
            // Unwrap data
            Dictionary<string, Type> input = new Dictionary<string, Type> {
                { "groupName", typeof(string) },
                { "userName", typeof(string) }
            };
            Dictionary<string, object> result = controllerUtils.UnwrapJsonRequest(input, requestData);

            if (result != null)
            {
                string groupName = (string)result["groupName"];
                // Create new user
                ApplicationUser applicationUser = new ApplicationUser();
                applicationUser.NickName = (string)result["userName"];

                // Add the new user to the group
                ApplicationUser student = await dbDataProvider.AddStudentToAGroupAsync(applicationUser, groupName);
                logger.LogInformation("Group existence check: " + groupName);
                return new JsonResult(new { Result = true, UserId = student.Id });
            }
            else
            {
                logger.LogError("Error occurred during new user creation.");
                return new JsonResult("Error occurred during new user creation.");
            }
        }



        /*TODO
         * Co kdyz si uzivatel zvoli stejne uzivatelske jmeno, jako nekdo v groupe uz ma?
         */
    }

    public class GetGroupMessagesModel
    {
        public string Message { get; set; }
        public string UserId { get; set; }
        public string NickName { get; set; }
        public string Date { get; set; }
    }
}
