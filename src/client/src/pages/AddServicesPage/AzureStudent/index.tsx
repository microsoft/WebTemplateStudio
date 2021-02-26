import * as React from "react";
import { InjectedIntlProps, injectIntl } from "react-intl";

import { ReactComponent as CloudServicesSVG } from "../../../assets/cloudservices.svg";
import { AZURE_LINKS } from "../../../utils/constants/azure";
import keyUpHandler from "../../../utils/keyUpHandler";
import messages from "./messages";
import styles from "./styles.module.css";

type Props = InjectedIntlProps;

const AzureStudent = (props: Props) => {
  const { formatMessage } = props.intl;

  return (
    <div data-testid="azure-student-component" className={styles.studentContainer}>
      <CloudServicesSVG className={styles.cloudServicesSvg} />
      <div className={styles.infoContainer}>
        <h2>{formatMessage(messages.azureForStudent)}</h2>
        <div className={styles.body}>{formatMessage(messages.noCreditCard)}</div>
        <div className={styles.body}>{formatMessage(messages.startStudentAccount)}</div>
        <a href={AZURE_LINKS.CREATE_FREE_STUDENTS_ACCOUNT} onKeyUp={keyUpHandler}>
          {formatMessage(messages.learnMore)}
        </a>
      </div>
    </div>
  );
};

export default injectIntl(AzureStudent);
