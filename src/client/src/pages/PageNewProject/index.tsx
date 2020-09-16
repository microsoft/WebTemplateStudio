import * as React from "react";
import { injectIntl, InjectedIntlProps } from "react-intl";

import ProjectOutput from "./ProjectOutput";
import ProjectName from "../../components/ProjectName";

import classnames from "classnames";
import styles from "./styles.module.css";
import messages from "./messages"

type Props = InjectedIntlProps;

const NewProject = (props: Props) => {
  return (
    <div className={classnames(styles.container, styles.newProjectInfo)}>
        <h1 className={styles.header}>
          {props.intl.formatMessage(messages.header)}
        </h1>
        <div className={styles.body}>
          {props.intl.formatMessage(messages.body)}
        </div>
        <div className={styles.projectDetailsContainer}>
          <div className={styles.inputContainer}>
            <div className={styles.inputTitle}>
              {props.intl.formatMessage(messages.projectNameTitle)}
            </div>
            <ProjectName />
          </div>
          <ProjectOutput />
        </div>
    </div>
  );
};

export default injectIntl(NewProject);