import * as React from "react";
import { connect } from "react-redux";

import SelectOption from "../SelectOption";

import { selectFrontendFramework as selectFrontendAction } from "../../actions/wizardSelectionActions/selectFrontEndFramework";
import { selectPagesAction } from "../../actions/wizardSelectionActions/selectPages";

import { IOption } from "../../types/option";
import { ISelected } from "../../types/selected";
import {
  EXTENSION_MODULES,
  EXTENSION_COMMANDS,
  PAYLOAD_MESSAGES_TEXT,
  WIZARD_CONTENT_INTERNAL_NAMES
} from "../../utils/constants";

import { defineMessages, injectIntl, InjectedIntlProps } from "react-intl";
import { AppState } from "../../reducers";
import RootAction from "../../actions/ActionType";
import { ThunkDispatch } from "redux-thunk";
import { IVSCodeObject } from "../../reducers/vscodeApiReducer";
import { getVSCodeApiSelector } from "../../selectors/vscodeApiSelector";

import {
  getIsVisitedRoutesSelector,
  IVisitedPages
} from "../../selectors/wizardNavigationSelector";
import { optionCSS } from "react-select/lib/components/Option";

interface IDispatchProps {
  selectFrontendFramework: (framework: ISelected) => void;
  selectPages: (pages: ISelected[]) => void;
}

interface ISelectFrontEndFrameworkProps {
  options: IOption[];
  selectedFrontendFramework: ISelected;
  selectedBackendFramework: ISelected;
  vscode: IVSCodeObject;
  isPreview: boolean;
  isRoutesVisited: IVisitedPages;
  selectedPages: ISelected[];
}

type Props = IDispatchProps & ISelectFrontEndFrameworkProps & InjectedIntlProps;

const messages = defineMessages({
  selectFrontendFramework: {
    id: "selectFrontendFramework.selectFrontendFramework",
    defaultMessage: "Select a front-end framework"
  }
});

class SelectFrontEndFramework extends React.Component<Props> {
  public handleFrameworkChange(option: ISelected) {
    const {
      vscode,
      selectedFrontendFramework,
      selectedBackendFramework,
      selectFrontendFramework,
      selectedPages,
      selectPages
    } = this.props;

    const { showPages } = this.props.isRoutesVisited;

    if (
      showPages &&
      selectedFrontendFramework.internalName &&
      selectedFrontendFramework.internalName !== option.internalName
    ) {
      console.log(JSON.stringify(selectedPages));
      console.log(option.internalName);
      console.log(selectedFrontendFramework.internalName);
      vscode.postMessage({
        module: EXTENSION_MODULES.CORETS,
        command: EXTENSION_COMMANDS.GET_PAGES,
        payload: {
          projectType: WIZARD_CONTENT_INTERNAL_NAMES.FULL_STACK_APP,
          frontendFramework: option.internalName,
          backendFramework: selectedBackendFramework.internalName
        }
      });
      const newPages: ISelected[] = selectedPages.map(page => {
        return {
          title: page.title,
          internalName: `wts.Page.${option.internalName}.${page.defaultName}`,
          id: page.id,
          defaultName: page.defaultName,
          isValidTitle: page.isValidTitle,
          licenses: page.licenses,
          author: page.author
        };
      });
      selectPages(newPages);
    }
    selectFrontendFramework(option);
  }
  /**
   * Finds the index of the framework currently selected in the wizard
   *
   * @param framework
   */
  public convertSelectionToIndexNumber(framework: any): number[] {
    for (let i = 0; i < this.props.options.length; i++) {
      if (this.props.options[i].internalName === framework.internalName) {
        return [i];
      }
    }
    return [0];
  }

  public render() {
    const { options, selectedFrontendFramework, intl } = this.props;
    return (
      <div>
        {this.props.options.length > 0 && (
          <SelectOption
            selectCard={this.handleFrameworkChange.bind(this)}
            multiSelect={false}
            title={intl.formatMessage(messages.selectFrontendFramework)}
            isFrameworkSelection={true}
            options={options}
            selectedCardIndices={this.convertSelectionToIndexNumber(
              selectedFrontendFramework
            )}
          />
        )}
      </div>
    );
  }
}

const mapStateToProps = (state: AppState): ISelectFrontEndFrameworkProps => {
  const { frontendOptions, previewStatus } = state.wizardContent;
  const { frontendFramework, backendFramework } = state.selection;
  const { pages } = state.selection;

  return {
    isPreview: previewStatus,
    isRoutesVisited: getIsVisitedRoutesSelector(state),
    options: frontendOptions,
    selectedFrontendFramework: frontendFramework,
    selectedBackendFramework: backendFramework,
    selectedPages: pages,
    vscode: getVSCodeApiSelector(state)
  };
};

const mapDispatchToProps = (
  dispatch: ThunkDispatch<AppState, void, RootAction>
): IDispatchProps => ({
  selectFrontendFramework: (framework: ISelected) => {
    dispatch(selectFrontendAction(framework));
  },
  selectPages: (pages: ISelected[]) => {
    dispatch(selectPagesAction(pages));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(injectIntl(SelectFrontEndFramework));
