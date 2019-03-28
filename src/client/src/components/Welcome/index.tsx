import * as React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import styles from "./styles.module.css";
import buttonStyles from "../../css/buttonStyles.module.css";
import { ROUTES } from "../../utils/constants";

import { setVisitedWizardPageAction } from "../../actions/setVisitedWizardPage";

interface IDispatchProps {
  setRouteVisited: (route: string) => any;
}

const Welcome = ({ setRouteVisited }: IDispatchProps) => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>Welcome to Project Acorn</div>
      <div className={styles.body}>
        Project Acorn is a VS Code extension that quickly provides web
        developers with boilerplate code, easy to use templates, and automates
        the Azure deployment process, all within this wizard.
      </div>
      <Link
        onClick={() => {
          setRouteVisited(ROUTES.SELECT_PROJECT_TYPE);
        }}
        to={ROUTES.SELECT_PROJECT_TYPE}
        className={buttonStyles.buttonHighlighted}
      >
        Get Started
      </Link>
    </div>
  );
};

const mapDispatchToProps = (dispatch: any): IDispatchProps => ({
  setRouteVisited: (route: string) => {
    dispatch(setVisitedWizardPageAction(route));
  }
});

export default connect(
  null,
  mapDispatchToProps
)(Welcome);
