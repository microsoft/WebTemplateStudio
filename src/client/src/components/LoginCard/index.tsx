import classnames from "classnames";
import * as React from "react";
import { Link } from "react-router-dom";

import CardBody from "../CardBody";
import { ReactComponent as AzureIntro } from "../../assets/introtoazure.svg";
import buttonStyles from "../../css/buttonStyles.module.css";
import styles from "./styles.module.css";

import { FormattedMessage } from "react-intl";
import { IOption } from "../../types/option";
import { ROUTES } from "../../utils/constants";
import { azureMessages } from "../../mockData/azureServiceOptions";
import keyUpHandler from "../../utils/keyUpHandler";

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
    <div className={styles.loginPrompt}>
      <div className={styles.loginContainer}>
        <div className={styles.cardTitle}>
          <img className={styles.icon} src={svgUrl} alt="" />
          {cardTitle}
        </div>
        <div className={styles.cardBody}>
          <AzureIntro className={styles.computerSVG} />
          <CardBody body={cardBody} />
          <Link
            className={styles.details}
            onClick={() => handleDetailsClick(option)}
            onKeyUp={keyUpHandler}
            to={ROUTES.PAGE_DETAILS}
          >
            <FormattedMessage
              id="loginCard.details"
              defaultMessage="Learn more"
            />
          </Link>
        </div>
        <div className={styles.selectionContainer}>
          <button
            onClick={handleClick}
            className={classnames(
              styles.signInButton,
              buttonStyles.buttonHighlighted
            )}
          >
            <FormattedMessage id="loginCard.signIn" defaultMessage="Sign In" />
          </button>
          <div className={styles.buttonContainer}>
            <a
              className={styles.createAccountButton}
              href="https://azure.microsoft.com/free/"
              onKeyUp={keyUpHandler}
            >
              <FormattedMessage
                id="loginCard.createAccount"
                defaultMessage="Create Free Account"
              />
            </a>
          </div>
        </div>
      </div>
      <div className={styles.loginInfo}>
        {azureMessages.azureLoginInfo.defaultMessage}
      </div>
    </div>
  );
};

export default LoginCard;
