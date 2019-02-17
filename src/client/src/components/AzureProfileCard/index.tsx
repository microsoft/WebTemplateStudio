import * as React from "react";

import styles from './styles.module.css';

interface IProps {
    cardTitle: string;
    name: string;
    email: string;
    handleSignOut: () => void;
}

const AzureProfileCard = ({ cardTitle, name, email, handleSignOut }: IProps) => {
    return (
        <div className={styles.loginContainer}>
            <div>
                <div className={styles.cardTitle}>
                    {cardTitle}
                </div>
                <div className={styles.name}>
                    {name}
                </div>
                <div className={styles.email}>
                    {email}
                </div>
            </div>
            <button onClick={handleSignOut} className={styles.signInButton}>
                Sign out
            </button>
        </div>
    )
}

export default AzureProfileCard;
