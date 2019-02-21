interface IProfileInfo {
    name: string;
    email: string;
}

const loginToAzure = (): Promise<IProfileInfo> => {
    return Promise.resolve({
        name: "Kelly Ng",
        email: "t-keng@microsoft.com",
    });
}

export default loginToAzure;