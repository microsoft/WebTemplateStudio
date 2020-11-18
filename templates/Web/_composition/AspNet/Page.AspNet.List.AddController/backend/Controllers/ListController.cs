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
    public class ListController : ControllerBase
    {
        private readonly ILogger<ListController> _logger;
        private readonly ISampleListService _service;

        public ListController(ILogger<ListController> logger, ISampleListService service)
        {
            _logger = logger;
            _service = service;
        }

        [HttpGet]
        public async Task<IEnumerable<ListItem>> Get()
        {
            return await _service.GetItemsAsync();
        }

        [HttpPost]
        public async Task<ListItem> Post(ListItem item)
        {
            return await _service.AddItemAsync(item);
        }

        [HttpDelete("/api/[controller]/{id}")]
        public async Task<ActionResult> Delete(string id)
        {
            var removeId = await _service.DeleteItemAsync(id);
            if (removeId == -1)
            {
                return NotFound("Could not find item with id:" + id);
            }

            var result = new { id, text = "This commented was deleted" };
            return Ok(result);
        }
    }
}
