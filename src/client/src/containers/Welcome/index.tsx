import classnames from "classnames";
import * as React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import buttonStyles from "../../css/buttonStyles.module.css";
import { ROUTES } from "../../utils/constants";
import styles from "./styles.module.css";

import { setVisitedWizardPageAction } from "../../actions/wizardInfoActions/setVisitedWizardPage";
import ProjectNameAndOutput from "../ProjectNameAndOutput";
import { FormattedMessage } from "react-intl";

import { updateProjectNameAction } from "../../actions/wizardSelectionActions/updateProjectNameAndPath";

import {
  getOutputPath,
  getProjectNameValidation,
  getProjectName,
  getOutputPathValidation
} from "../../selectors/wizardSelectionSelector";
import { getVSCodeApiSelector } from "../../selectors/vscodeApiSelector";
import { AppState } from "../../reducers";
import { Dispatch } from "redux";
import RootAction from "../../actions/ActionType";

interface IDispatchProps {
  setRouteVisited: (route: string) => any;
  updateProjectName: (projectName: string) => any;
}

interface IStateProps {
  vscode: any;
  projectPathValidation: any;
  outputPath: string;
  projectNameValidation: any;
  projectName: string;
}

type Props = IStateProps & IDispatchProps;

const Welcome = ({
  setRouteVisited,
  projectPathValidation,
  outputPath,
  projectNameValidation,
  projectName,
  updateProjectName
}: Props) => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <FormattedMessage
          id="welcome.header"
          defaultMessage="Welcome to Web Template Studio"
        />
      </div>
      <div className={styles.body}>
        <FormattedMessage
          id="welcome.body"
          defaultMessage="Enter a project name and output path, then click next to get started."
        />
      </div>
      <div className={styles.projectDetailsContainer}>
        <ProjectNameAndOutput />
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch: Dispatch<RootAction>): IDispatchProps => ({
  updateProjectName: (projectName: string) => {
    dispatch(updateProjectNameAction(projectName));
  },
  setRouteVisited: (route: string) => {
    dispatch(setVisitedWizardPageAction(route));
  }
});

const mapStateToProps = (state: AppState): IStateProps => ({
  vscode: getVSCodeApiSelector(state),
  projectPathValidation: getOutputPathValidation(state),
  outputPath: getOutputPath(state),
  projectNameValidation: getProjectNameValidation(state),
  projectName: getProjectName(state)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Welcome);
