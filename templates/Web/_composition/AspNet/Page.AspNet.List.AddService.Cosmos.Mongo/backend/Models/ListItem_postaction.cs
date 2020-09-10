using System;
//{[{
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using Newtonsoft.Json;
//}]}

namespace Param_RootNamespace_Pascal.WebApi.Models
{
    //^^
    //{[{
    [BsonIgnoreExtraElements]
    //}]}
    public class ListItem
    {
        //^^
        //{[{
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        [JsonProperty(PropertyName = "_id")]
        //}]}
        public string Id { get; set; }

        //^^
        //{[{
        [BsonElement("text")]
        //}]}
        public string Text { get; set; }
    }
}