import * as React from 'react';
import classNames from 'classnames';

import Card from '../Card';
import blankpage from '../../assets/blankpage.svg';

import grid from '../../css/grid.module.css';
import styles from './styles.module.css';

class SelectWebApp extends React.Component {
    public render() {
        return (
            <div>
                <div className={grid.row}>
                    <div className={classNames(grid.col12, styles.title)}>
                        1. What type of web application are you building?
                    </div>
                </div>
                <div className={styles.container}>
                    <Card iconPath={blankpage} iconStyles={styles.icon} title="Single Page" body="AngularJS is an open source, front-end web application framework maintained by Google to develop single page applications." />
                </div>
            </div>
        )
    }
}

export default SelectWebApp;