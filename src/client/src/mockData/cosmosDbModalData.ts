// const cosmosSelections: any = {
//     subscription: [{
//         value: "GIV.Hackathon",
//         label: "GIV.Hackathon"
//     }],
//     resourceGroup: [{
//         value: "GIV_W19_WTS",
//         label: "GIV_W19_WTS"
//     }],
//     accountName: [{
//         value: "vrtemplatestudio",
//         label: "vrtemplatestudio"
//     }],    
//     api: [{
//         value: "Azure Table",
//         label: "Azure Table"
//     }],
//     location: [{
//         value: "West US",
//         label: "West US"
//     }],
// };

export const azureModalInitialState: any = {
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

export const azureFunctionModalInitialState: any = {
    subscription: [{
        value: "",
        label: ""
    }],
    resourceGroup: [{
        value: "",
        label: ""
    }],
    appName: [{
        value: "",
        label: ""
    }],    
    location: [{
        value: "",
        label: ""
    }],
    runtimeStack: [{
        value: "",
        label: ""
    }],
    numFunctions: [{
        value: 0,
        label: 0
    }]
};

// const getCosmosModalData = (): Promise<any> => {
//     return Promise.resolve(cosmosSelections);
// };

// export default getCosmosModalData;