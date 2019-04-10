import classnames from "classnames";
import * as React from "react";
import { connect } from "react-redux";
import { RouteComponentProps } from "react-router";
import { Link, withRouter } from "react-router-dom";

import buttonStyles from "../../css/buttonStyles.module.css";
import styles from "./styles.module.css";

import { ROUTES, EXTENSION_COMMANDS, EXTENSION_MODULES } from "../../utils/constants";
import { validateName } from "../../utils/validateName";

import { IVSCodeObject } from "../../reducers/vscodeApiReducer";
import { rootSelector } from "../../selectors/generationSelector";
import {
  getCosmosDbSelectionSelector,
  isCosmosResourceCreatedSelector
} from "../../selectors/cosmosServiceSelector";
import {
  getAzureFunctionsOptionsSelector,
  isAzureFunctionsSelectedSelector
} from "../../selectors/azureFunctionsServiceSelector";

import { setVisitedWizardPageAction } from "../../actions/setVisitedWizardPage";
import { openPostGenModalAction } from "../../actions/modalActions";
import { getVSCodeApiSelector } from "../../selectors/vscodeApiSelector";

import { FormattedMessage } from "react-intl";
import {
  getIsVisitedRoutesSelector,
  IVisited
} from "../../selectors/wizardNavigationSelector";

interface IDispatchProps {
  setRouteVisited: (route: string) => void;
  openPostGenModal: () => any;
}

interface IStateProps {
  vscode: IVSCodeObject;
  engine: any;
  selectedCosmos: boolean;
  cosmos: any;
  selectedFunctions: boolean;
  functions: any;
  isVisited: IVisited;
}

type Props = RouteComponentProps & IStateProps & IDispatchProps;

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
      module: EXTENSION_MODULES.GENERATE,
      command: EXTENSION_COMMANDS.GENERATE,
      track: false,
      text: "Sending generation info...",
      payload: {
        engine,
        selectedCosmos,
        cosmos,
        selectedFunctions,
        functions
      }
    });
    const { pathname } = this.props.location;
    this.trackPageForTelemetry(pathname);
    openPostGenModal();
  };
  public isReviewAndGenerate = (): boolean => {
    return this.props.location.pathname === ROUTES.REVIEW_AND_GENERATE;
  };
  public handleLinkClick = (pathname: string) => {
    this.trackPageForTelemetry(pathname);

    if (pathname !== ROUTES.REVIEW_AND_GENERATE) {
      this.props.setRouteVisited(pathsNext[pathname]);
    }
  };
  public trackPageForTelemetry = (pathname: string) => {
    // @ts-ignore
    this.props.vscode.postMessage({
      module: EXTENSION_MODULES.TELEMETRY,
      command: EXTENSION_COMMANDS.TRACK_PAGE_SWITCH,
      track: false,
      pageName: pathname
    });
  };
  public render() {
    // Validate the page names and do not generate if they are invalid or if there are duplicates
    const pageNames = new Set();
    let areValidNames = true;
    for (const page of this.props.engine.pages) {
      const pageName = page.name;
      areValidNames = validateName(pageName, "page").isValid;
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
    const { showFrameworks } = this.props.isVisited;
    return (
      <div>
        {pathname !== ROUTES.PAGE_DETAILS && (
          <div className={styles.footer}>
            <div>
              {showFrameworks && (
                <FormattedMessage
                  id="footer.license"
                  defaultMessage="By continuing, you agree to the terms of all the licenses in the
              licenses section."
                />
              )}
            </div>
            {pathname !== ROUTES.WELCOME && (
              <div className={styles.buttonContainer}>
                <Link
                  className={classnames(buttonStyles.buttonDark, styles.button)}
                  to={
                    pathsBack[pathname] === undefined
                      ? ROUTES.WELCOME
                      : pathsBack[pathname]
                  }
                >
                  <FormattedMessage id="footer.back" defaultMessage="Back" />
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
                  <FormattedMessage id="footer.next" defaultMessage="Next" />
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
                  <FormattedMessage
                    id="footer.generate"
                    defaultMessage="Generate"
                  />
                </button>
                <Link
                  className={classnames(styles.button, buttonStyles.buttonDark)}
                  to={ROUTES.WELCOME}
                >
                  <FormattedMessage
                    id="footer.cancel"
                    defaultMessage="Cancel"
                  />
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state: any): IStateProps => ({
  vscode: getVSCodeApiSelector(state),
  engine: rootSelector(state),
  selectedCosmos: isCosmosResourceCreatedSelector(state),
  cosmos: getCosmosDbSelectionSelector(state),
  selectedFunctions: isAzureFunctionsSelectedSelector(state),
  functions: getAzureFunctionsOptionsSelector(state),
  isVisited: getIsVisitedRoutesSelector(state)
});

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
