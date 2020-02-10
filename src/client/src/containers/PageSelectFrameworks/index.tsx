import * as React from "react";
import { connect } from "react-redux";

import {
  EXTENSION_MODULES,
  EXTENSION_COMMANDS
} from "../../utils/constants";


import { ISelectFrameworksProps } from "./interfaces";
import {mapStateToProps} from "./store";
import FrameworkCard from "./FrameworkCard";
import styles from "./styles.module.css";

type Props = ISelectFrameworksProps;

const SelectFrameworks = (props:Props) => {
  const { frontendOptions, backendOptions } = props;
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
      <h1 className={styles.title}>Select a front-end framework</h1>
      <div className={styles.flexContainer}>
        {frontendOptions.map((framework) => {
          return (
            <FrameworkCard framework={framework} isFrontEnd={true}/>
          );
        })}
      </div>
      <h1 className={styles.title}>Select a back-end framework</h1>
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

export default connect(mapStateToProps)(SelectFrameworks);