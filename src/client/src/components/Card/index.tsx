import * as React from 'react';
import classNames from 'classnames';

import CardTitle from '../CardTitle';
import CardBody from '../CardBody';

import grid from '../../css/grid.module.css';
import styles from './styles.module.css';

const Card = () => {
    return (
        <div className={classNames(styles.container, styles.boundingBox)}>
            <div className={grid.row}>
                <div className={classNames(grid.col12, styles.title)}>
                    <CardTitle title="Single Page Application" />
                </div>
            </div>
            <div className={grid.row}>
                <div className={classNames(grid.col12, styles.body)}>
                    <CardBody text='AngularJS is an open source, front-end web application framework maintained by Google to develop single page applications.' />
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