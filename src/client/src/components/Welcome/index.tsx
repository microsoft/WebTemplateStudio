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

import {
  getOutputPath,
  getProjectNameValidation
} from "../../selectors/wizardSelectionSelector";

interface IDispatchProps {
  setRouteVisited: (route: string) => any;
}

interface IStateProps {
  vscode: any;
  projectPathValidation: any;
  outputPath: string;
  projectNameValidation: any;
}

type Props = IStateProps & IDispatchProps;

const Welcome = ({
  setRouteVisited,
  projectPathValidation,
  vscode,
  outputPath
}: Props) => {
  const [isOutputPathEmpty, setIsOutputPathEmpty] = React.useState(false);
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <FormattedMessage
          id="welcome.header"
          defaultMessage="Welcome to Project Acorn"
        />
      </div>
      <div className={styles.body}>
        <FormattedMessage
          id="welcome.body"
          defaultMessage="Project Acorn is a VS Code extension that quickly provides web developers with boilerplate code, easy to use templates, and automates the Azure deployment process, all within this wizard."
        />
      </div>
      <div className={styles.projectDetailsContainer}>
        <ProjectNameAndOutput validation={isOutputPathEmpty} />
        <Link
          onClick={event => {
            if (
              outputPath.length === 0 ||
              projectPathValidation.isInvalidProjectPath
            ) {
              event.preventDefault();
              setIsOutputPathEmpty(outputPath.length === 0);
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
  setRouteVisited: (route: string) => {
    dispatch(setVisitedWizardPageAction(route));
  }
});

const mapStateToProps = (state: any): IStateProps => ({
  vscode: state.vscode.vscodeObject,
  projectPathValidation: state.selection.projectPathValidation,
  outputPath: getOutputPath(state),
  projectNameValidation: getProjectNameValidation(state)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Welcome);
