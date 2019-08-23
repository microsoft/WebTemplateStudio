import classnames from "classnames";
import * as React from "react";
import { FormattedMessage } from "react-intl";

import keyUpHandler from "../../utils/keyUpHandler";
import styles from "./styles.module.css";
import { ReactComponent as CloudServicesSVG } from "../../assets/cloudservices.svg";

const AzureStudent = () => {
  return (
    <div className={styles.studentContainer}>
      <CloudServicesSVG className={styles.cloudServicesSvg} />
      <div className={styles.infoContainer}>
        <div className={styles.azureForStudent}>
          <FormattedMessage
            id="azureStudent.azureForStudent"
            defaultMessage="Azure for Students"
          />
        </div>
        <div className={styles.body}>
          <FormattedMessage
            id="azureStudent.noCreditCard"
            defaultMessage="No credit card required to receive $100 in credits."
          />
        </div>
        <div className={styles.body}>
          <FormattedMessage
            id="azureStudent.startStudentAccount"
            defaultMessage="Add a service to create your account."
          />
        </div>
        <a
          href="https://azure.microsoft.com/en-us/free/students/"
          className={styles.link}
          onKeyUp={keyUpHandler}
        >
          <FormattedMessage
            id="azureStudent.learnMore"
            defaultMessage="Learn More"
          />
        </a>
      </div>
    </div>
  );
};

export default AzureStudent;
