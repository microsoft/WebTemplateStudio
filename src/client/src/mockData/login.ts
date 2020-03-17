const loginToAzure = (): Promise<AzureProfile> => {
  return Promise.resolve({
    email: "t-keng@microsoft.com",
    subscriptions: [{ name: "subscription1", isMicrosoftLearn: false }]
  });
};

export default loginToAzure;
