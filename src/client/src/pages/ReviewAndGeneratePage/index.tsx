import * as React from "react";
import { InjectedIntlProps, injectIntl } from "react-intl";

import Title from "../../components/Titles/Title";
import messages from "./messages";
import styles from "./styles.module.css";

type Props = InjectedIntlProps;

const ReviewAndGenerate = ({ intl }: Props) => {
  const { formatMessage } = intl;

  return (
    <div className={styles.container}>
      <div>
        <div className={styles.selectionContainer}>
          <Title>{formatMessage(messages.launchYourProject)}</Title>
          <p>{formatMessage(messages.almostDone)}</p>
        </div>
      </div>
    </div>
  );
};

export default injectIntl(ReviewAndGenerate);
