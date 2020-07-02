using System;
using System.Collections.Generic;
using System.Linq;
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
        public int Add(int a, int b)
        {
            _logger.LogInformation("Scitam " + a + " + " + b);
            return a + b;
        }
    }
}
