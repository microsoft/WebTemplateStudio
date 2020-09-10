using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Param_RootNamespace_Pascal.WebApi.Contracts;
using Param_RootNamespace_Pascal.WebApi.Models;

namespace Param_RootNamespace_Pascal.WebApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class GridController : ControllerBase
    {
        private readonly ILogger<GridController> _logger;
        private readonly ISampleDataService _sampleDataService;

        public GridController(ILogger<GridController> logger, ISampleDataService sampleDataService)
        {
            _logger = logger;
            _sampleDataService = sampleDataService;
        }

        [HttpGet]
        public IEnumerable<SampleCompany> Get()
        {
            return _sampleDataService.GetSampleCompanies();
        }
    }
}
