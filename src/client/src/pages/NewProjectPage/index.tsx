import * as React from "react";
import { injectIntl, InjectedIntlProps } from "react-intl";

import ProjectDetails from "../../components/ProjectDetails";
import { useSelector } from "react-redux";

import styles from "./styles.module.css";
import messagesWeb from "./messagesWeb";
import messagesReactNative from "./messagesReactNative";
import { PLATFORM } from "../../utils/constants/constants";

import Title from "../../components/Titles/Title";

import { getPlatformSelector } from "../../store/config/platform/selector";

type Props = InjectedIntlProps;

const NewProject = (props: Props) => {
  const { formatMessage } = props.intl;
  const platform = useSelector(getPlatformSelector);
  const messages = (platform.id === PLATFORM.WEB) ? messagesWeb : messagesReactNative;

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
