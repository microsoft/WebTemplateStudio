import classnames from "classnames";
import * as React from "react";

import CardBody from "../CardBody";

import buttonStyles from "../../css/buttonStyles.module.css";
import styles from "./styles.module.css";

interface IProps {
  cardTitle: string;
  cardBody: string;
  svgUrl: string;
  handleClick: () => void;
}

const LoginCard = ({ cardTitle, cardBody, svgUrl, handleClick }: IProps) => {
  return (
    <div className={styles.loginContainer}>
      <div className={styles.cardTitle}>
        <img className={styles.icon} src={svgUrl} />
        {cardTitle}
      </div>
      <div className={styles.cardBody}>
        <CardBody body={cardBody} />
      </div>
      <div className={styles.selectionContainer}>
        <div className={styles.details}>Details</div>
        <div className={styles.buttonContainer}>
          <div className={styles.createAccountButton}>Create Account</div>
          <button
            onClick={handleClick}
            className={classnames(
              styles.signInButton,
              buttonStyles.buttonHighlighted
            )}
          >
            Sign in
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginCard;
