using System;
using System.Collections.Generic;
using System.Linq;
using Param_RootNamespace_Pascal.WebApi.Contracts;
using Param_RootNamespace_Pascal.WebApi.Models;

namespace Param_RootNamespace_Pascal.WebApi.Services
{
    public class SampleDataService : ISampleDataService
    {
        private readonly string shortLoremIpsum = "Lorem id sint aliqua tempor tempor sit.Ad dolor dolor ut nulla mollit dolore non eiusmod Lorem tempor nisi cillum.";
        private readonly string longLoremIpsum = @"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
  tempor incididunt ut labore et dolore magna aliqua. Rhoncus dolor purus
  non enim praesent elementum facilisis leo vel. Risus at ultrices mi
  tempus imperdiet. Semper risus in hendrerit gravida rutrum quisque non
  tellus. Convallis convallis tellus id interdum velit laoreet id donec
  ultrices. Odio morbi quis commodo odio aenean sed adipiscing. Amet nisl
  suscipit adipiscing bibendum est ultricies integer quis. Cursus euismod
  quis viverra nibh cras. Metus vulputate eu scelerisque felis imperdiet
  proin fermentum leo. Mauris commodo quis imperdiet massa tincidunt. Cras
  tincidunt lobortis feugiat vivamus at augue. At augue eget arcu dictum
  varius duis at consectetur lorem. Velit sed ullamcorper morbi tincidunt.
  Lorem donec massa sapien faucibus et molestie ac.";

        public IEnumerable<SampleCompany> GetSampleCompanies() => new List<SampleCompany>
        {
            new SampleCompany()
            {
                ShortDescription = shortLoremIpsum,
                LongDescription= longLoremIpsum,
                Title= "Company A",
                Status= "Closed",
                ShipTo= "Francisco Pérez-Olaeta",
                OrderTotal= 2490.0,
                OrderDate= new DateTime(2017, 5, 24),
                Id= 1,
                ImageSrc= "https://wtsrepository.blob.core.windows.net/sampledata/CompanyA.svg"
            },
            new SampleCompany()
            {
                ShortDescription= shortLoremIpsum,
                LongDescription= longLoremIpsum,
                Title= "Company B",
                Status= "Closed",
                ShipTo= "Soo Jung Lee",
                OrderTotal= 1760.0,
                OrderDate= new DateTime(2017, 5, 24),
                Id= 2
            },
            new SampleCompany()
            {
                ShortDescription= shortLoremIpsum,
                LongDescription= longLoremIpsum,
                Title= "Company C",
                Status= "Shipped",
                ShipTo= "Run Liu",
                OrderTotal= 665.0,
                OrderDate= new DateTime(2017, 6, 3),
                Id= 3,
                ImageSrc= "https://wtsrepository.blob.core.windows.net/sampledata/CompanyC.svg"
            },
            new SampleCompany()
            {
                ShortDescription= shortLoremIpsum,
                LongDescription= longLoremIpsum,
                Title= "Company D",
                Status= "Shipped",
                ShipTo= "Soo Jung Lee",
                OrderTotal= 560.0,
                OrderDate= new DateTime(2017, 6, 5),
                Id= 4,
                ImageSrc= "https://wtsrepository.blob.core.windows.net/sampledata/CompanyD.svg"
            },
            new SampleCompany()
            {
                ShortDescription= shortLoremIpsum,
                LongDescription= longLoremIpsum,
                Title= "Company E",
                Status= "New",
                ShipTo= "John Rodman",
                OrderTotal= 810.0,
                OrderDate= new DateTime(2017, 6, 7),
                Id= 5,
                ImageSrc= "https://wtsrepository.blob.core.windows.net/sampledata/CompanyE.svg"
            },
            new SampleCompany()
            {
                ShortDescription= shortLoremIpsum,
                LongDescription= longLoremIpsum,
                Title= "Company F",
                Status= "New",
                ShipTo= "Elizabeth Andersen",
                OrderTotal= 196.5,
                OrderDate= new DateTime(2017, 6, 7),
                Id= 6,
                ImageSrc= "https://wtsrepository.blob.core.windows.net/sampledata/CompanyF.svg"
            },
            new SampleCompany()
            {
                ShortDescription= shortLoremIpsum,
                LongDescription= longLoremIpsum,
                Title= "Company G",
                Status= "Closed",
                ShipTo= "Peter Krschne",
                OrderTotal= 270.0,
                OrderDate= new DateTime(2017, 6, 11),
                Id= 7,
                ImageSrc= "https://wtsrepository.blob.core.windows.net/sampledata/CompanyG.svg"
            },
            new SampleCompany()
            {
                ShortDescription= shortLoremIpsum,
                LongDescription= longLoremIpsum,
                Title= "Company H",
                Status= "Closed",
                ShipTo= "Sven Mortensen",
                OrderTotal= 736.0,
                OrderDate= new DateTime(2017, 6, 14),
                Id= 8,
                ImageSrc= "https://wtsrepository.blob.core.windows.net/sampledata/CompanyH.svg"
            },
            new SampleCompany()
            {
                ShortDescription= shortLoremIpsum,
                LongDescription= longLoremIpsum,
                Title= "Company I",
                Status= "Shipped",
                ShipTo= "Anna Bedecs",
                OrderTotal= 800.0,
                OrderDate= new DateTime(2017, 6, 18),
                Id= 9,
                ImageSrc= "https://wtsrepository.blob.core.windows.net/sampledata/CompanyI.svg"
            }
        };
    }
}
