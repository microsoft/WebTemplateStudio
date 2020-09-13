using System.Collections.Generic;
using Param_RootNamespace_Pascal.WebApi.Models;

namespace Param_RootNamespace_Pascal.WebApi.Contracts
{
    public interface ISampleDataService
    {
        IEnumerable<SampleCompany> GetSampleCompanies();
    }
}
