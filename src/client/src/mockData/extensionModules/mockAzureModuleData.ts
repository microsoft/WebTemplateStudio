const appServiceName = "mockappservicename";
const cosmosDBName = "mockcosmosdbname";

const locations = Array.from({ length: 12 }).fill({
  name: "WEST US",
});

const resourceGroups = Array.from({ length: 12 }).fill({
  name: "resourceGroupMock",
});

const subscriptions = Array.from(Array(5).keys()).map((element: number) => {
  return {
    name: "GIV.Hackathon" + element,
    isMicrosoftLearnSubscription: false,
  };
});

subscriptions.push({
  name: "Microsoft Learn Mock Subscription",
  isMicrosoftLearnSubscription: true,
});

export { appServiceName, cosmosDBName, locations, resourceGroups, subscriptions };
