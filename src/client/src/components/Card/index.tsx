import classnames from "classnames";
import * as React from "react";

import buttonStyles from "../../css/buttonStyles.module.css";
import styles from './styles.module.css';

interface IProps {
    cardTitle: string;
    cardBody: string;
    buttonText: string;
    handleButtonClick: () => void;
    handleDetailsClick: () => void;
    svgUrl: string|undefined;
}

const Card = ({ cardTitle, cardBody, buttonText, handleButtonClick, handleDetailsClick, svgUrl }: IProps) => {
    return (
        <div className={styles.loginContainer}>
            <div className={styles.cardTitleContainer}>
                {!!svgUrl && <img className={styles.icon} src={svgUrl} />}
                <div className={styles.cardTitle}>
                    {cardTitle}
                </div>
            </div>
            <div className={styles.cardBody}>
                {cardBody}
            </div>
            <div className={styles.selectionContainer}>
                <div onClick={handleDetailsClick}>
                    Details
                </div>
                <button onClick={handleButtonClick} className={classnames(styles.signInButton, buttonStyles.buttonHighlighted)}>
                    {buttonText}
                </button>
            </div>
        </div>
    )
}

export default Card;
