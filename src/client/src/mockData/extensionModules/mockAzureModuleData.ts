const appServiceName = "mockappservicename";
const cosmosDBName = "mockcosmosdbname";

const locations: AzureLocation[] = [
  { name: "Australia Central" },
  { name: "Central US" },
  { name: "East Asia" },
  { name: "East US" },
  { name: "East US 2" },
  { name: "France Central" },
  { name: "UK West" },
  { name: "West Central US" },
  { name: "West Europe" },
  { name: "West India" },
  { name: "West US" }
];

const resourceGroups: ResourceGroup[] = Array.from(Array(5).keys()).map((key) => {
  return {
    name: `resourceGroupMock ${key}`,
  };
});

const sandboxResourceGroups: ResourceGroup[] = [{name: "Sandbox resourceGroupMock"}];

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

export { appServiceName, cosmosDBName, locations, resourceGroups, sandboxResourceGroups, subscriptions };
