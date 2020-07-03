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
            var cosmosSection = Configuration.GetSection("CosmosDB");
            string databaseName = cosmosSection.GetSection("DatabaseName").Value;
            string containerName = cosmosSection.GetSection("ContainerName").Value;
            string account = cosmosSection.GetSection("Account").Value;
            string key = cosmosSection.GetSection("Key").Value;
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