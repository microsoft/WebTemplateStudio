import React from "react";

interface IAppServiceContext {
  appName: string;
  isAvailableAppName: boolean;
  setAppName(appName: string): void;
  setIsAvailableAppName(isAvailableAppName: boolean): void;
}

const AppServiceContext = React.createContext<IAppServiceContext>({
  appName: "",
  isAvailableAppName: false,
  setAppName: () => void 0,
  setIsAvailableAppName: () => void 0,
});

export { AppServiceContext };
