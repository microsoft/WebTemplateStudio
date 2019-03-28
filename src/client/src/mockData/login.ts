interface IProfileInfo {
  name: string;
  email: string;
  subscriptions: Array<any>;
}

const loginToAzure = (): Promise<IProfileInfo> => {
  return Promise.resolve({
    name: "Kelly Ng",
    email: "t-keng@microsoft.com",
    subscriptions: [{ value: "subscription1", label: "subscription1" }]
  });
};

export default loginToAzure;
