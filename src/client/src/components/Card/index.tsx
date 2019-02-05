import * as React from 'react';
import classNames from 'classnames';

import CardTitle from '../CardTitle';
import CardBody from '../CardBody';

import grid from '../../css/grid.module.css';
import styles from './styles.module.css';



const Card = ({ iconPath, iconStyles, title, body }: { iconPath: string, iconStyles: string, title: string, body: string }) => {
    return (
        <div className={classNames(styles.container, styles.boundingBox)}>
            <div className={styles.cardHeader}>
                <div className={styles.icon}>
                    <img src={iconPath} className={iconStyles} />
                </div>
                <div className={styles.title}>
                    <CardTitle title={title} />
                </div>
            </div>
            <div className={grid.row}>
                <div className={classNames(grid.col12, styles.body)}>
                    <CardBody body={body} />
                </div>
            </div>
            <div className={grid.row}>
                <div className={classNames(grid.col12, styles.button)}>
                    Details
                </div>
            </div>
        </div>
    )
}

export default Card;