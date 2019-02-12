import * as React from "react";
import { connect } from "react-redux";
import { RouteComponentProps } from "react-router";
import { Link, withRouter } from "react-router-dom";

import * as Duck from "./duck/index";

import styles from "./styles.module.css";

interface FooterProps {
  getVsCodeApi: () => void;
}

class Footer extends React.Component<RouteComponentProps & FooterProps> {
  public componentDidMount() {
    this.props.getVsCodeApi();
  }

  public logMessageToVsCode = (e: any): any => {
    // @ts-ignore
    this.props.vscode.vscodeApi.vscode.postMessage({
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
        <Link className={styles.button} to="/" onClick={this.logMessageToVsCode}>
          Generate
        </Link>
        <Link className={styles.button} to="/">
          Cancel
        </Link>
      </div>
    );
  }
}

function mapStateToProps(state: any) {
  const { vscode } = state;
  return {
    vscode
  };
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    getVsCodeApi: () => dispatch(Duck.duckActions.getVSCodeApi())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(Footer));
