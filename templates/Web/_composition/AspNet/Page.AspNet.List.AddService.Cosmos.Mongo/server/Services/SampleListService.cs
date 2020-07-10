using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MongoDB.Bson;
using MongoDB.Driver;
using Microsoft.Extensions.Configuration;
using Param_RootNamespace_Pascal.WebApi.Contracts;
using Param_RootNamespace_Pascal.WebApi.Models;

namespace Param_RootNamespace_Pascal.WebApi.Services
{
    public class SampleListService : ISampleListService
    {
        private readonly IMongoCollection<ListItem> items;

        public SampleListService(IMongoClient client, IConfiguration config)
        {
            var cosmosSection = config.GetSection("CosmosDB");
            string databaseName = cosmosSection.GetSection("DatabaseName").Value;
            string collectionName = cosmosSection.GetSection("CollectionName").Value;
            var mongoDb = client.GetDatabase(databaseName);
            items = mongoDb.GetCollection<ListItem>(collectionName);
        }

        public async Task<ListItem> AddItemAsync(ListItem item)
        {
            await items.InsertOneAsync(item);
            return item;
        }

        public async Task<long> DeleteItemAsync(string id)
        {
            var data = Builders<ListItem>.Filter.Eq("Id", id);
            var result = await items.DeleteOneAsync(data);
            return result.DeletedCount;
        }

        public async Task<IEnumerable<ListItem>> GetItemsAsync()
        {
            return await items.Find(_ => true).ToListAsync();
        }
    }
}
