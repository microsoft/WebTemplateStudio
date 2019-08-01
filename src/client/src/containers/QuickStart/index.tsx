import React, { Component } from "react";
import { connect } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import { RouteComponentProps, withRouter } from "react-router";
import { FormattedMessage } from "react-intl";

import RootAction from "../../actions/ActionType";
import { selectFrontendFramework as selectFrontendAction } from "../../actions/wizardSelectionActions/selectFrontEndFramework";
import { selectBackendFrameworkAction } from "../../actions/wizardSelectionActions/selectBackEndFramework";
import {
  selectPagesAction,
  updatePageCountAction
} from "../../actions/wizardSelectionActions/selectPages";
import { setVisitedWizardPageAction } from "../../actions/wizardInfoActions/setVisitedWizardPage";
import { enableQuickStartAction } from "../../actions/wizardInfoActions/enableQuickStartAction";

import { getVSCodeApiSelector } from "../../selectors/vscodeApiSelector";
import { isValidNameAndProjectPathSelector } from "../../selectors/wizardSelectionSelector";

import { AppState } from "../../reducers";
import { IVSCodeObject } from "../../reducers/vscodeApiReducer";
import { IPageCount } from "../../reducers/wizardSelectionReducers/pageCountReducer";
import { ISelected } from "../../types/selected";

import { ReactComponent as QuickStartWand } from "../../assets/quickStartWand.svg";
import quickStartWand from "../../assets/quickStartWand.svg";

import {
  FRONT_END_SELECTION,
  BACK_END_SELECTION,
  PAGES_SELECTION,
  PAGE_TYPE_COUNT
} from "./defaultSelection";

import { getAllFrameworks, getAllPages } from "./loadWizardContent";
import { ROUTES, ROUTES_ARRAY } from "../../utils/constants";

import styles from "./styles.module.css";
import { updateAzureFunctionNamesAction } from "../../actions/azureActions/azureFunctionActions";

interface IStateProps {
  vscode: IVSCodeObject;
  isPreview: boolean;
  isValidNameAndProjectPath: boolean;
}

interface IDispatchProps {
  selectFrontendFramework: (framework: ISelected) => void;
  selectBackendFramework: (backendFramework: ISelected) => void;
  selectPages: (pages: ISelected[]) => void;
  updatePageCount: (pageCount: IPageCount) => any;
  setRouteVisited: (route: string) => void;
  enableQuickStart: () => void;
}

type Props = IStateProps & IDispatchProps & RouteComponentProps;

class QuickStart extends Component<Props> {
  constructor(props: Props) {
    super(props);
  }

  handleClick = () => {
    const {
      vscode,
      isPreview,
      selectFrontendFramework,
      selectBackendFramework,
      selectPages,
      history,
      setRouteVisited,
      updatePageCount,
      enableQuickStart
    } = this.props;

    enableQuickStart();
    getAllFrameworks(vscode, isPreview);
    getAllPages(vscode);
    selectFrontendFramework(FRONT_END_SELECTION);
    selectBackendFramework(BACK_END_SELECTION);
    selectPages(PAGES_SELECTION);
    updatePageCount(PAGE_TYPE_COUNT);
    ROUTES_ARRAY.forEach(route => setRouteVisited(route));
    history.push(ROUTES.REVIEW_AND_GENERATE);
  };

  render() {
    const { isValidNameAndProjectPath } = this.props;
    return (
      <div>
        <p className={styles.description}>
          <FormattedMessage
            id="quickStart.optional"
            defaultMessage="OPTIONAL"
          />
        </p>
        <p className={styles.description}>
          <FormattedMessage
            id="quickStart.description"
            defaultMessage='Get started quickly with any frameworks and a blank page by selecting "Quick Start" or click "Next" to go through the entire wizard.'
          />
        </p>
        <button
          tabIndex={0}
          className={styles.quickStart}
          onClick={this.handleClick}
          disabled={!isValidNameAndProjectPath}
        >
          <div>
            {quickStartWand && <QuickStartWand className={styles.wand} />}
          </div>
          <div>
            <FormattedMessage
              id="quickStart.button"
              defaultMessage="Quick Start"
            />
          </div>
        </button>
      </div>
    );
  }
}

const mapStateToProps = (state: AppState): IStateProps => {
  const { previewStatus } = state.wizardContent;
  return {
    isPreview: previewStatus,
    vscode: getVSCodeApiSelector(state),
    isValidNameAndProjectPath: isValidNameAndProjectPathSelector(state)
  };
};

const mapDispatchToProps = (
  dispatch: ThunkDispatch<AppState, void, RootAction>
): IDispatchProps => ({
  selectFrontendFramework: (framework: ISelected) => {
    dispatch(selectFrontendAction(framework));
  },
  selectBackendFramework: (backendFramework: ISelected) => {
    dispatch(selectBackendFrameworkAction(backendFramework));
  },
  selectPages: (pages: ISelected[]) => {
    dispatch(selectPagesAction(pages));
  },
  updatePageCount: (pageCount: IPageCount) => {
    dispatch(updatePageCountAction(pageCount));
  },
  setRouteVisited: (route: string) => {
    dispatch(setVisitedWizardPageAction(route));
  },
  enableQuickStart: () => {
    dispatch(enableQuickStartAction());
  }
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(QuickStart)
);
