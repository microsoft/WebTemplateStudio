import { IAppServiceState } from "../containers/AppServiceModal";

export const azureModalInitialState: any = {
  subscription: [
    {
      value: "",
      label: ""
    }
  ],
  resourceGroup: [
    {
      value: "",
      label: ""
    }
  ],
  accountName: [
    {
      value: "",
      label: ""
    }
  ],
  api: [
    {
      value: "",
      label: ""
    }
  ],
  location: [
    {
      value: "",
      label: ""
    }
  ]
};

export const appServiceModalInitialState: IAppServiceState = {
  subscription: [
    {
      value: "",
      label: ""
    }
  ],
  resourceGroup: [
    {
      value: "",
      label: ""
    }
  ],
  siteName: [
    {
      value: "",
      label: ""
    }
  ]
};

export const azureFunctionModalInitialState: any = {
  subscription: [
    {
      value: "",
      label: ""
    }
  ],
  resourceGroup: [
    {
      value: "",
      label: ""
    }
  ],
  appName: [
    {
      value: "",
      label: ""
    }
  ],
  location: [
    {
      value: "",
      label: ""
    }
  ],
  runtimeStack: [
    {
      value: "",
      label: ""
    }
  ],
  numFunctions: [
    {
      value: 0,
      label: 0
    }
  ]
};
