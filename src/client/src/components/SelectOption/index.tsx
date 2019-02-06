import * as React from 'react';
import classNames from 'classnames';

import Card from '../Card';;

import grid from '../../css/grid.module.css';
import styles from './styles.module.css';

import { Option } from '../../types/option';

type SelectOptionProps = {
    title: string,
    options: Array<Option>
};

type SelectOptionState = {
    options: Array<Option>,
    selectedCardNumber: number | undefined
};

class SelectOption extends React.Component<SelectOptionProps,SelectOptionState> {
    constructor(props: any) {
        super(props)
        this.state = {
            options: this.props.options,
            selectedCardNumber: undefined
        }
    }

    public onCardClick(cardNumber: number) {
        this.setState({
            selectedCardNumber: cardNumber
        })
    }

    public render() {
        const { options } = this.state;
        return (
            <div>
                <div className={grid.row}>
                    <div className={classNames(grid.col12, styles.title)}>
                        { this.props.title }
                    </div>
                </div>
                <div className={styles.container}>
                    { options.map((option, cardNumber) => <Card onCardClick={(cardNumber: number) => {this.onCardClick(cardNumber)}} cardNumber={cardNumber} selected={cardNumber === this.state.selectedCardNumber} iconPath={option.svgUrl} iconStyles={styles.icon} title={option.title} body={option.body} />)}
                </div>
            </div>
        )
    }
}

// const SelectOption = ({ title, options }: { title: string, options: Array<Option> }) => {
//     return (

//     )
// }

export default SelectOption;