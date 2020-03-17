const appServiceName = "mockappservicename";
const cosmosDBName = "mockcosmosdbname";

const locations: AzureLocation[] = Array.from(Array(5).keys()).map(() => {
  return {
    name: "WEST US",
  };
});

const resourceGroups: ResourceGroup[] = Array.from(Array(5).keys()).map(() => {

  return {
    name: "resourceGroupMock",
  };
});

const subscriptions: Subscription[] = Array.from(Array(5).keys()).map((element: number) => {
  return {
    name: "GIV.Hackathon" + element,
    isMicrosoftLearn: false,
  };
});

subscriptions.push({
  name: "Microsoft Learn Mock Subscription",
  isMicrosoftLearn: true,
});

export { appServiceName, cosmosDBName, locations, resourceGroups, subscriptions };
