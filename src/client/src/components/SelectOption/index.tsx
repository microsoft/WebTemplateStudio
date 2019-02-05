import * as React from 'react';
import classNames from 'classnames';

import Card from '../Card';
import blankpage from '../../assets/blankpage.svg';

import grid from '../../css/grid.module.css';
import styles from './styles.module.css';

import { Option } from '../../types/option';

const SelectOption = ({ title, options }: { title: string, options: Array<Option> }) => {
    return (
        <div>
            <div className={grid.row}>
                <div className={classNames(grid.col12, styles.title)}>
                    { title }
                </div>
            </div>
            <div className={styles.container}>
                { options.map((option) => <Card iconPath={option.svgUrl} iconStyles={styles.icon} title={option.title} body={option.body} />)}
            </div>
        </div>
    )
}

export default SelectOption;