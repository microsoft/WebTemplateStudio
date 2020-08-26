import * as React from "react";
import styles from "./styles.module.css";
import ProjectOutput from "./ProjectOutput";
import ProjectName from "../../components/ProjectName";
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
          <div className={styles.inputContainer}>
            <div className={styles.inputTitle}>
              <FormattedMessage
                id="newProject.projectNameTitle"
                defaultMessage="Project Name"
              />
            </div>
            <ProjectName />
          </div>
          <ProjectOutput />
        </div>
      </div>
    </div>
  );
};

export default NewProject;