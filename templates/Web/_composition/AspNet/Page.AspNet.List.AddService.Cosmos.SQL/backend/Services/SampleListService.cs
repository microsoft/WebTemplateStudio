using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Azure.Cosmos;
using Microsoft.Extensions.Configuration;
using Param_RootNamespace_Pascal.WebApi.Contracts;
using Param_RootNamespace_Pascal.WebApi.Models;

namespace Param_RootNamespace_Pascal.WebApi.Services
{
    public class SampleListService : ISampleListService
    {
        private Container listItemsContainer;

        public SampleListService(CosmosClient client, IConfiguration config)
        {
            var cosmosSection = config.GetSection("CosmosDB");
            string databaseName = cosmosSection.GetSection("DatabaseName").Value;
            string containerName = cosmosSection.GetSection("ContainerName").Value;
            listItemsContainer = client.GetContainer(databaseName, containerName);
        }

        public async Task<ListItem> AddItemAsync(ListItem item)
        {
            item.Id = item.Id ?? Guid.NewGuid().ToString();
            await listItemsContainer.CreateItemAsync<ListItem>(item);
            return item;
        }

        public async Task<long> DeleteItemAsync(string id)
        {
             var result = await listItemsContainer.DeleteItemAsync<ListItem>(id, PartitionKey.None);
             return 1;
        }

        public async Task<IEnumerable<ListItem>> GetItemsAsync()
        {
            var queryString = "SELECT r.id, r.text FROM root r ORDER BY r._ts DESC";
            var query = listItemsContainer.GetItemQueryIterator<ListItem>(new QueryDefinition(queryString));
            List<ListItem> results = new List<ListItem>();
            while (query.HasMoreResults)
            {
                var response = await query.ReadNextAsync();
                results.AddRange(response.ToList());
            }

            return results;
        }
    }
}
