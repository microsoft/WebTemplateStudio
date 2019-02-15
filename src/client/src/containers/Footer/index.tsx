import * as React from "react";
import { connect } from "react-redux";
import { RouteComponentProps } from "react-router";
import { Link, withRouter } from "react-router-dom";

import styles from "./styles.module.css";

import { IVSCode } from "../../reducers/vscodeApiReducer";

interface IDispatchProps {
  vscode: IVSCode;
}

type Props = RouteComponentProps & IDispatchProps;

// TODO: Reconfigure with proper navigation using redux
const pathsNext: any = {
  "/SelectWebApp": "/SelectFrameworks",
  "/SelectFrameworks": "/SelectPages"
};
const pathsBack: any = {
  "/SelectFrameworks": "/SelectWebApp",
  "/SelectPages": "/SelectFrameworks"
};

class Footer extends React.Component<Props> {
  public logMessageToVsCode = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
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
    return (
      <div className={styles.footer}>
        {
          pathname !== "/" && 
            <div>
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
        }
      </div>
    );
  }
}

const mapStateToProps = ({ vscode }: { vscode: IVSCode }) => ({ vscode });

export default withRouter(connect(mapStateToProps)(Footer));
