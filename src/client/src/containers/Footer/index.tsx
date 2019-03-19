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
import {
  getCosmosDbSelectionSelector,
  isCosmosResourceCreatedSelector
} from "../../selectors/cosmosServiceSelector";
import {
  getAzureFunctionsOptionsSelector,
  isAzureFunctionsSelected
} from "../../selectors/azureFunctionsServiceSelector";

interface IStateProps {
  vscode?: IVSCode;
  engine: any;
  selectedCosmos: boolean;
  cosmos: any;
  selectedFunctions: boolean;
  functions: any;
}

type Props = RouteComponentProps & IStateProps;

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
    const {
      engine,
      selectedCosmos,
      cosmos,
      selectedFunctions,
      functions
    } = this.props;
    e.preventDefault();
    // @ts-ignore
    this.props.vscode.postMessage({
      command: "generate",
      text: "Sending generation info...",
      payload: {
        engine,
        selectedCosmos,
        cosmos,
        selectedFunctions,
        functions
      }
    });
  };
  public isReviewAndGenerate = (): boolean => {
    return this.props.location.pathname === ROUTES.REVIEW_AND_GENERATE;
  };
  public render() {

    // Validate the page names and do not generate if they are invalid or if there are duplicates
    var pageNames = new Set();
    var areValidNames = true;
    const regx = new RegExp(/^[a-zA-Z0-9 ]+$/i)
    for (var i = 0; i < this.props.engine.pages.length; i++) {
      const pageName = this.props.engine.pages[i].name;
      if (!/^[a-zA-Z0-9 ]+$/i.test(pageName) || !/\S/.test(pageName)) {
        areValidNames = false;
        break;
      } else if (pageNames.has(pageName)) {
        areValidNames = false;
        break;
      } else {
        pageNames.add(pageName);
      }
    }

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
                  pathname === ROUTES.REVIEW_AND_GENERATE
                    ? ROUTES.REVIEW_AND_GENERATE
                    : pathsNext[pathname]
                }
              >
                Next
              </Link>
              <button
                disabled={pathname !== ROUTES.REVIEW_AND_GENERATE || !areValidNames}
                className={classnames(styles.button, {
                  [buttonStyles.buttonDark]: !this.isReviewAndGenerate() || !areValidNames,
                  [buttonStyles.buttonHighlightedBorder]: this.isReviewAndGenerate() && areValidNames
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

const mapStateToProps = (state: any): IStateProps => {
  const { vscode } = state;
  return {
    vscode: vscode.vscodeObject,
    engine: rootSelector(state),
    selectedCosmos: isCosmosResourceCreatedSelector(state),
    cosmos: getCosmosDbSelectionSelector(state),
    selectedFunctions: isAzureFunctionsSelected(state),
    functions: getAzureFunctionsOptionsSelector(state)
  };
};

export default withRouter(connect(mapStateToProps)(Footer));
