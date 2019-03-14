import classnames from "classnames";
import * as React from "react";

import CardBody from "../CardBody";

import buttonStyles from "../../css/buttonStyles.module.css";
import styles from "./styles.module.css";

interface IProps {
  cardTitle: string;
  cardBody: string;
  buttonText: string;
  handleButtonClick: () => void;
  handleDetailsClick: () => void;
  svgUrl: string | undefined;
  useNormalButtons: boolean | undefined;
}

const Card = ({
  cardTitle,
  cardBody,
  buttonText,
  handleButtonClick,
  handleDetailsClick,
  svgUrl,
  useNormalButtons
}: IProps) => {
  return (
    <div className={styles.loginContainer}>
      <div className={styles.cardTitleContainer}>
        {!!svgUrl && <img className={styles.icon} src={svgUrl} alt="icon" />}
        <div className={styles.cardTitle}>{cardTitle}</div>
      </div>
      <div className={styles.cardBody}>
        <CardBody body={cardBody} />
      </div>
      <div className={styles.selectionContainer}>
        <div
          className={styles.details}
          onClick={handleDetailsClick}
          role="Button"
        >
          Details
        </div>
        <button
          onClick={handleButtonClick}
          className={classnames(styles.signInButton, {
            [buttonStyles.buttonHighlighted]: useNormalButtons ? false : true,
            [buttonStyles.buttonDark]: !!useNormalButtons
          })}
        >
          {buttonText}
        </button>
      </div>
    </div>
  );
};

export default Card;
