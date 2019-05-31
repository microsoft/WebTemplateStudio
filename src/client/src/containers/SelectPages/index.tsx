import * as React from "react";
import { connect } from "react-redux";

import SelectOption from "../SelectOption";

import {
  selectPagesAction,
  updatePageCountAction
} from "../../actions/wizardSelectionActions/selectPages";

import { IOption } from "../../types/option";
import { ISelected } from "../../types/selected";
import { getPagesOptionsAction } from "../../actions/wizardContentActions/getPagesOptions";
import { getPageCount } from "../../selectors/wizardSelectionSelector";
import { IPageCount } from "../../reducers/wizardSelectionReducers/pageCountReducer";

import { defineMessages, InjectedIntl, injectIntl } from "react-intl";
import { AppState } from "../../reducers";
import { ThunkDispatch } from "redux-thunk";
import RootAction from "../../actions/ActionType";

interface IDispatchProps {
  selectPages: (pages: ISelected[]) => void;
  getPages: (
    projectType: string,
    frontendFramework: string,
    backendFramework: string,
    serverPort: number
  ) => void;
  updatePageCount: (pageCount: IPageCount) => any;
}

interface ISelectPagesProps {
  options: IOption[];
  selectedBackend: ISelected;
  selectedFrontend: ISelected;
  selectedPages: ISelected[];
  serverPort: number;
  selectedProjectType: ISelected;
  pageCount: IPageCount;
}

interface IIntlProps {
  intl: InjectedIntl;
}

type Props = IDispatchProps & ISelectPagesProps & IIntlProps;

const messages = defineMessages({
  pagesTitleQuestion: {
    id: "selectPages.pagesTitleQuestion",
    defaultMessage: "Select pages for your application."
  }
});

class SelectPages extends React.Component<Props> {
  public componentDidMount() {
    const {
      getPages,
      selectedBackend,
      selectedFrontend,
      selectedProjectType,
      serverPort
    } = this.props;

    if (getPages !== undefined) {
      getPages(
        selectedProjectType.internalName,
        selectedFrontend.internalName,
        selectedBackend.internalName,
        serverPort
      );
    }
  }

  public componentDidUpdate(newProps: ISelectPagesProps) {
    if (newProps.options.length === 0) {
      const {
        getPages,
        selectedBackend,
        selectedFrontend,
        selectedProjectType,
        serverPort
      } = this.props;

      getPages(
        selectedProjectType.internalName,
        selectedFrontend.internalName,
        selectedBackend.internalName,
        serverPort
      );
    }
  }

  /**
   * Maps the selected page of the user and saves its state
   * so it can show up as a selected card
   */
  public convertSelectedPagesToIndices = (pages: ISelected[]): number[] => {
    const { options } = this.props;
    const selectedPageIndices = [];
    for (let i = 0; i < pages.length; i++) {
      for (let j = 0; j < options.length; j++) {
        if (pages[i].internalName === options[j].internalName) {
          selectedPageIndices.push(j);
        }
      }
    }
    return selectedPageIndices;
  };
  public render() {
    const {
      options,
      selectPages,
      selectedPages,
      intl,
      pageCount,
      updatePageCount
    } = this.props;
    return (
      <div>
        {options.length > 0 && (
          <SelectOption
            selectOptions={selectPages}
            multiSelect={true}
            selectedCardIndices={this.convertSelectedPagesToIndices(
              selectedPages
            )}
            title={intl.formatMessage(messages.pagesTitleQuestion)}
            options={options}
            currentCardData={selectedPages}
            cardTypeCount={pageCount}
            handleCountUpdate={updatePageCount}
          />
        )}
      </div>
    );
  }
}

const mapStateToProps = (state: AppState): ISelectPagesProps => {
  const { pageOptions, serverPort } = state.wizardContent;
  const { pages } = state.selection;
  const { appType } = state.selection;
  const { frontendFramework } = state.selection;
  const { backendFramework } = state.selection;

  return {
    options: pageOptions,
    selectedBackend: backendFramework,
    selectedFrontend: frontendFramework,
    selectedPages: pages,
    serverPort,
    selectedProjectType: appType,
    pageCount: getPageCount(state)
  };
};

const mapDispatchToProps = (
  dispatch: ThunkDispatch<AppState, void, RootAction>
): IDispatchProps => ({
  getPages: (
    projectType: string,
    frontendFramework: string,
    backendFramework: string,
    serverPort: number
  ) => {
    dispatch(
      getPagesOptionsAction(
        projectType,
        frontendFramework,
        backendFramework,
        serverPort
      )
    );
  },
  selectPages: (pages: ISelected[]) => {
    dispatch(selectPagesAction(pages));
  },
  updatePageCount: (pageCount: IPageCount) => {
    dispatch(updatePageCountAction(pageCount));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(injectIntl(SelectPages));
