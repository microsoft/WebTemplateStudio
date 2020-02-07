import * as React from "react";
import { connect } from "react-redux";

import {
  EXTENSION_MODULES,
  EXTENSION_COMMANDS,
  FRAMEWORK_TYPE
} from "../../utils/constants";

import {getFrameworks} from "../../utils/extensionService/extensionService";
import { parseFrameworksPayload } from "../../utils/parseFrameworksPayload";
import { ISelectFrameworksProps, IDispatchProps } from "./interfaces";
import {mapDispatchToProps, mapStateToProps} from "./store";
import FrameworkCard from "./FrameworkCard";
import styles from "./styles.module.css";

type Props = ISelectFrameworksProps & IDispatchProps;

const SelectFrameworks = (props:Props) => {
  const { frontendOptions, backendOptions, isPreview } = props;
  React.useEffect(()=>{
    getFrameworksListAndSetToStore();
    getDependencyInfoAndSetToStore();
  },[]);

  const getFrameworksListAndSetToStore = () =>{
    const { vscode, isPreview, setFrontendFrameworks, setBackendFrameworks } = props;
    const frameworkListLoaded = frontendOptions && frontendOptions.length>0 &&
      backendOptions && backendOptions.length>0;

    if (!frameworkListLoaded){
      getFrameworks(vscode, isPreview).then((event:any)=>{
        let message = event.data;
        setFrontendFrameworks(
          parseFrameworksPayload(
            message.payload.frameworks,
            FRAMEWORK_TYPE.FRONTEND,
            message.payload.isPreview
          )
        );
        setBackendFrameworks(
          parseFrameworksPayload(
            message.payload.frameworks,
            FRAMEWORK_TYPE.BACKEND,
            message.payload.isPreview
          )
      );
      });
    }
  }

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

export default connect(mapStateToProps, mapDispatchToProps)(SelectFrameworks);