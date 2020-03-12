import React from "react";

interface ISubscription {
  value: string;
  label: string;
}

interface IAppServiceContext {
  subscription: ISubscription;
  appName: string;
  isAvailableAppName: boolean;
  setSubscription(subscription: ISubscription): void;
  setAppName(appName: string): void;
  setIsAvailableAppName(isAvailableAppName: boolean): void;
}

const AppServiceContext = React.createContext<IAppServiceContext>({
  subscription: { label: "", value: "" },
  appName: "",
  isAvailableAppName: false,
  setSubscription: () => void 0,
  setAppName: () => void 0,
  setIsAvailableAppName: () => void 0,
});

export { AppServiceContext };
