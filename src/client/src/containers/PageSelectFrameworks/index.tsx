import * as React from "react";
import { connect } from "react-redux";
import { IStateProps, IDispatchProps } from "./interfaces";
import {mapStateToProps, mapDispatchToProps} from "./store";
import FrameworkCard from "./FrameworkCard";
import styles from "./styles.module.css";
import { InjectedIntlProps, injectIntl } from "react-intl";
import messages from "./messages";
import { EXTENSION_COMMANDS, EXTENSION_MODULES } from "../../utils/constants";
import { AppContext } from "../../AppContext";

let isEventAddToSelectFrameworks = false;
type Props = IStateProps & IDispatchProps & InjectedIntlProps;

const SelectFrameworks = (props: Props) => {
  const { frontendOptions, backendOptions, intl } = props;
  const { vscode } = React.useContext(AppContext);

  React.useEffect(()=>{
    window.removeEventListener("message", eventCallback);
    getDependencyInfoAndSetToStore();
  },[]);

  function eventCallback(event: any){
    const { updateDependencyInfo } = props;
    const message = event.data;
    switch (message.command) {
      case EXTENSION_COMMANDS.GET_DEPENDENCY_INFO:
        updateDependencyInfo(message.payload);
        break;
    }
  }

  const getDependencyInfoAndSetToStore = () =>{
    if (!isEventAddToSelectFrameworks){
      isEventAddToSelectFrameworks=true;
      window.addEventListener("message", eventCallback);
    }
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
            <FrameworkCard key={framework.internalName} framework={framework} isFrontEnd={true}/>
          );
        })}
      </div>
      <h1 className={styles.title}>{intl.formatMessage(messages.backendTitle)}</h1>
      <div className={styles.flexContainer}>
        {backendOptions.map((framework) => {
          return (
            <FrameworkCard key={framework.internalName} framework={framework} isFrontEnd={false}/>
          );
        })}
      </div>
    </div>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(SelectFrameworks));