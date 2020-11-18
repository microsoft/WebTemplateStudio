using Microsoft.Extensions.DependencyInjection;
//{[{
using System.Security.Authentication;
using MongoDB.Driver;
//}]}

    public class Startup
    {
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddControllers();
            //{[{
            services.AddSingleton<IMongoClient>(InitializeCosmosClientInstance());
            //}]}
        }

        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
        }
        //{[{

        private IMongoClient InitializeCosmosClientInstance()
        {
            var connectionString = Configuration["COSMOSDB_CONNSTR"];
            var userName = Configuration["COSMOSDB_USER"];
            var dbName = Configuration["COSMOSDB_DB_NAME"];
            var password = Configuration["COSMOSDB_PASSWORD"];

            var settings = MongoClientSettings.FromConnectionString(connectionString);

            var identity = new MongoInternalIdentity(dbName, userName);
            var evidence = new PasswordEvidence(password);
            settings.Credential = new MongoCredential("SCRAM-SHA-1", identity, evidence);

            settings.UseTls = true;
            settings.SslSettings = new SslSettings() { EnabledSslProtocols = SslProtocols.Tls12 };

            return new MongoClient(settings);
        }
        //}]}
    }