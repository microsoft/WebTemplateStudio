import classnames from "classnames";
import * as React from "react";
import { connect } from "react-redux";
import { RouteComponentProps } from "react-router";
import { Link, withRouter } from "react-router-dom";

import buttonStyles from "../../css/buttonStyles.module.css";
import styles from "./styles.module.css";

import { ROUTES } from "../../utils/constants";

import { IVSCode } from "../../reducers/vscodeApiReducer";
import { rootSelector } from "../../selectors/generationSelector";

interface IDispatchProps {
  vscode?: IVSCode;
  engine?: any;
}

type Props = RouteComponentProps & IDispatchProps;

// TODO: Reconfigure with proper navigation using redux
const pathsNext: any = {
  "/SelectWebApp": "/SelectFrameworks",
  "/SelectFrameworks": "/SelectPages",
  "/SelectPages": "/AzureLogin",
  "/AzureLogin": "/ReviewAndGenerate"
};
const pathsBack: any = {
  "/SelectFrameworks": "/SelectWebApp",
  "/SelectPages": "/SelectFrameworks",
  "/AzureLogin": "/SelectPages",
  "/ReviewAndGenerate": "/AzureLogin"
};

class Footer extends React.Component<Props> {
  public logMessageToVsCode = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    // @ts-ignore
    this.props.vscode.postMessage({
      command: "generate",
      text: "Sending generation info...",
      payload: this.props.engine
    });
  };
  public isReviewAndGenerate = (): boolean => {
    return this.props.location.pathname === ROUTES.REVIEW_AND_GENERATE;
  };
  public render() {
    // TODO: Needs access to redux to determine where each link should go to
    // TODO: Add previous paths through link prop to track state/history
    const { pathname } = this.props.location;
    return (
      <div>
        {pathname !== "/" && pathname !== ROUTES.PAGE_DETAILS && (
          <div className={styles.footer}>
            <div className={styles.buttonContainer}>
              <Link
                className={classnames(buttonStyles.buttonDark, styles.button)}
                to={
                  pathsBack[pathname] === undefined ? "/" : pathsBack[pathname]
                }
              >
                Back
              </Link>
              <Link
                className={classnames(styles.button, {
                  [buttonStyles.buttonDark]: this.isReviewAndGenerate(),
                  [buttonStyles.buttonHighlightedBorder]: !this.isReviewAndGenerate()
                })}
                to={
                  pathname === ROUTES.REVIEW_AND_GENERATE ? ROUTES.REVIEW_AND_GENERATE : pathsNext[pathname]
                }
              >
                Next
              </Link>
              <button
                disabled={pathname !== ROUTES.REVIEW_AND_GENERATE}
                className={classnames(styles.button, {
                  [buttonStyles.buttonDark]: !this.isReviewAndGenerate(),
                  [buttonStyles.buttonHighlightedBorder]: this.isReviewAndGenerate()
                })}
                onClick={this.logMessageToVsCode}
              >
                Generate
              </button>
              <Link
                className={classnames(styles.button, buttonStyles.buttonDark)}
                to="/"
              >
                Cancel
              </Link>
            </div>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state: any): any => {
  const { vscode } = state;
  return {
    vscode: vscode.vscodeObject,
    engine: rootSelector(state)
  };
};

export default withRouter(connect(mapStateToProps)(Footer));
