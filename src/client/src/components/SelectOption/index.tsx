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
  selectedCardIndices: number[];
  currentCardData?: ISelected[];
  selectOptions?: (cards: ISelected[]) => void;
  options: IOption[];
  multiSelect: boolean;
}

interface ISelectOptionState {
  selectedCardIndices: number[];
}

interface IDispatchProps {
  setDetailPage: (detailPageInfo: IOption) => void;
}

type Props = IDispatchProps & ISelectOptionProps;

class SelectOption extends React.Component<Props, ISelectOptionState> {
  componentDidMount() {
    this.setState({
      selectedCardIndices: [0],
    });
  }

  public isCardSelected(cardNumber: number): boolean {
    const { selectedCardIndices } = this.props;
    if (selectedCardIndices) {
      return selectedCardIndices.includes(cardNumber);
    }
    return this.state.selectedCardIndices.includes(cardNumber);
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

  public mapIndexToCardInfo(selectedCardIndex: number, count: number, internalName: string, num: number, currentCardData: ISelected[]) {
    const { defaultName } = this.props.options[num];
    const title = this.createTitle(selectedCardIndex, num, count, currentCardData);
    const cardInfo: ISelected = {
      title,
      internalName,
      id: title,
      defaultName
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
  public mapSelectedCardIndicesToCardInfo(selectedCardIndices: number[]): ISelected[] {
    const selectedCardsWithInfo = [];
    const cardTypeCount: { [key: string]: number } = {};
    const { currentCardData, options } = this.props;
    for (let selectedCardIndex = 0; selectedCardIndex < selectedCardIndices.length; selectedCardIndex++) {
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
    const { selectedCardIndices, selectOptions } = this.props;
    selectedCardIndices.push(cardNumber);
    if (selectOptions) {
      selectOptions(this.mapSelectedCardIndicesToCardInfo(selectedCardIndices));
    }
    this.setState({
      selectedCardIndices
    });
  }

  /**
   * Ensures only one option can be selected at a time.
   * Updates the component state and the redux store with selection.
   *
   * @param cardNumber
   */
  public exchangeOption(cardNumber: number) {
    const { selectedCardIndices } = this.state;
    selectedCardIndices.pop();
    selectedCardIndices.push(cardNumber);
    if (this.props.selectCard) {
      this.props.selectCard({
        title: this.props.options[cardNumber].title,
        internalName: this.props.options[cardNumber].internalName
      });
    }
    this.setState({
      selectedCardIndices
    });
  }

  public onCardClick(cardNumber: number) {
    const { options, multiSelect } = this.props;
    const { unselectable } = options[cardNumber];
    if (unselectable) {
      return;
    }
    if (multiSelect) {
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
    const { selectedCardIndices, multiSelect, options } = this.props;
    if (selectedCardIndices && multiSelect) {
      return selectedCardIndices.reduce((cardCount: number, card: number) => {
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
          {options.map((option, cardNumber) => {
            const { svgUrl, title, body, unselectable, internalName } = option;
            return (
              <Card
                key={`${cardNumber} ${title}`}
                onCardClick={(cardNumber: number) => {
                  this.onCardClick(cardNumber);
                }}
                onDetailsClick={setDetailPage}
                option={option}
                cardNumber={cardNumber}
                selected={this.isCardSelected(cardNumber)}
                iconPath={svgUrl}
                iconStyles={styles.icon}
                title={title}
                body={body}
                disabled={unselectable}
                clickCount={this.getCardCount(internalName)}
              />
            )
          })}
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
