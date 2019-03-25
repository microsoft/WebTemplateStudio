import * as React from "react";
import { connect } from "react-redux";

import Card from "../SelectableCard";
import Title from "../Title";

import styles from "./styles.module.css";

import { setDetailPageAction } from "../../actions/setDetailsPage";

import { IOption } from "../../types/option";
import { ISelected } from "../../types/selected";

interface ISelectOptionProps {
  title: string;
  internalName?: string;
  selectCard?: (card: ISelected) => void;
  selectedCards: number[];
  currentCardData?: ISelected[];
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

type Props = IDispatchProps & ISelectOptionProps;

class SelectOption extends React.Component<Props, ISelectOptionState> {
  componentDidMount() {
    this.setState({
      selectedCards: [0]
    });
  }

  public isCardSelected(cardNumber: number): boolean {
    if (this.props.selectedCards) {
      return this.props.selectedCards.includes(cardNumber);
    }
    return this.state.selectedCards.includes(cardNumber);
  }

  /**
   * Creates a title for the card being selected (e.g. selected Page).
   * Prepends a number of a certain card is selected more than once.
   * Only changes the title of the last card selected.
   *
   * @param selectedCardIndex
   * @param optionIndexContainingData
   * @param count
   * @param cardData
   */
  public createTitle(
    selectedCardIndex: number,
    optionIndexContainingData: number,
    count: number,
    cardData: ISelected[]
  ) {
    if (count === 1) {
      return this.props.options[optionIndexContainingData].title;
    } else if (selectedCardIndex > cardData.length - 1) {
      return `${count}-${this.props.options[optionIndexContainingData].title}`;
    }
    return cardData[selectedCardIndex].title;
  }

  public mapIndexToCardInfo(
    selectedCardIndex: number,
    count: number,
    internalName: string,
    num: number,
    currentCardData: ISelected[]
  ) {
    const { originalTitle } = this.props.options[num];
    const title = this.createTitle(
      selectedCardIndex,
      num,
      count,
      currentCardData
    );
    const cardInfo: ISelected = {
      title,
      internalName,
      id: title,
      originalTitle
    };
    return cardInfo;
  }

  /**
   * Converts the index numbers of options into ids
   * In this case, titles, but can be changed to whatever is required
   * by the redux store.
   *
   * @param cardNumbers
   */
  public convertCardNumbersToTitles(
    selectedCardIndices: number[]
  ): ISelected[] {
    const selectedCardsWithInfo = [];
    const cardTypeCount: { [key: string]: number } = {};
    const { currentCardData, options } = this.props;
    for (
      let selectedCardIndex = 0;
      selectedCardIndex < selectedCardIndices.length;
      selectedCardIndex++
    ) {
      const optionIndexContainingData = selectedCardIndices[selectedCardIndex];
      const { internalName } = options[optionIndexContainingData];
      cardTypeCount[internalName] = cardTypeCount[internalName]
        ? cardTypeCount[internalName] + 1
        : 1;
      if (currentCardData) {
        selectedCardsWithInfo.push(
          this.mapIndexToCardInfo(
            selectedCardIndex,
            cardTypeCount[internalName],
            internalName,
            optionIndexContainingData,
            currentCardData
          )
        );
      }
    }
    return selectedCardsWithInfo;
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
   * Returns the number of times that a particular card was selected/clicked on.
   *
   * If card can only be clicked once, this function returns undefined.
   */
  public getCardCount = (internalName: string) => {
    const { selectedCards, multiSelect, options } = this.props;
    if (selectedCards && multiSelect) {
      return selectedCards.reduce((cardCount: number, card: number) => {
        if (options[card].internalName === internalName) {
          return cardCount + 1;
        }
        return cardCount;
      }, 0);
    }
  };

  public render() {
    const { title, options, setDetailPage } = this.props;
    return (
      <div>
        <Title>{title}</Title>
        <div className={styles.container}>
          {options.map((option, cardNumber) => (
            <Card
              option={option}
              key={`${cardNumber} ${option.title}`}
              onCardClick={(cardNumber: number) => {
                this.onCardClick(cardNumber);
              }}
              onDetailsClick={setDetailPage}
              cardNumber={cardNumber}
              selected={this.isCardSelected(cardNumber)}
              iconStyles={styles.icon}
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
