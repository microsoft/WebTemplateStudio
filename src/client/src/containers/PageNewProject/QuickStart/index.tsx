import React from "react";
import { connect, useDispatch } from "react-redux";
import { FormattedMessage } from "react-intl";
import { isEnableNextPageSelector } from "../../../store/userSelection/app/wizardSelectionSelector/wizardSelectionSelector";
import { AppState } from "../../../store/combineReducers";
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
import { setSelectedFrontendFrameworkAction, setSelectedBackendFrameworkAction } from "../../../store/userSelection/frameworks/action";
import { setPagesAction } from "../../../store/userSelection/pages/action";
import { AppContext } from "../../../AppContext";
import { setVisitedWizardPageAction, setPageWizardPageAction } from "../../../store/config/pages/action";

interface IStateProps {
  isPreview: boolean;
  isEnableNextPage: boolean;
}

type Props = IStateProps;

const QuickStart = (props: Props) => {
  const {
    isPreview,
    isEnableNextPage
  } = props;
  const { vscode } = React.useContext(AppContext);
  const dispatch = useDispatch();
  
  const handleClick = () => {
    sendTelemetry(vscode, EXTENSION_COMMANDS.TRACK_PRESS_QUICKSTART);
    getAllFrameworks(vscode, isPreview);
    getAllPages(vscode);
    dispatch(setSelectedFrontendFrameworkAction(FRONT_END_SELECTION));
    dispatch(setSelectedBackendFrameworkAction(BACK_END_SELECTION));
    dispatch(setPagesAction(PAGES_SELECTION));
    ROUTES_ARRAY.forEach(route => dispatch(setVisitedWizardPageAction(route)));
    dispatch(setPageWizardPageAction(ROUTES.REVIEW_AND_GENERATE));
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
  const { previewStatus } = state.config;
  return {
    isPreview: previewStatus,
    isEnableNextPage: isEnableNextPageSelector(state)
  };
};

export default 
  connect(
    mapStateToProps
  )(QuickStart);
