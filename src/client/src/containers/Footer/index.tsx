import classnames from "classnames";
import * as React from "react";
import { connect } from "react-redux";
import { RouteComponentProps } from "react-router";
import { Link, withRouter } from "react-router-dom";

import buttonStyles from "../../css/buttonStyles.module.css";
import styles from "./styles.module.css";

import { ROUTES } from "../../utils/constants";
import { validateName } from "../../utils/validateName";

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

import { setVisitedWizardPageAction } from "../../actions/setVisitedWizardPage";
import { openPostGenModalAction } from "../../actions/modalActions";

interface IDispatchProps {
  setRouteVisited: (route: string) => void;
  openPostGenModal: () => any;
}

interface IStateProps {
  vscode?: IVSCode;
  engine: any;
  selectedCosmos: boolean;
  cosmos: any;
  selectedFunctions: boolean;
  functions: any;
}

type Props = RouteComponentProps & IStateProps & IDispatchProps;

// TODO: Reconfigure with proper navigation using redux
const pathsNext: any = {
  [ROUTES.SELECT_PROJECT_TYPE]: ROUTES.SELECT_FRAMEWORKS,
  [ROUTES.SELECT_FRAMEWORKS]: ROUTES.SELECT_PAGES,
  [ROUTES.SELECT_PAGES]: ROUTES.AZURE_LOGIN,
  [ROUTES.AZURE_LOGIN]: ROUTES.REVIEW_AND_GENERATE
};
const pathsBack: any = {
  [ROUTES.SELECT_FRAMEWORKS]: ROUTES.SELECT_PROJECT_TYPE,
  [ROUTES.SELECT_PAGES]: ROUTES.SELECT_FRAMEWORKS,
  [ROUTES.AZURE_LOGIN]: ROUTES.SELECT_PAGES,
  [ROUTES.REVIEW_AND_GENERATE]: ROUTES.AZURE_LOGIN
};

class Footer extends React.Component<Props> {
  public logMessageToVsCode = (e: React.MouseEvent<HTMLButtonElement>) => {
    const {
      engine,
      selectedCosmos,
      cosmos,
      selectedFunctions,
      functions,
      vscode,
      openPostGenModal
    } = this.props;
    e.preventDefault();
    // @ts-ignore
    vscode.postMessage({
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
    openPostGenModal();
  };
  public isReviewAndGenerate = (): boolean => {
    return this.props.location.pathname === ROUTES.REVIEW_AND_GENERATE;
  };
  public handleLinkClick = (pathname: string) => {
    if (pathname !== ROUTES.REVIEW_AND_GENERATE) {
      this.props.setRouteVisited(pathsNext[pathname]);
    }
  };
  public render() {
    // Validate the page names and do not generate if they are invalid or if there are duplicates
    const pageNames = new Set();
    let areValidNames = true;
    for (const page of this.props.engine.pages) {
      const pageName = page.name;
      areValidNames = validateName(pageName).isValid;
      if (pageNames.has(pageName)) {
        areValidNames = false;
      } else {
        pageNames.add(pageName);
      }
      if (!areValidNames) {
        break;
      }
    }
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
                onClick={() => {
                  this.handleLinkClick(pathname);
                }}
                to={
                  pathname === ROUTES.REVIEW_AND_GENERATE
                    ? ROUTES.REVIEW_AND_GENERATE
                    : pathsNext[pathname]
                }
              >
                Next
              </Link>
              <button
                disabled={
                  pathname !== ROUTES.REVIEW_AND_GENERATE || !areValidNames
                }
                className={classnames(styles.button, {
                  [buttonStyles.buttonDark]:
                    !this.isReviewAndGenerate() || !areValidNames,
                  [buttonStyles.buttonHighlightedBorder]:
                    this.isReviewAndGenerate() && areValidNames
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

const mapDispatchToProps = (dispatch: any): IDispatchProps => ({
  setRouteVisited: (route: string) => {
    dispatch(setVisitedWizardPageAction(route));
  },
  openPostGenModal: () => {
    dispatch(openPostGenModalAction());
  }
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Footer)
);
