import * as React from "react";
import { connect } from "react-redux";

import SelectableCard from "../SelectableCard";
import Title from "../../components/Title";

import styles from "./styles.module.css";

import { setDetailPageAction } from "../../actions/wizardInfoActions/setDetailsPage";

import { IOption } from "../../types/option";
import { ISelected } from "../../types/selected";
import { Dispatch } from "redux";
import RootAction from "../../actions/ActionType";

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
  isFrameworkSelection: boolean;
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
  constructor(props: Props) {
    super(props);
    const { selectedCardIndices } = props;
    this.state = {
      selectedCardIndices
    };
  }
  public componentDidMount() {
    const {
      selectCard,
      selectOptions,
      options,
      selectedCardIndices
    } = this.props;
    if (selectCard) {
      this.exchangeOption(selectedCardIndices[0]);
      this.setState({
        selectedCardIndices
      });
    } else if (selectOptions) {
      if (selectedCardIndices.length === 0) {
        this.onCardClick(0);
      }
      this.setState({
        selectedCardIndices
      });
    }
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
    const { defaultName, licenses, author } = this.props.options[
      optionIndexContainingData
    ];
    const title = this.createTitle(optionIndexContainingData, count);

    const cardInfo: ISelected = {
      title: title as string,
      internalName,
      id: title as string,
      defaultName,
      isValidTitle: true,
      licenses,
      author
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
    const shorthandVersionLabel = `v${options[cardNumber].version || "1.0"}`;
    const { title, internalName, licenses, author } = this.props.options[
      cardNumber
    ];

    if (selectCard) {
      selectCard({
        internalName,
        title: title as string,
        version: shorthandVersionLabel,
        licenses,
        author
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

  addPage(cardNumber: number) {
    const {
      options,
      multiSelect,
      cardTypeCount,
      handleCountUpdate
    } = this.props;
    const { unselectable, internalName } = options[cardNumber];
    if (cardTypeCount && handleCountUpdate) {
      cardTypeCount[internalName] = cardTypeCount[internalName]
        ? cardTypeCount[internalName] + 1
        : 1;
      handleCountUpdate(cardTypeCount);
      this.addOption(cardNumber, cardTypeCount[internalName], internalName);
    }
  }

  public render() {
    const { title, options, setDetailPage, isFrameworkSelection } = this.props;
    return (
      <div>
        <Title>{title}</Title>
        <div className={styles.container}>
          {options.map((option, cardNumber) => {
            const { svgUrl, title, body, unselectable, internalName } = option;
            return (
              <SelectableCard
                key={`${cardNumber} ${title}`}
                isFrameworkSelection={isFrameworkSelection}
                onCardClick={(cardNumber: number) => {
                  this.onCardClick(cardNumber);
                }}
                onDetailsClick={setDetailPage}
                option={option}
                cardNumber={cardNumber}
                selected={this.isCardSelected(cardNumber)}
                iconPath={svgUrl}
                iconStyles={styles.icon}
                title={title as string}
                body={body as string}
                disabled={unselectable}
                clickCount={this.getCardCount(internalName)}
                addPage={(cardNumber: number) => this.addPage(cardNumber)}
              />
            );
          })}
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (
  dispatch: Dispatch<RootAction>
): IDispatchProps => ({
  setDetailPage: (detailPageInfo: IOption) => {
    dispatch(setDetailPageAction(detailPageInfo));
  }
});

export default connect(
  null,
  mapDispatchToProps
)(SelectOption);
