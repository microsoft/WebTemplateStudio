using System;

namespace Param_RootNamespace_Pascal.WebApi.Models
{
    public class SampleCompany
    {
        public int Id { get; set; }
        public string ShortDescription { get; set; }
        public string LongDescription { get; set; }
        public string Title { get; set; }
        public string Status { get; set; }
        public string ShipTo { get; set; }
        public double OrderTotal { get; set; }
        public DateTime OrderDate { get; set; }
        public string ImageSrc { get; set; }
    }
}
