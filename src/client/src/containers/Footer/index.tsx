import * as React from "react";
import { connect } from "react-redux";
import { RouteComponentProps } from "react-router";
import { Link, withRouter } from "react-router-dom";

import { getVSCodeApi } from "../../actions/getVSCodeApi";

import styles from "./styles.module.css";

interface IFooterState {
  getVsCodeApi: () => void;
}

class Footer extends React.Component<RouteComponentProps, IFooterState> {
  public logMessageToVsCode = (e: any): any => {
    // @ts-ignore
    this.props.vscode.vscodeObject.postMessage({
      command: "alert",
      text: "Sending Message to VSCode"
    });
  };

  public render() {
    // TODO: Needs access to redux to determine where each link should go to
    // TODO: Add previous paths through link prop to track state/history
    const { pathname } = this.props.location;
    const pathsNext: any = {
      "/SelectWebApp": "/selectFrontEnd",
      "/selectFrontEnd": "/selectBackEnd",
      "/selectBackEnd": "/selectPages"
    };
    const pathsBack: any = {
      "/selectFrontEnd": "/selectWebApp",
      "/selectBackEnd": "/selectFrontEnd",
      "/selectPages": "/selectBackEnd"
    };
    console.log(pathsNext[pathname]);
    console.log(pathsBack[pathname]);

    return (
      <div className={styles.footer}>
        <Link
          className={styles.button}
          to={pathsBack[pathname] === undefined ? "/" : pathsBack[pathname]}
        >
          Back
        </Link>
        <Link
          className={styles.button}
          to={pathsNext[pathname] === undefined ? "/" : pathsNext[pathname]}
        >
          Next
        </Link>
        <button className={styles.button} onClick={this.logMessageToVsCode}>
          Generate
        </button>
        <Link className={styles.button} to="/">
          Cancel
        </Link>
      </div>
    );
  }
}

const mapStateToProps = ({ vscode }: any) => ({ vscode });

export default withRouter(connect(mapStateToProps)(Footer));
