import * as React from "react";
import styles from "./styles.module.css";

import ProjectNameAndOutput from "./ProjectNameAndOutput";
import QuickStart from "./QuickStart";
import { FormattedMessage } from "react-intl";

const NewProject = () => {

  return (
    <div className={styles.container}>
      <div className={styles.newProjectInfo}>
        <h1 className={styles.header}>
          <FormattedMessage
            id="newProject.header"
            defaultMessage="Create Your Web App in Seconds"
          />
        </h1>
        <div className={styles.body}>
          <FormattedMessage
            id="newProject.body"
            defaultMessage="Give your full-stack project a name, choose where to create it, then click 'Next' to get started."
          />
        </div>
        <div className={styles.projectDetailsContainer}>
          <ProjectNameAndOutput />
        </div>
        <div className={styles.quickStartContainer}>
          <QuickStart />
        </div>
      </div>
    </div>
  );
};

export default NewProject;
