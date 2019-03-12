import * as React from "react";
import { connect } from "react-redux";

import Card from "../SelectableCard";
import Title from "../Title";

import grid from "../../css/grid.module.css";
import styles from "./styles.module.css";

import { setDetailPageAction } from "../../actions/setDetailsPage";

import { IOption } from "../../types/option";
import { ISelected } from "../../types/selected";

interface ISelectOptionProps {
  title: string;
  internalName?: string;
  selectCard?: (card: ISelected) => void;
  selectedCards?: number[];
  selectOptions?: (cards: ISelected[]) => void;
  options: IOption[];
  multiSelect: boolean;
}

interface ISelectOptionState {
  selectedCards: number[];
}

interface IDispatchProps {
  setDetailPage: (detailPageInfo: IOption) => void;
}

type Props = ISelectOptionProps & IDispatchProps;

class SelectOption extends React.Component<Props, ISelectOptionState> {
  constructor(props: any) {
    super(props);
    if (this.props.multiSelect) {
      this.state = {
        selectedCards: this.props.selectedCards ? this.props.selectedCards : []
      };
    } else {
      this.state = {
        selectedCards: this.props.selectedCards ? this.props.selectedCards : [0]
      };
    }
  }

  public isCardSelected(cardNumber: number): boolean {
    if (this.props.selectedCards) {
      return this.props.selectedCards.includes(cardNumber);
    }
    return this.state.selectedCards.includes(cardNumber);
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
    for (const num of cardNumbers) {
      /**
       * originalTitle is for page layouts.
       */
      const cardToConvert: {
        title: string;
        internalName: string;
        originalTitle?: string;
      } = {
        title: this.props.options[num].title,
        internalName: this.props.options[num].internalName
      };
      if (this.props.options[num].hasOwnProperty("originalTitle")) {
        cardToConvert.originalTitle = this.props.options[num].originalTitle;
      }
      cardTitles.push(cardToConvert);
    }
    return cardTitles;
  }

  /**
   * Allows more than one option to be selected at a time.
   * Updates the redux store with the selection.
   *
   * @param cardNumber
   */
  public addOrRemoveOption(cardNumber: number) {
    const { selectedCards } = this.state;
    let filteredCards = selectedCards;
    if (this.isCardSelected(cardNumber)) {
      filteredCards = filteredCards.filter(val => val !== cardNumber);
    } else {
      filteredCards.push(cardNumber);
    }
    if (this.props.selectOptions !== undefined) {
      this.props.selectOptions(this.convertCardNumbersToTitles(filteredCards));
    }
    this.setState({
      selectedCards: filteredCards
    });
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
    if (this.props.options[cardNumber].unselectable) {
      return;
    }
    if (this.props.multiSelect) {
      this.addOrRemoveOption(cardNumber);
    } else {
      this.exchangeOption(cardNumber);
    }
  }

  public render() {
    return (
      <div>
        <Title>{this.props.title}</Title>
        <div className={styles.container}>
          {this.props.options.map((option, cardNumber) => (
            <Card
              option={option}
              key={`${cardNumber} ${option.title}`}
              onCardClick={(cardNumber: number) => {
                this.onCardClick(cardNumber);
              }}
              onDetailsClick={this.props.setDetailPage}
              cardNumber={cardNumber}
              selected={this.isCardSelected(cardNumber)}
              iconPath={option.svgUrl}
              iconStyles={styles.icon}
              title={option.title}
              body={option.body}
              unselectable={option.unselectable}
            />
          ))}
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch: any): IDispatchProps => ({
  setDetailPage: (detailPageInfo: IOption) => {
    dispatch(setDetailPageAction(detailPageInfo));
  }
});

export default connect(
  null,
  mapDispatchToProps
)(SelectOption);
