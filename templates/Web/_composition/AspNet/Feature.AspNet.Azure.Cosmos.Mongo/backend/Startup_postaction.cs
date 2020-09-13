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
            var connectionString = Configuration.GetConnectionString("CosmosDB");
            var settings = MongoClientSettings.FromUrl(new MongoUrl(connectionString));
            settings.SslSettings = new SslSettings() { EnabledSslProtocols = SslProtocols.Tls12 };
            return new MongoClient(settings);
        }
        //}]}
    }