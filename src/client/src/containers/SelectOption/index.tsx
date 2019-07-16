import * as React from "react";
import { connect } from "react-redux";
import classnames from "classnames";

import SelectableCard from "../../components/SelectableCard";
import Notification from "../../components/Notification";
import Title from "../../components/Title";
import { MAX_PAGES_ALLOWED } from "../../utils/constants";

import styles from "./styles.module.css";

import { setDetailPageAction } from "../../actions/wizardInfoActions/setDetailsPage";

import { IOption } from "../../types/option";
import { ISelected } from "../../types/selected";
import { Dispatch } from "redux";
import RootAction from "../../actions/ActionType";

import { InjectedIntl, defineMessages, injectIntl } from "react-intl";

const messages = defineMessages({
  limitedPages: {
    id: "pages.limitedPagesMessage",
    defaultMessage: "You can select up to 20 pages"
  },
  overlimitPages: {
    id: "pages.overlimitPagesMessage",
    defaultMessage: "You cannot add more than 20 pages to the project"
  },
  iconAltMessage: {
    id: "pages.maxPagesText",
    defaultMessage: "Icon for Max Pages Description"
  }
});

interface ICount {
  [key: string]: number;
}

interface IProps {
  intl: InjectedIntl;
}

interface ISelectOptionProps {
  title: string;
  description: string;
  internalName?: string;
  selectCard?: (card: ISelected) => void;
  selectedCardIndices: number[];
  currentCardData?: ISelected[];
  selectOptions?: (cards: ISelected[]) => void;
  options: IOption[];
  multiSelect: boolean;
  isFrameworkSelection: boolean;
  isPagesSelection: boolean;
  cardTypeCount?: ICount;
  handleCountUpdate?: (cardCount: ICount) => any;
}

interface ISelectOptionState {
  selectedCardIndices: number[];
  maxPageReached: boolean;
  description: string;
}

interface IDispatchProps {
  setDetailPage: (detailPageInfo: IOption) => void;
}

type Props = IDispatchProps & ISelectOptionProps & IProps;

class SelectOption extends React.Component<Props, ISelectOptionState> {
  constructor(props: Props) {
    super(props);
    const { selectedCardIndices } = props;
    this.state = {
      selectedCardIndices,
      maxPageReached: false,
      description: props.intl.formatMessage(messages.limitedPages)
    };
  }
  public componentDidMount() {
    const { selectCard, selectOptions, selectedCardIndices } = this.props;
    if (selectCard) {
      this.exchangeOption(selectedCardIndices[0]);
      this.setState({
        selectedCardIndices
      });
    } else if (selectOptions) {
      if (selectedCardIndices.length === 0) {
        this.onCardClick(0);
        this.addPage(0);
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
      const currentCards = currentCardData.splice(0);
      currentCards.push(
        this.mapIndexToCardInfo(cardCount, internalName, cardNumber)
      );
      selectOptions(currentCards);
    }
    this.setState({
      selectedCardIndices
    });
  }

  public removeOption(internalName: string) {
    const { selectedCardIndices, currentCardData, selectOptions } = this.props;
    if (selectOptions && currentCardData && currentCardData.length > 1) {
      const size = currentCardData.length;
      const currentCards = currentCardData.splice(0);
      for (let i = size - 1; i >= 0; i--) {
        if (currentCards[i].internalName === internalName) {
          currentCards.splice(i, 1);
          break;
        }
      }
      selectOptions(currentCards);
      this.setState({
        selectedCardIndices
      });
    }
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
    const { options, multiSelect } = this.props;
    const { unselectable } = options[cardNumber];
    if (unselectable) {
      return;
    }
    if (!multiSelect) {
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

  public addPage = (cardNumber: number) => {
    const {
      options,
      cardTypeCount,
      handleCountUpdate,
      currentCardData,
      intl
    } = this.props;
    const { internalName } = options[cardNumber];
    if (currentCardData && currentCardData.length >= MAX_PAGES_ALLOWED) {
      this.setState({
        maxPageReached: true,
        description: intl.formatMessage(messages.overlimitPages)
      });
      return;
    }
    if (cardTypeCount && handleCountUpdate) {
      cardTypeCount[internalName] = cardTypeCount[internalName]
        ? cardTypeCount[internalName] + 1
        : 1;
      handleCountUpdate(cardTypeCount);
      this.addOption(cardNumber, cardTypeCount[internalName], internalName);
    }
  };

  public removePage = (cardNumber: number) => {
    const {
      options,
      currentCardData,
      cardTypeCount,
      handleCountUpdate,
      intl
    } = this.props;
    const { internalName } = options[cardNumber];
    this.setState({
      maxPageReached: false,
      description: intl.formatMessage(messages.limitedPages)
    });
    if (
      cardTypeCount &&
      handleCountUpdate &&
      currentCardData &&
      currentCardData.length > 1
    ) {
      this.removeOption(internalName);
    }
  };

  public render() {
    const {
      title,
      options,
      setDetailPage,
      isFrameworkSelection,
      isPagesSelection,
      intl
    } = this.props;
    const { maxPageReached, description } = this.state;
    return (
      <div>
        <Title>{title}</Title>
        {isPagesSelection && (
          <div
            className={classnames(styles.description, {
              [styles.borderGreen]: !maxPageReached,
              [styles.borderYellow]: maxPageReached
            })}
          >
            <Notification
              showWarning={maxPageReached}
              text={description}
              altMessage={intl.formatMessage(messages.iconAltMessage)}
            />
          </div>
        )}
        <div className={styles.container}>
          {options.map((option, cardNumber) => {
            const {
              svgUrl,
              title,
              body,
              unselectable,
              internalName,
              version
            } = option;
            return (
              <SelectableCard
                key={`${cardNumber} ${title}`}
                isFrameworkSelection={isFrameworkSelection}
                isPagesSelection={isPagesSelection}
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
                version={version}
                disabled={unselectable}
                clickCount={this.getCardCount(internalName)}
                addPage={(cardNumber: number) => this.addPage(cardNumber)}
                removePage={(cardNumber: number) => this.removePage(cardNumber)}
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
)(injectIntl(SelectOption));
