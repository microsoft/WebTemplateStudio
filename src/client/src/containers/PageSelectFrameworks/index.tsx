import * as React from "react";
import { connect } from "react-redux";

import {
  EXTENSION_MODULES,
  EXTENSION_COMMANDS,
  FRAMEWORK_TYPE
} from "../../utils/constants";


import { IStateProps, IDispatchProps } from "./interfaces";
import {mapStateToProps, mapDispatchToProps} from "./store";
import FrameworkCard from "./FrameworkCard";
import styles from "./styles.module.css";
import { getFrameworks } from "../../utils/extensionService/extensionService";
import { parseFrameworksPayload } from "../../utils/parseFrameworksPayload";
import messages from "./messages";
import { InjectedIntlProps, injectIntl } from "react-intl";

type Props = IStateProps & IDispatchProps & InjectedIntlProps;

class SelectFrameworks extends React.Component<Props> {

  componentDidMount(){
    const { frontendOptions } = this.props;
    this.getDependencyInfoAndSetToStore();
    if (frontendOptions.length ===0) this.getFrameworksListAndSetToStore();
  }

  getFrameworksListAndSetToStore (){
    const { vscode, isPreview, setFrontendFrameworks, setBackendFrameworks } = this.props;

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

  getDependencyInfoAndSetToStore(){
    const { vscode } = this.props;
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

  public render() {
    const { frontendOptions, backendOptions, intl } = this.props;
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
}

export default connect(mapStateToProps, mapDispatchToProps)(injectIntl(SelectFrameworks));