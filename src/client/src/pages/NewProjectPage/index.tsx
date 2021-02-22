import * as React from "react";
import { InjectedIntlProps, injectIntl } from "react-intl";
import { useSelector } from "react-redux";

import ProjectDetails from "../../components/ProjectDetails";
import Title from "../../components/Titles/Title";
import { getPlatformSelector } from "../../store/config/platform/selector";
import { PLATFORM } from "../../utils/constants/constants";
import messagesReactNative from "./messagesReactNative";
import messagesWeb from "./messagesWeb";
import styles from "./styles.module.css";

type Props = InjectedIntlProps;

const NewProject = (props: Props) => {
  const { formatMessage } = props.intl;
  const platform = useSelector(getPlatformSelector);
  const messages = platform.id === PLATFORM.WEB ? messagesWeb : messagesReactNative;

  return (
    <div className={styles.container}>
      <div className={styles.newProjectInfo}>
        <Title>{formatMessage(messages.header)}</Title>
        <p>{formatMessage(messages.body)}</p>
        <div className={styles.projectDetailsContainer}>
          <ProjectDetails />
        </div>
      </div>
    </div>
  );
};

export default injectIntl(NewProject);
