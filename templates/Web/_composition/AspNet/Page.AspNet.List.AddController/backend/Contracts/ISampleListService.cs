using System.Collections.Generic;
using System.Threading.Tasks;
using Param_RootNamespace_Pascal.WebApi.Models;

namespace Param_RootNamespace_Pascal.WebApi.Contracts
{
    public interface ISampleListService
    {
        Task<ListItem> AddItemAsync(ListItem item);
        Task<long> DeleteItemAsync(string id);
        Task<IEnumerable<ListItem>> GetItemsAsync();
    }
}