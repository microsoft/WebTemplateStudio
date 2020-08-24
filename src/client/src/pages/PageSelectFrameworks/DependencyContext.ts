import * as React from "react";

interface IDependencyContext {
  node: boolean;
  python: boolean;
  netcore: boolean;
}

export const DependencyContext = React.createContext<IDependencyContext>({ node: false, python: false, netcore: false });
