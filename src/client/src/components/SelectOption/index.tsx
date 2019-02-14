import classNames from "classnames";
import * as React from "react";

import Card from "../Card";

import grid from "../../css/grid.module.css";
import styles from "./styles.module.css";

import { IOption } from "../../types/option";

interface ISelectOptionProps {
  title: string;
  options: IOption[];
  multiSelect: boolean;
}

interface ISelectOptionState {
  options: IOption[];
  selectedCards: number[];
}

class SelectOption extends React.Component<
  ISelectOptionProps,
  ISelectOptionState
> {
  constructor(props: any) {
    super(props);
    this.state = {
      options: this.props.options,
      selectedCards: [0]
    };
  }

  public isCardSelected(cardNumber: number): boolean {
    return this.state.selectedCards.includes(cardNumber);
  }

  public addOrRemoveOption(cardNumber: number) {
    const { selectedCards } = this.state;
    let filteredCards = selectedCards;
    if (this.isCardSelected(cardNumber)) {
      filteredCards = filteredCards.filter(val => val !== cardNumber);
    } else {
      filteredCards.push(cardNumber);
    }
    this.setState({
      selectedCards: filteredCards
    });
  }

  public exchangeOption(cardNumber: number) {
    const { selectedCards } = this.state;
    selectedCards.pop();
    selectedCards.push(cardNumber);
    this.setState({
      selectedCards
    });
  }

  public onCardClick(cardNumber: number) {
    if (this.props.multiSelect) {
      this.addOrRemoveOption(cardNumber);
    } else {
      this.exchangeOption(cardNumber);
    }
  }

  public render() {
    const { options } = this.state;
    return (
      <div>
        <div className={grid.row}>
          <div className={classNames(grid.col12, styles.title)}>
            {this.props.title}
          </div>
        </div>
        <div className={styles.container}>
          {options.map((option, cardNumber) => (
            <Card
              key={`${cardNumber} ${option.title}`}
              onCardClick={(cardNumber: number) => {
                this.onCardClick(cardNumber);
              }}
              cardNumber={cardNumber}
              selected={this.isCardSelected(cardNumber)}
              iconPath={option.svgUrl}
              iconStyles={styles.icon}
              title={option.title}
              body={option.body}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default SelectOption;
