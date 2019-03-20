import * as React from "react";

import Card from "../SelectableCard";
import Title from "../Title";

import styles from "./styles.module.css";

import { IOption } from "../../types/option";
import { ISelected } from "../../types/selected";

interface ISelectOptionProps {
  title: string;
  internalName?: string;
  selectCard?: (card: ISelected) => void;
  selectedCards: number[];
  selectedCardData?: ISelected[];
  selectOptions?: (cards: ISelected[]) => void;
  options: IOption[];
  multiSelect: boolean;
}

interface ISelectOptionState {
  selectedCards: number[];
}

class SelectOption extends React.Component<
  ISelectOptionProps,
  ISelectOptionState
> {

  componentDidMount() {
    this.setState({
      selectedCards: [0],
    });
  }

  public isCardSelected(cardNumber: number): boolean {
    if (this.props.selectedCards) {
      return this.props.selectedCards.includes(cardNumber);
    }
    return this.state.selectedCards.includes(cardNumber);
  }

  public getPageTitle(i: number, num: number, count: number, cardData: ISelected[]) {
    if (count === 1) {
      return this.props.options[num].title;
    } else if (i > cardData.length - 1) {
      return `${count}-${this.props.options[num].title}`
    }
    return cardData[i].title;
  }

  public createdSelectedPage(i: number, count: number, internalName: string, num: number, cardData: ISelected[]) {
      const cardToConvert: ISelected = {
        title: this.getPageTitle(i, num, count, cardData),
        internalName,
        id: `${i}-${this.props.options[num].title}`
      };
      if (this.props.options[num].hasOwnProperty("originalTitle")) {
        cardToConvert.originalTitle = this.props.options[num].originalTitle;
      }
      return cardToConvert;
  }

  /**
   * Converts the index numbers of options into ids
   * In this case, titles, but can be changed to whatever is required
   * by the redux store.
   *
   * @param cardNumbers
   */
  public convertCardNumbersToTitles(cardNumbers: number[]): ISelected[] {
    const cardTitles = [];
    const cardTypeCount: {[key: string]: number} = {};
    for (let i = 0 ; i < cardNumbers.length ; i++) {
      const num = cardNumbers[i];
      const { internalName } = this.props.options[num];
      if (!cardTypeCount.hasOwnProperty(internalName)) {
        cardTypeCount[internalName] = 1;
      } else {
        cardTypeCount[internalName] += 1;
      }
      if (this.props.selectedCardData) {
        cardTitles.push(this.createdSelectedPage(i, cardTypeCount[internalName], internalName, num, this.props.selectedCardData));
      }
    }
    return cardTitles;
  }

  /**
   * Allows more than one option to be selected at a time.
   * Updates the redux store with the selection.
   *
   * @param cardNumber
   */
  public addOption(cardNumber: number) {
    const { selectedCards } = this.state;
    selectedCards.push(cardNumber);
    if (this.props.selectOptions !== undefined) {
      this.props.selectOptions(this.convertCardNumbersToTitles(selectedCards));
    }
  }

  /**
   * Ensures only one option can be selected at a time.
   * Updates the component state and the redux store with selection.
   *
   * @param cardNumber
   */
  public exchangeOption(cardNumber: number) {
    const { selectedCards } = this.state;
    selectedCards.pop();
    selectedCards.push(cardNumber);
    if (this.props.selectCard !== undefined) {
      this.props.selectCard({
        title: this.props.options[cardNumber].title,
        internalName: this.props.options[cardNumber].internalName
      });
    }
    this.setState({
      selectedCards
    });
  }

  public onCardClick(cardNumber: number) {
    const { unselectable } = this.props.options[cardNumber];
    if (unselectable) {
      return;
    }
    if (this.props.multiSelect) {
      this.addOption(cardNumber);
    } else {
      this.exchangeOption(cardNumber);
    }
  }

  /**
   * If this is a card that can be selected many times, this function returns
   * the number of times that a particular card was selected/clicked on.
   * 
   * If card can only be clicked once, this function returns undefined.
   */
  public getNumber = (internalName: string) => {
    if (this.props.selectedCards && this.props.multiSelect) {
      return this.props.selectedCards.reduce((accum: number, card: number) => {
        if (this.props.options[card].internalName === internalName) {
          return accum + 1;
        }
        return accum;
      }, 0);
    }
  }

  public render() {
    return (
      <div>
        <Title>{this.props.title}</Title>
        <div className={styles.container}>
          {this.props.options.map((option, cardNumber) => (
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
              disabled={option.unselectable}
              clickCount={this.getNumber(option.internalName)}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default SelectOption;
