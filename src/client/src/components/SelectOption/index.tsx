import * as React from "react";
import { connect } from "react-redux";

import Card from "../SelectableCard";
import Title from "../Title";

import styles from "./styles.module.css";

import { setDetailPageAction } from "../../actions/setDetailsPage";

import { IOption } from "../../types/option";
import { ISelected } from "../../types/selected";

interface ICount {
  [key: string]: number;
}

interface ISelectOptionProps {
  title: string;
  internalName?: string;
  selectCard?: (card: ISelected) => void;
  selectedCardIndices: number[];
  currentCardData?: ISelected[];
  selectOptions?: (cards: ISelected[]) => void;
  options: IOption[];
  multiSelect: boolean;
  cardTypeCount?: ICount;
  handleCountUpdate?: (cardCount: ICount) => any;
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
      selectedCardIndices: [0]
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
  public createTitle(optionIndexContainingData: number, count: number) {
    const { title } = this.props.options[optionIndexContainingData];
    if (count === 1) {
      return title;
    }
    return `${title}${count}`;
  }

  public mapIndexToCardInfo(
    count: number,
    internalName: string,
    optionIndexContainingData: number
  ) {
    const { defaultName } = this.props.options[optionIndexContainingData];
    const title = this.createTitle(optionIndexContainingData, count);
    const cardInfo: ISelected = {
      title,
      internalName,
      id: title,
      defaultName,
      isValidTitle: true
    };
    return cardInfo;
  }

  /**
   * Allows more than one option to be selected at a time.
   * Updates the redux store with the selection.
   *
   * @param cardNumber
   */
  public addOption(
    cardNumber: number,
    cardCount: number,
    internalName: string
  ) {
    const { selectedCardIndices, currentCardData, selectOptions } = this.props;
    selectedCardIndices.push(cardNumber);
    if (selectOptions && currentCardData) {
      currentCardData.push(
        this.mapIndexToCardInfo(cardCount, internalName, cardNumber)
      );
      selectOptions(currentCardData);
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
    const { selectCard, options } = this.props;
    selectedCardIndices.pop();
    selectedCardIndices.push(cardNumber);
    const ver = `v${options[cardNumber].version || "1.0"}`;

    if (selectCard) {
      selectCard({
        internalName: options[cardNumber].internalName,
        title: options[cardNumber].title,
        version: ver
      });
    }
    this.setState({
      selectedCardIndices
    });
  }

  public onCardClick(cardNumber: number) {
    const {
      options,
      multiSelect,
      cardTypeCount,
      handleCountUpdate
    } = this.props;
    const { unselectable, internalName } = options[cardNumber];
    if (unselectable) {
      return;
    }
    if (multiSelect) {
      if (cardTypeCount && handleCountUpdate) {
        cardTypeCount[internalName] = cardTypeCount[internalName]
          ? cardTypeCount[internalName] + 1
          : 1;
        handleCountUpdate(cardTypeCount);
        this.addOption(cardNumber, cardTypeCount[internalName], internalName);
      }
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
            );
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
