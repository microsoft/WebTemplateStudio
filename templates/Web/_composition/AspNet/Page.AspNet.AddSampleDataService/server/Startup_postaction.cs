using Microsoft.Extensions.DependencyInjection;
//{[{
using Param_RootNamespace_Pascal.WebApi.Contracts;
using Param_RootNamespace_Pascal.WebApi.Services;
//}]}

    public class Startup
    {
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddControllers();
            //{[{
            services.AddSingleton<ISampleDataService, SampleDataService>();
            //}]}
        }
    }