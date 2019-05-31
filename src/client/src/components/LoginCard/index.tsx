import classnames from "classnames";
import * as React from "react";
import { Link } from "react-router-dom";

import CardBody from "../CardBody";

import buttonStyles from "../../css/buttonStyles.module.css";
import styles from "./styles.module.css";

import { FormattedMessage } from "react-intl";
import { IOption } from "../../types/option";
import { ROUTES } from "../../utils/constants";

interface IProps {
  cardTitle: string;
  cardBody: string;
  svgUrl: string;
  handleClick: () => void;
  handleDetailsClick: (option: IOption) => any;
  option: IOption;
}

const LoginCard = ({
  cardTitle,
  cardBody,
  svgUrl,
  handleClick,
  handleDetailsClick,
  option
}: IProps) => {
  return (
    <div className={styles.loginContainer}>
      <div className={styles.cardTitle}>
        <img className={styles.icon} src={svgUrl} alt="" />
        {cardTitle}
      </div>
      <div className={styles.cardBody}>
        <CardBody body={cardBody} />
      </div>
      <div className={styles.selectionContainer}>
        <Link
          className={styles.details}
          onClick={() => handleDetailsClick(option)}
          to={ROUTES.PAGE_DETAILS}
        >
          <FormattedMessage id="loginCard.details" defaultMessage="Details" />
        </Link>
        <div className={styles.buttonContainer}>
          <a
            className={styles.createAccountButton}
            href="https://azure.microsoft.com/free/"
          >
            <FormattedMessage
              id="loginCard.createAccount"
              defaultMessage="Create Account"
            />
          </a>
          <button
            onClick={handleClick}
            className={classnames(
              styles.signInButton,
              buttonStyles.buttonHighlighted
            )}
          >
            <FormattedMessage id="loginCard.signIn" defaultMessage="Sign In" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginCard;
