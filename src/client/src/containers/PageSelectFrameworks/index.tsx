import * as React from "react";
import { useSelector } from "react-redux";
import FrameworkCard from "./FrameworkCard";
import styles from "./styles.module.css";
import { InjectedIntlProps, injectIntl } from "react-intl";
import messages from "./messages";
import { EXTENSION_COMMANDS, EXTENSION_MODULES } from "../../utils/constants";
import { IVSCodeObject } from "../../types/vscode";
import { AppContext } from "../../AppContext";
import { DependencyContext } from "./DependencyContext";
import { AppState } from "../../store/combineReducers";

type Props = InjectedIntlProps;

const SelectFrameworks = ({intl}: Props) => {
  const frontendOptions = useSelector((state: AppState) => state.wizardContent.frontendOptions);
  const backendOptions = useSelector((state: AppState) => state.wizardContent.backendOptions);
  const vscode: IVSCodeObject = React.useContext(AppContext).vscode;
  const [isNodeInstalled, setNodeInstalled] = React.useState(true);
  const [isPythonInstalled, setPythonInstalled] = React.useState(true);

  React.useEffect(()=>{
    getDependencyInfoAndSetToStore();
  },[]);

  const getDependencyInfoAndSetToStore = () =>{
    window.addEventListener("message", event => {
      const message = event.data;
      switch (message.command) {
        case EXTENSION_COMMANDS.GET_DEPENDENCY_INFO:
          if (message.payload.dependency=="node") setNodeInstalled(message.payload.installed);
          if (message.payload.dependency=="python") setPythonInstalled(message.payload.installed);
          break;
      }
    });

    vscode.postMessage({
      module: EXTENSION_MODULES.DEPENDENCYCHECKER,
      command: EXTENSION_COMMANDS.GET_DEPENDENCY_INFO,
      payload: {
        dependency: "python"
      }
    });
    vscode.postMessage({
      module: EXTENSION_MODULES.DEPENDENCYCHECKER,
      command: EXTENSION_COMMANDS.GET_DEPENDENCY_INFO,
      payload: {
        dependency: "node"
      }
    });
  }

  return (
    <div>
      <h1 className={styles.title}>{intl.formatMessage(messages.frontendTitle)}</h1>
      <div className={styles.flexContainer}>
        {frontendOptions.map((framework) => {
          return (
            <DependencyContext.Provider value={{node:isNodeInstalled, python: isPythonInstalled}}>
              <FrameworkCard key={framework.internalName} framework={framework} isFrontEnd={true}/>
            </DependencyContext.Provider>
          );
        })}
      </div>
      <h1 className={styles.title}>{intl.formatMessage(messages.backendTitle)}</h1>
      <div className={styles.flexContainer}>
        {backendOptions.map((framework) => {
          return (
            <DependencyContext.Provider value={{node:isNodeInstalled, python: isPythonInstalled}}>
              <FrameworkCard key={framework.internalName} framework={framework} isFrontEnd={false}/>
            </DependencyContext.Provider>
          );
        })}
      </div>
    </div>
  );
}

export default injectIntl(SelectFrameworks);