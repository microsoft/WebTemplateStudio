interface IProfileInfo {
  name: string;
  email: string;
  subscriptions: Array<any>;
}

const loginToAzure = (): Promise<IProfileInfo> => {
  return Promise.resolve({
    name: "Kelly Ng",
    email: "t-keng@microsoft.com",
    subscriptions: [{ name: "subscription1", isMicrosoftLearnSubscription: false }]
  });
};

export default loginToAzure;
