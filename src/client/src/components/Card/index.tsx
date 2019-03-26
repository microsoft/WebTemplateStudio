import classnames from "classnames";
import * as React from "react";

import CardBody from "../CardBody";

import buttonStyles from "../../css/buttonStyles.module.css";
import styles from "./styles.module.css";
import { IOption } from "../../types/option";
import { Link } from "react-router-dom";
import classNames from "classnames";

interface IProps {
  buttonText: string;
  option: IOption;
  handleButtonClick: () => void;
  handleDetailsClick: (detailPageInfo: IOption) => void;
  useNormalButtons?: boolean;
}

const Card = ({
  option,
  buttonText,
  handleButtonClick,
  handleDetailsClick,
  useNormalButtons
}: IProps) => {
  return (
    <div className={styles.loginContainer}>
      <div className={styles.cardTitleContainer}>
        {option.svgUrl && (
          <img className={styles.icon} src={option.svgUrl} alt="icon" />
        )}
        <div className={styles.cardTitle}>{option.title}</div>
      </div>
      <div className={styles.cardBody}>
        <CardBody body={option.body} />
      </div>
      <div className={styles.selectionContainer}>
        <Link
          onClick={() => handleDetailsClick(option)}
          className={classNames(styles.link)}
          to={"/PageDetail"}
        >
          Details
        </Link>
        <button
          onClick={handleButtonClick}
          className={classnames(styles.signInButton, {
            [buttonStyles.buttonHighlighted]: !useNormalButtons,
            [buttonStyles.buttonDark]: useNormalButtons
          })}
        >
          {buttonText}
        </button>
      </div>
    </div>
  );
};

export default Card;
