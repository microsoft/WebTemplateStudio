import * as React from "react";
import { connect } from "react-redux";

import {
  EXTENSION_MODULES,
  EXTENSION_COMMANDS
} from "../../utils/constants";


import { IStateProps, IDispatchProps } from "./interfaces";
import {mapStateToProps} from "./store";
import FrameworkCard from "./FrameworkCard";
import styles from "./styles.module.css";
import { InjectedIntlProps, injectIntl } from "react-intl";
import messages from "./messages";

type Props = IStateProps & IDispatchProps & InjectedIntlProps;

const SelectFrameworks = (props:Props) => {
  const { frontendOptions, backendOptions, intl } = props;

  React.useEffect(()=>{
    getDependencyInfoAndSetToStore();
  },[]);

  const getDependencyInfoAndSetToStore = () =>{
    const { vscode } = props;
    // send messages to extension to check dependency info when this component loads
    vscode.postMessage({
      module: EXTENSION_MODULES.DEPENDENCYCHECKER,
      command: EXTENSION_COMMANDS.GET_DEPENDENCY_INFO,
      payload: {
        dependency: "node"
      }
    });
    vscode.postMessage({
      module: EXTENSION_MODULES.DEPENDENCYCHECKER,
      command: EXTENSION_COMMANDS.GET_DEPENDENCY_INFO,
      payload: {
        dependency: "python"
      }
    });
  }

  return (
    <div>
      <h1 className={styles.title}>{intl.formatMessage(messages.frontendTitle)}</h1>
      <div className={styles.flexContainer}>
        {frontendOptions.map((framework) => {
          return (
            <FrameworkCard framework={framework} isFrontEnd={true}/>
          );
        })}
      </div>
      <h1 className={styles.title}>{intl.formatMessage(messages.backendTitle)}</h1>
      <div className={styles.flexContainer}>
        {backendOptions.map((framework) => {
          return (
            <FrameworkCard framework={framework} isFrontEnd={false}/>
          );
        })}
      </div>
    </div>
  );
}

export default connect(mapStateToProps)(injectIntl(SelectFrameworks));