import classnames from "classnames";
import * as React from "react";

import buttonStyles from "../../css/buttonStyles.module.css";
import styles from './styles.module.css';

interface IProps {
    cardTitle: string;
    cardBody: string;
    handleClick: () => void;
}

const LoginCard = ({ cardTitle, cardBody, handleClick }: IProps) => {
    return (
        <div className={styles.loginContainer}>
            <div className={styles.cardTitle}>
                {cardTitle}
            </div>
            <div className={styles.cardBody}>
                {cardBody}
            </div>
            <div className={styles.selectionContainer}>
                <div>
                    Details
                </div>
                <div className={styles.buttonContainer}>
                    <div className={styles.cardBody}>
                        Create Account
                    </div>
                    <button onClick={handleClick} className={classnames(styles.signInButton, buttonStyles.buttonHighlighted)}>
                        Sign in
                    </button>
                </div>
            </div>
        </div>
    )
}

export default LoginCard;
