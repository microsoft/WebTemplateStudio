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
import { AppState } from "../../reducers";

import { isAddPagesModalOpenSelector } from "../../selectors/modalSelector";

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
  noPageGeneration: {
    id: "pages.noPageGeneration",
    defaultMessage: "At least 1 page must be selected"
  },
  iconAltMessage: {
    id: "pages.maxPagesText",
    defaultMessage: "Notification"
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
  //description: string;
  //internalName?: string;
  selectCard?: (card: ISelected) => void;
  selectedCardIndices: number[];
  currentCardData: ISelected[];
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
  pageOutOfBounds: boolean;
  description: string;
}

interface IDispatchProps {
  setDetailPage: (detailPageInfo: IOption) => void;
}

interface IStateProps {
  isAddPagesModalOpen: boolean;
}

type Props = IDispatchProps & ISelectOptionProps & IStateProps & IProps;

export class SelectOption extends React.Component<Props, ISelectOptionState> {
  constructor(props: Props) {
    super(props);
    const { selectedCardIndices } = props;
    this.state = {
      selectedCardIndices,
      pageOutOfBounds: false,
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
  public createTitleToNewCard(optionIndexContainingData: number) {
    const { title, internalName } = this.props.options[optionIndexContainingData];
    const { currentCardData } = this.props;
    let newTitle="";

    if (currentCardData){
      const currentCardDataFiltered = currentCardData.filter(cc => cc.internalName == internalName);
      let titleSuggested=title.toString();
      currentCardDataFiltered.forEach((card, index)=>{
        titleSuggested = `${title}${index + 2}`;
        const existTitleSuggested = currentCardDataFiltered.filter(cc => cc.title == titleSuggested).length>0;
        if (!existTitleSuggested){
          newTitle = titleSuggested;
          return;
        }
      });
      if (newTitle=="") newTitle = titleSuggested;
    }

    return newTitle;
  }

  private getNewCard(
    count: number,
    internalName: string,
    optionIndexContainingData: number
  ) {
    const { defaultName, licenses, author } = this.props.options[
      optionIndexContainingData
    ];
    const title = this.createTitleToNewCard(optionIndexContainingData);

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
      let currentCards = currentCardData;
      currentCards.push(
        this.getNewCard(cardCount, internalName, cardNumber)
      );
      selectOptions(currentCards);
    }
    this.setState({
      selectedCardIndices
    });
  }

  public removeOption(internalName: string) {
    const { selectedCardIndices, selectOptions, handleCountUpdate, cardTypeCount } = this.props;
    let { currentCardData } = this.props;
    if (selectOptions && currentCardData.length > 1) {
      const lastCurrentCarDataFiltered = currentCardData.filter(cc => cc.internalName==internalName)[
        currentCardData.filter(cc => cc.internalName==internalName).length-1
      ];
      currentCardData.forEach((card, index)=>{
        if (card.id==lastCurrentCarDataFiltered.id && card.internalName == internalName) currentCardData.splice(index, 1);
      })

      if (cardTypeCount && handleCountUpdate) {
        cardTypeCount[internalName] = this.getCardCount(internalName);
        handleCountUpdate(cardTypeCount);
      }

      selectOptions(currentCardData);
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
    const { currentCardData } = this.props;
    const counterCardData = currentCardData ? 
      currentCardData.filter(cc => cc.internalName==internalName).length:0;
    return counterCardData;
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
        pageOutOfBounds: true,
        description: intl.formatMessage(messages.overlimitPages)
      });
      return;
    }
    this.setState({
      pageOutOfBounds: false,
      description: intl.formatMessage(messages.limitedPages)
    });
    if (cardTypeCount && handleCountUpdate && currentCardData) {
      cardTypeCount[internalName] = this.getCardCount(internalName) + 1;
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
    if (currentCardData && currentCardData.length <= 1) {
      this.setState({
        pageOutOfBounds: true,
        description: intl.formatMessage(messages.noPageGeneration)
      });
      return;
    }
    this.setState({
      pageOutOfBounds: false,
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
      isAddPagesModalOpen,
      intl
    } = this.props;
    const { pageOutOfBounds, description } = this.state;
    return (
      <div>
        <Title>{title}</Title>
        {isPagesSelection && (
          <div
            className={classnames(styles.description, {
              [styles.borderGreen]: !pageOutOfBounds,
              [styles.borderYellow]: pageOutOfBounds
            })}
          >
            <Notification
              showWarning={pageOutOfBounds}
              text={description}
              altMessage={intl.formatMessage(messages.iconAltMessage)}
            />
          </div>
        )}
        <div
          className={classnames(styles.container, {
            [styles.modalContainer]: isAddPagesModalOpen
          })}
        >
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
                showLink={!isAddPagesModalOpen}
              />
            );
          })}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: AppState): IStateProps => ({
  isAddPagesModalOpen: isAddPagesModalOpenSelector(state)
});

const mapDispatchToProps = (
  dispatch: Dispatch<RootAction>
): IDispatchProps => ({
  setDetailPage: (detailPageInfo: IOption) => {
    dispatch(setDetailPageAction(detailPageInfo));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(injectIntl(SelectOption));
