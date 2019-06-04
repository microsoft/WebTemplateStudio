import classnames from "classnames";
import * as React from "react";
import { connect } from "react-redux";
import { RouteComponentProps } from "react-router";
import { Link, withRouter } from "react-router-dom";

import buttonStyles from "../../css/buttonStyles.module.css";
import styles from "./styles.module.css";

import {
  ROUTES,
  EXTENSION_COMMANDS,
  EXTENSION_MODULES
} from "../../utils/constants";
import { validateName } from "../../utils/validateName";

import { IVSCodeObject } from "../../reducers/vscodeApiReducer";
import { rootSelector } from "../../selectors/generationSelector";
import {
  getCosmosDbSelectionSelector,
  isCosmosResourceCreatedSelector
} from "../../selectors/cosmosServiceSelector";
import {
  getAzureFunctionsOptionsSelector,
  isAzureFunctionsSelectedSelector,
  getAzureFunctionsNamesSelector
} from "../../selectors/azureFunctionsServiceSelector";

import { setVisitedWizardPageAction } from "../../actions/wizardInfoActions/setVisitedWizardPage";
import { openPostGenModalAction } from "../../actions/modalActions/modalActions";
import { getVSCodeApiSelector } from "../../selectors/vscodeApiSelector";

import {
  FormattedMessage,
  defineMessages,
  InjectedIntlProps,
  injectIntl
} from "react-intl";

import {
  getIsVisitedRoutesSelector,
  IVisitedPages
} from "../../selectors/wizardNavigationSelector";
import { isValidNameAndProjectPathSelector } from "../../selectors/wizardSelectionSelector";
import { AppState } from "../../reducers";
import { ThunkDispatch } from "redux-thunk";
import RootAction from "../../actions/ActionType";
import { IFunctionName } from "../AzureFunctionsSelection";

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
  isVisited: IVisitedPages;
  isValidNameAndProjectPath: boolean;
  functionNames?: IFunctionName[];
}

type Props = RouteComponentProps &
  IStateProps &
  IDispatchProps &
  InjectedIntlProps;

const pathsNext: any = {
  [ROUTES.NEW_PROJECT]: ROUTES.SELECT_PROJECT_TYPE,
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

const messages = defineMessages({
  navAriaLabel: {
    id: "footer.navAriaLabel",
    defaultMessage: "Navigate between pages and generate templates"
  }
});

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
  public handleLinkClick = (event: React.SyntheticEvent, pathname: string) => {
    const { isValidNameAndProjectPath, setRouteVisited } = this.props;
    this.trackPageForTelemetry(pathname);
    if (!isValidNameAndProjectPath) {
      event.preventDefault();
      return;
    }
    if (pathname !== ROUTES.REVIEW_AND_GENERATE) {
      setRouteVisited(pathsNext[pathname]);
    }
  };
  public trackPageForTelemetry = (pathname: string) => {
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
    const functionNames = new Set();
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
    if (areValidNames && this.props.functionNames) {
      for (const functionName of this.props.functionNames) {
        areValidNames = functionName.isValidTitle;
        if (functionNames.has(functionName)) {
          areValidNames = false;
        } else {
          functionNames.add(functionName);
        }
        if (!areValidNames) {
          break;
        }
      }
    }

    const { isValidNameAndProjectPath, location, isVisited, intl } = this.props;
    const { pathname } = location;
    const { showFrameworks } = isVisited;
    return (
      <nav aria-label={intl.formatMessage(messages.navAriaLabel)}>
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
            <div className={styles.buttonContainer}>
              <Link
                tabIndex={pathname === ROUTES.NEW_PROJECT ? -1 : 0}
                className={classnames(buttonStyles.buttonDark, styles.button, {
                  [styles.disabledOverlay]: pathname === ROUTES.NEW_PROJECT
                })}
                to={
                  pathsBack[pathname] === undefined
                    ? ROUTES.NEW_PROJECT
                    : pathsBack[pathname]
                }
              >
                <FormattedMessage id="footer.back" defaultMessage="Back" />
              </Link>
              <Link
                tabIndex={
                  !isValidNameAndProjectPath || this.isReviewAndGenerate()
                    ? -1
                    : 0
                }
                className={classnames(styles.button, {
                  [buttonStyles.buttonDark]:
                    this.isReviewAndGenerate() || !isValidNameAndProjectPath,
                  [buttonStyles.buttonHighlightedBorder]: !this.isReviewAndGenerate(),
                  [styles.disabledOverlay]:
                    !isValidNameAndProjectPath || this.isReviewAndGenerate()
                })}
                onClick={event => {
                  this.handleLinkClick(event, pathname);
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
                    this.isReviewAndGenerate() && areValidNames,
                  [styles.disabledOverlay]:
                    !this.isReviewAndGenerate() || !areValidNames
                })}
                onClick={this.logMessageToVsCode}
              >
                <FormattedMessage
                  id="footer.generate"
                  defaultMessage="Generate Template"
                />
              </button>
            </div>
          </div>
        )}
      </nav>
    );
  }
}

const mapStateToProps = (state: AppState): IStateProps => ({
  vscode: getVSCodeApiSelector(state),
  engine: rootSelector(state),
  selectedCosmos: isCosmosResourceCreatedSelector(state),
  cosmos: getCosmosDbSelectionSelector(state),
  selectedFunctions: isAzureFunctionsSelectedSelector(state),
  functionNames: getAzureFunctionsNamesSelector(state),
  functions: getAzureFunctionsOptionsSelector(state),
  isVisited: getIsVisitedRoutesSelector(state),
  isValidNameAndProjectPath: isValidNameAndProjectPathSelector(state)
});

const mapDispatchToProps = (
  dispatch: ThunkDispatch<AppState, void, RootAction>
): IDispatchProps => ({
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
  )(injectIntl(Footer))
);
