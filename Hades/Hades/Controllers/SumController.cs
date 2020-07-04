using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Text.Json;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

namespace Hades.Controllers
{    
    
    [ApiController]
    [Route("api/[controller]/[action]")]
    public class SumController : ControllerBase
    {
        private readonly ILogger<SumController> _logger;

        public SumController(ILogger<SumController> logger)
        {
            _logger = logger;
        }

        [HttpPost]
        public IActionResult Add(JsonElement values)
        {
            // Input variables
            int? input1 = null;
            int? input2 = null;
            try
            {
                // Unwrap into separate JSONs.
                JsonElement jsonInput1 = values.GetProperty("input1");
                JsonElement jsonInput2 = values.GetProperty("input2");

                // Unwrap into integers.
                input1 = jsonInput1.GetInt32();
                input2 = jsonInput2.GetInt32();
            }
            catch(KeyNotFoundException ex)
            {
                _logger.LogError(ex, "Paremeters passed from frontend are not correctly named.", values);
            }
            catch(InvalidOperationException ex)
            {
                _logger.LogError(ex, "Paremeters passed from frontend are of a wrong kind.", values);
            }
            catch(FormatException ex)
            {
                _logger.LogError(ex, "Paremeters passed from frontend are not Int32.", values);
            }     

            if(input1 != null && input2 != null)
            {
                // If everything went smoothly, return result.
                _logger.LogInformation("Scitam " + input1 + " + " + input2 + " = " + (input1 + input2));
                return new JsonResult(input1 + input2);
            }
            else
            {
                // Log errors and return null.
                _logger.LogWarning("One or multiple errors have occurred during \"add\" operation.");
                return StatusCode(500);
            }            
        }

        public string Index()
        {
            return "Hello World!";
        }
    }
}
