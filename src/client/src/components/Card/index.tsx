import * as React from 'react';
import classNames from 'classnames';

import CardTitle from '../CardTitle';
import CardBody from '../CardBody';

import grid from '../../css/grid.module.css';
import styles from './styles.module.css';

const Card = ({ iconPath, iconStyles, title, body, selected, cardNumber, onCardClick }: { iconPath: string | undefined, iconStyles: string, title: string, body: string, selected: boolean, cardNumber: number, onCardClick: (idx: number) => void }) => {
    return (
        <div onClick={() => { onCardClick(cardNumber) }} className={classNames(styles.container, styles.boundingBox, { [styles.selected]: selected })}>
            <div className={styles.cardHeader}>
                <div className={styles.icon}>
                    {!!iconPath && <img src={iconPath} className={iconStyles} />}
                </div>
                <div className={classNames({ 
                    [styles.title]: !!iconPath,
                    [styles.titleLeftJustified]: iconPath === undefined ? true : false
                })}>
                    <CardTitle title={title} />
                </div>
            </div>
            <div className={grid.row}>
                <div className={classNames(grid.col12, styles.body)}>
                    <CardBody body={body} />
                </div>
            </div>
            <div className={styles.cardFooter}>
                <div className={classNames(styles.button)}>
                    Details
                </div>
                <div className={classNames({
                    [styles.hidden]: !selected
                })}>
                    Selected
                </div>
            </div>
        </div>
    )
}

export default Card;