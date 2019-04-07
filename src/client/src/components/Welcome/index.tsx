import classnames from "classnames";
import * as React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import buttonStyles from "../../css/buttonStyles.module.css";
import { ROUTES } from "../../utils/constants";
import styles from "./styles.module.css";

import { setVisitedWizardPageAction } from "../../actions/setVisitedWizardPage";
import ProjectNameAndOutput from "../../containers/ProjectNameAndOutput";
import { FormattedMessage } from "react-intl";

import { updateProjectNameAction } from "../../actions/updateProjectNameAndPath";

import {
  getOutputPath,
  getProjectNameValidation,
  getProjectName
} from "../../selectors/wizardSelectionSelector";
import { getVSCodeApiSelector } from "../../selectors/vscodeApiSelector";

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
  const [isOutputPathEmpty, setIsOutputPathEmpty] = React.useState(false);
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
        <ProjectNameAndOutput validation={isOutputPathEmpty} />
        <Link
          onClick={event => {
            updateProjectName(projectName);
            if (
              outputPath.length === 0 ||
              projectPathValidation.isInvalidProjectPath ||
              projectName.length === 0 ||
              !projectNameValidation.isValid
            ) {
              event.preventDefault();
              setIsOutputPathEmpty(outputPath.length === 0);
              event.preventDefault();
            } else {
              setIsOutputPathEmpty(false);
              setRouteVisited(ROUTES.SELECT_PROJECT_TYPE);
            }
          }}
          to={ROUTES.SELECT_PROJECT_TYPE}
          className={classnames(
            buttonStyles.buttonHighlighted,
            styles.getStarted
          )}
        >
          <FormattedMessage
            id="welcome.getStarted"
            defaultMessage="Get Started"
          />
        </Link>
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch: any): IDispatchProps => ({
  updateProjectName: (projectName: string) => {
    dispatch(updateProjectNameAction(projectName));
  },
  setRouteVisited: (route: string) => {
    dispatch(setVisitedWizardPageAction(route));
  }
});

const mapStateToProps = (state: any): IStateProps => ({
  vscode: getVSCodeApiSelector(state),
  projectPathValidation: state.selection.projectPathValidation,
  outputPath: getOutputPath(state),
  projectNameValidation: getProjectNameValidation(state),
  projectName: getProjectName(state)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Welcome);
