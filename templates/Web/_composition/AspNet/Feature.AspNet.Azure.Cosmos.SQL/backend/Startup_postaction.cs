using Microsoft.Extensions.DependencyInjection;
//{[{
using Microsoft.Azure.Cosmos;
//}]}

    public class Startup
    {
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddControllers();
            //{[{
            services.AddSingleton<CosmosClient>(InitializeCosmosClientInstanceAsync().GetAwaiter().GetResult());
            //}]}
        }

        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
        }

        //{[{
        private async Task<CosmosClient> InitializeCosmosClientInstanceAsync()
        {
            string account = Configuration["COSMOSDB_URI"];
            string key = Configuration["COSMOSDB_PRIMARY_KEY"];
            string databaseName = Configuration["COSMOSDB_DATABASE_NAME"];
            string containerName = Configuration["COSMOSDB_CONTAINER_NAME"];
            var clientBuilder = new Microsoft.Azure.Cosmos.Fluent.CosmosClientBuilder(account, key);
            var client = clientBuilder
                                .WithConnectionModeDirect()
                                .Build();

            var database = await client.CreateDatabaseIfNotExistsAsync(databaseName);
            await database.Database.CreateContainerIfNotExistsAsync(containerName, "/_partitionKey");
            return client;
        }
        //}]}
    }