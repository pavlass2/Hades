using Hades.Data;
using Hades.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Data.Common;
using System.Linq;
using System.Runtime.CompilerServices;
using System.Text.Json;
using System.Threading.Tasks;

namespace Hades.Controllers
{
    [ApiController]
    [Route("api/[controller]/[action]")]
    public class GroupController : ControllerBase
    {
        private ILogger<GroupController> logger;
        private DbDataProvider dbDataProvider;
        public GroupController(ILogger<GroupController> logger, DbDataProvider dbDataProvider)
        {
            this.logger = logger;
            this.dbDataProvider = dbDataProvider;
        }

        [HttpPost]
        public async Task<IActionResult> CreateGroup(JsonElement requestData)
        {
            string groupName = null;
            string groupFounderUserName = null;
            string groupDescription = null;

            string exceptionText = null;

            try
            {
                // Unwrap into separate JSONs.
                JsonElement groupNameJson = requestData.GetProperty("groupName");
                JsonElement groupFounderUserNameJson = requestData.GetProperty("userName");
                JsonElement groupDescriptionJson = requestData.GetProperty("groupDescription");

                groupName = groupNameJson.GetString();
                groupFounderUserName = groupFounderUserNameJson.GetString();
                groupDescription = groupDescriptionJson.GetString();
            }
            catch (KeyNotFoundException ex)
            {
                exceptionText = "Paremeters passed from frontend are not correctly named.";
                logger.LogError(ex, exceptionText, requestData);
            }
            catch (InvalidOperationException ex)
            {
                exceptionText = "Paremeters passed from frontend are of a wrong kind.";
                logger.LogError(ex, exceptionText, requestData);
            }            

            if (exceptionText == null)
            {
                if (dbDataProvider.DoesGroupExist(groupName))
                {
                    return new JsonResult(false);
                }

                ApplicationUser applicationUser = new ApplicationUser();
                applicationUser.UserName = groupFounderUserName;

                Group group = new Group(groupName, applicationUser, groupDescription);                

                await dbDataProvider.CreateGroupAsync(group, applicationUser);
                
                return new JsonResult(true);
            }
            else
            {
                return new JsonResult(exceptionText);
            }
        }

        /// <summary>
        /// Checks if key word is associated with any group
        /// </summary>
        /// <param name="requestData">key word</param>
        /// <returns>is user allowed to join</returns>
        [HttpPost]
        public IActionResult JoinGroup(JsonElement requestData)
        {
            // zkontroluj ze jmeno skupiny existuje

            string groupName = null;
            string exceptionText = null;
            try
            {
                // Unwrap into separate JSONs.
                JsonElement groupNameJson = requestData.GetProperty("groupName");

                groupName = groupNameJson.GetString();
            }
            catch (KeyNotFoundException ex)
            {
                exceptionText = "Paremeters passed from frontend are not correctly named.";
                logger.LogError(ex, exceptionText, requestData);
            }
            catch (InvalidOperationException ex)
            {
                exceptionText = "Paremeters passed from frontend are of a wrong kind.";
                logger.LogError(ex, exceptionText, requestData);
            }

            if (exceptionText == null)
            {
                return new JsonResult(dbDataProvider.DoesGroupExist(groupName));
            }
            else
            {
                return new JsonResult(exceptionText);
            }
        }

        /// <summary>
        /// Sets username for group
        /// </summary>
        /// <param name="userNameData">User name and group name</param>
        /// <returns>was everything ok?</returns>
        [HttpPost]
        public async Task<IActionResult> SetUserNameForGroup(JsonElement requestData)
        {
            //pridat uzivateli jmeno

            string userName = null;
            string groupName = null;
            string exceptionText = null;
            try
            {
                // Unwrap into separate JSONs.
                JsonElement userNameJson = requestData.GetProperty("userName");
                JsonElement groupNameJson = requestData.GetProperty("groupName");

                groupName = groupNameJson.GetString();
                userName = userNameJson.GetString();
            }
            catch (KeyNotFoundException ex)
            {
                exceptionText = "Paremeters passed from frontend are not correctly named.";
                logger.LogError(ex, exceptionText, requestData);
            }
            catch (InvalidOperationException ex)
            {
                exceptionText = "Paremeters passed from frontend are of a wrong kind.";
                logger.LogError(ex, exceptionText, requestData);
            }

            if (exceptionText == null)
            {
                ApplicationUser applicationUser = new ApplicationUser();
                applicationUser.UserName = userName;

                await dbDataProvider.AddStudentToAGroupAsync(applicationUser, groupName);
                return StatusCode(200);
            }
            else
            {
                return new JsonResult(exceptionText);
            }
        }

        /*TODO
         * Prejmenovat JoinGroup() na neco prihodnejsiho, nakonec totiz bude jen kontrolovat, zda skupina existuje, treba DoesGroupExis
         * Dale prejmenovat SetUserNameForGroup(), protoze tohle bude ve skutecnosti okamzik pripojeni
         * Co kdyz se uzivatel chce pripojit do skupiny, ktere neexistuje?
         * Co kdyz uzivatel vytvari skupinu se jmenem jejiz jmeno uz je pouzito?
         * Co kdyz si uzivatel zvoli stejne uzivatelske jmeno, jako nekdo v groupe uz ma?
         * V bDataProvider.AddStudentToAGroupAsync otestovat ktery update bude fungovat, zda vubec nejaky
         */
    }
}
