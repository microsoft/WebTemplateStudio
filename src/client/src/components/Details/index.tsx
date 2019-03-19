import classnames from "classnames";
import * as React from "react";

import buttonStyles from "../../css/buttonStyles.module.css";
import styles from './styles.module.css';

interface IProps {
    title: string;
    body: string;
    author: string;
    version: string;
    license: string;
    dependencies: string;
    handleDetailsClick: () => void;
    svgUrl: string|undefined;
}

const Card = ({ title, body, author, version, license, dependencies, handleDetailsClick, svgUrl }: IProps) => {
    return (
        <div className={styles.loginContainer}>
            <div className={styles.cardTitleContainer}>
                {svgUrl && <img className={styles.icon} src={svgUrl} />}
                <div className={styles.cardTitle}>
                    {title}
                </div>
            </div>
            <div className={styles.cardBody}>
                {body}
            </div>
            <div className={styles.selectionContainer}>
                <div className={styles.details} onClick={handleDetailsClick}>
                    Details
                </div>
            </div>
        </div>
    )
}

export default Card;