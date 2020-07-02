using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Param_RootNamespace_Pascal.WebApi.Contracts;
using Param_RootNamespace_Pascal.WebApi.Models;

namespace Param_RootNamespace_Pascal.WebApi.Services
{
    public class SampleListService : ISampleListService
    {
        private static string shortLoremIpsum = "Lorem id sint aliqua tempor tempor sit.Ad dolor dolor ut nulla mollit dolore non eiusmod Lorem tempor nisi cillum.";

        private readonly List<ListItem> ListItems = new List<ListItem>(){
            new ListItem {
                Id = Guid.NewGuid().ToString(),
                Text = shortLoremIpsum
            },
            new ListItem {
                Id = Guid.NewGuid().ToString(),
                Text = shortLoremIpsum
            }
        };

        public async Task<ListItem> AddItemAsync(ListItem item)
        {
            return await Task.Run(() =>
            {
                item.Id = item.Id = item.Id ?? Guid.NewGuid().ToString();
                ListItems.Insert(0, item);
                return item;
            });


        }

        public async Task<long> DeleteItemAsync(string id)
        {
            return await Task.Run(() =>
            {
                var item = ListItems.FirstOrDefault(i => i.Id == id);
                if (item != null)
                {
                    ListItems.Remove(item);
                    return 1;
                }
                return -1;
            });

        }

        public async Task<IEnumerable<ListItem>> GetItemsAsync()
        {
            return await Task.Run(() => ListItems);
        }
    }
}
