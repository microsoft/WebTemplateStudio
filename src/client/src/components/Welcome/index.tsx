import * as React from "react";
import { Link } from "react-router-dom";

import styles from "./styles.module.css";
import buttonStyles from "../../css/buttonStyles.module.css";

const Welcome = () => {
  return (
    <div className={styles.container}>
      <div className={styles.header}>Welcome to Project Acorn</div>
      <div className={styles.body}>
        Project Acorn is a VS Code extension that quickly provides web
        developers with boilerplate code, easy to use templates, and automates
        the Azure deployment process, all within this wizard.
      </div>
      <Link to="/SelectWebApp" className={buttonStyles.buttonHighlighted}>Get Started</Link>
    </div>
  );
};

export default Welcome;
