import * as React from "react";

import styles from "./styles.module.css";

import { InjectedIntlProps, injectIntl } from "react-intl";
import messages from "./messages";
import Title from "../../components/Title";

type Props = InjectedIntlProps;

const ReviewAndGenerate = ({ intl }: Props) => {
  const { formatMessage } = intl;

  return (
    <div className={styles.container}>
      <div className={styles.reviewContextContainer}>
        <div className={styles.selectionContainer}>
          <Title>{formatMessage(messages.launchYourProject)}</Title>
          <p>{formatMessage(messages.almostDone)}</p>
        </div>
      </div>
    </div>
  );
};

export default injectIntl(ReviewAndGenerate);
