import * as React from "react";
import { useSelector } from "react-redux";
import FrameworkCard from "./FrameworkCard";
import styles from "./styles.module.css";
import { InjectedIntlProps, injectIntl } from "react-intl";
import messages from "./messages";
import { AppContext } from "../../AppContext";
import { DependencyContext } from "./DependencyContext";
import { AppState } from "../../store/combineReducers";
import { getDependencyInfo } from "../../utils/extensionService/extensionService";

type Props = InjectedIntlProps;

const SelectFrameworks = ({intl}: Props) => {
  const frontendOptions = useSelector((state: AppState) => state.templates.frontendOptions);
  const backendOptions = useSelector((state: AppState) => state.templates.backendOptions);
  const isPreview = useSelector((state: AppState) => state.config.previewStatus);
  const {vscode} = React.useContext(AppContext);
  const [isNodeInstalled, setNodeInstalled] = React.useState(true);
  const [isPythonInstalled, setPythonInstalled] = React.useState(true);
  const [isNetCoreInstalled, setNetCoreInstalled] = React.useState(true);

  React.useEffect(() => {
    getDependencyInfo(vscode, "node").then(result => setNodeInstalled(result.installed));
    getDependencyInfo(vscode, "python").then(result => setPythonInstalled(result.installed));
    getDependencyInfo(vscode, "netcore").then(result =>  setNetCoreInstalled(result.installed));
   }, []);

  return (
    <div>
      <DependencyContext.Provider value={{node:isNodeInstalled, python: isPythonInstalled, netcore: isNetCoreInstalled}}>
        <h1 className={styles.title}>{intl.formatMessage(messages.frontendTitle)}</h1>
        <div className={styles.flexContainer}>
          {frontendOptions.map((framework) => {
            if (isPreview || !framework.isPreview) {
              return <FrameworkCard key={framework.internalName} framework={framework} isFrontEnd={true}/>
            }
          })}
        </div>
        <h1 className={styles.title}>{intl.formatMessage(messages.backendTitle)}</h1>
        <div className={styles.flexContainer}>
          {backendOptions.map((framework) => {
            if (isPreview || !framework.isPreview) {
              return <FrameworkCard key={framework.internalName} framework={framework} isFrontEnd={false}/>
            }
          })}
        </div>
      </DependencyContext.Provider>
    </div>
  );
}

export default injectIntl(SelectFrameworks);