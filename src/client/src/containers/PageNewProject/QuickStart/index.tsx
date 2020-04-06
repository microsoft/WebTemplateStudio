import React from "react";
import { connect } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import { FormattedMessage } from "react-intl";

import RootAction from "../../../store/ActionType";

import { isEnableNextPageSelector } from "../../../store/selection/app/wizardSelectionSelector/wizardSelectionSelector";

import { AppState } from "../../../store/combineReducers";
import { IVSCodeObject } from "../../../types/vscode";
import { ISelected } from "../../../types/selected";

import { ReactComponent as QuickStartWand } from "../../../assets/quickStartWand.svg";
import quickStartWand from "../../../assets/quickStartWand.svg";

import {
  FRONT_END_SELECTION,
  BACK_END_SELECTION,
  PAGES_SELECTION
} from "./defaultSelection";

import { getAllFrameworks, getAllPages } from "./loadWizardContent";
import { ROUTES_ARRAY, EXTENSION_COMMANDS, ROUTES } from "../../../utils/constants";

import styles from "./styles.module.css";
import { sendTelemetry } from "../../../utils/extensionService/extensionService";
import { setSelectedFrontendFrameworkAction, setSelectedBackendFrameworkAction } from "../../../store/selection/frameworks/action";
import { setPagesAction } from "../../../store/selection/pages/action";
import { setVisitedWizardPageAction, setPageWizardPageAction } from "../../../store/templates/pages/action";
import { AppContext } from "../../../AppContext";

interface IStateProps {
  isPreview: boolean;
  isEnableNextPage: boolean;
}

interface IDispatchProps {
  selectFrontendFramework: (framework: ISelected) => void;
  selectBackendFramework: (backendFramework: ISelected) => void;
  selectPages: (pages: ISelected[]) => void;
  setRouteVisited: (route: string) => void;
  setPage: (route: string) => void;
}

type Props = IStateProps & IDispatchProps;

const QuickStart = (props: Props) => {
  const {
    isPreview,
    selectFrontendFramework,
    selectBackendFramework,
    selectPages,
    setRouteVisited,
    isEnableNextPage,
    setPage
  } = props;
  const vscode: IVSCodeObject = React.useContext(AppContext).vscode;

  const handleClick = () => {
    sendTelemetry(vscode, EXTENSION_COMMANDS.TRACK_PRESS_QUICKSTART);
    getAllFrameworks(vscode, isPreview);
    getAllPages(vscode);
    selectFrontendFramework(FRONT_END_SELECTION);
    selectBackendFramework(BACK_END_SELECTION);
    selectPages(PAGES_SELECTION);
    ROUTES_ARRAY.forEach(route => setRouteVisited(route));
    setPage(ROUTES.REVIEW_AND_GENERATE);
  };

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
        onClick={handleClick}
        disabled={!isEnableNextPage}
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

const mapStateToProps = (state: AppState): IStateProps => {
  const { previewStatus } = state.templates;
  return {
    isPreview: previewStatus,
    isEnableNextPage: isEnableNextPageSelector(state)
  };
};

const mapDispatchToProps = (
  dispatch: ThunkDispatch<AppState, void, RootAction>
): IDispatchProps => ({
  selectFrontendFramework: (framework: ISelected) => {
    dispatch(setSelectedFrontendFrameworkAction(framework));
  },
  selectBackendFramework: (backendFramework: ISelected) => {
    dispatch(setSelectedBackendFrameworkAction(backendFramework));
  },
  selectPages: (pages: ISelected[]) => {
    dispatch(setPagesAction(pages));
  },
  setRouteVisited: (route: string) => {
    dispatch(setVisitedWizardPageAction(route));
  },
  setPage: (route: string) => {
    dispatch(setPageWizardPageAction(route));
  },
});

export default 
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(QuickStart);
