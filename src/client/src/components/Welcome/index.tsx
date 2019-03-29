import classnames from "classnames";
import * as React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import buttonStyles from "../../css/buttonStyles.module.css";
import { ROUTES } from "../../utils/constants";
import styles from "./styles.module.css";

import { setVisitedWizardPageAction } from "../../actions/setVisitedWizardPage";
import ProjectNameAndOutput from "../../containers/ProjectNameAndOutput";

interface IDispatchProps {
  setRouteVisited: (route: string) => any;
}

interface IStateProps {
  vscode: any;
  validation: any;
}

type Props = IStateProps & IDispatchProps;

const Welcome = ({ setRouteVisited, validation, vscode }: Props) => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>Welcome to Project Acorn</div>
      <div className={styles.body}>
        Project Acorn is a VS Code extension that quickly provides web
        developers with boilerplate code, easy to use templates, and automates
        the Azure deployment process, all within this wizard.
      </div>
      <div className={styles.projectDetailsContainer}>
        <ProjectNameAndOutput />
        <Link
          onClick={event => {
            if (validation && validation.isInvalidProjectPath) {
              setRouteVisited(ROUTES.SELECT_PROJECT_TYPE);
            } else {
              event.preventDefault();
            }
          }}
          to={ROUTES.SELECT_PROJECT_TYPE}
          className={classnames(
            buttonStyles.buttonHighlighted,
            styles.getStarted
          )}
        >
          Get Started
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
  validation: state.selection.validation
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Welcome);
