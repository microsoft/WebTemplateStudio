import * as React from 'react';
import classNames from 'classnames';

import Card from '../Card';
import SelectOption from '../SelectOption';

import blankpage from '../../assets/blankpage.svg';
import options from './optionsData';

import grid from '../../css/grid.module.css';
import styles from './styles.module.css';

class SelectWebApp extends React.Component {
    public render() {
        return (
            <div>
                <SelectOption title="1. What type of web application are you building?" options={options} />
            </div>
        )
    }
}

export default SelectWebApp;