import * as React from "react";
import { injectIntl, InjectedIntlProps } from "react-intl";

import ProjectDetails from "../../components/ProjectDetails";
import { useSelector } from "react-redux";

import styles from "./styles.module.css";
import messagesWeb from "./messagesWeb";
import messagesReactNative from "./messagesReactNative";
import { PLATFORM } from "../../utils/constants/constants";
import { getPlatformSelector } from "../../store/config/platform/selector";

type Props = InjectedIntlProps;

const NewProject = (props: Props) => {
  const platform = useSelector(getPlatformSelector);
  const messages = (platform.id === PLATFORM.WEB) ? messagesWeb : messagesReactNative;
  return (
    <div className={styles.container}>
      <div className={styles.newProjectInfo}>
        <h1 className={styles.header}>{props.intl.formatMessage(messages.header)}</h1>
        <div className={styles.body}>{props.intl.formatMessage(messages.body)}</div>
        <div className={styles.projectDetailsContainer}>
          <ProjectDetails />
        </div>
      </div>
    </div>
  );
};

export default injectIntl(NewProject);
