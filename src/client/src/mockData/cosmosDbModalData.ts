const cosmosSelections: any = {
    subscription: [{
        value: "GIV.Hackathon",
        label: "GIV.Hackathon"
    }],
    resourceGroup: [{
        value: "GIV_W19_WTS",
        label: "GIV_W19_WTS"
    }],
    accountName: [{
        value: "vrtemplatestudio",
        label: "vrtemplatestudio"
    }],    
    api: [{
        value: "Azure Table",
        label: "Azure Table"
    }],
    location: [{
        value: "West US",
        label: "West US"
    }],
};

export const cosmosInitialState: any = {
    subscription: [{
        value: "",
        label: ""
    }],
    resourceGroup: [{
        value: "",
        label: ""
    }],
    accountName: [{
        value: "",
        label: ""
    }],    
    api: [{
        value: "",
        label: ""
    }],
    location: [{
        value: "",
        label: ""
    }],
};

const getCosmosModalData = (): Promise<any> => {
    return Promise.resolve(cosmosSelections);
};

export default getCosmosModalData;