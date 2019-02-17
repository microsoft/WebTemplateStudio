import * as React from "react";

import styles from './styles.module.css';

interface IProps {
    cardTitle: string;
    cardBody: string;
    buttonText: string;
    handleButtonClick: () => void;
    handleDetailsClick: () => void;
}

const LoginCard = ({ cardTitle, cardBody, buttonText, handleButtonClick, handleDetailsClick }: IProps) => {
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
                    <button onClick={handleButtonClick} className={styles.signInButton}>
                        {buttonText}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default LoginCard;
