import * as React from "react";
import { connect } from "react-redux";

import SelectOption from "../SelectOption";

import { selectFrontendFramework as selectFrontendAction } from "../../actions/wizardSelectionActions/selectFrontEndFramework";

import { getFrontendFrameworksAction } from "../../actions/wizardContentActions/getFrontendFrameworks";
import { IOption } from "../../types/option";
import { ISelected } from "../../types/selected";
import {
  WIZARD_CONTENT_INTERNAL_NAMES,
  EXTENSION_MODULES,
  EXTENSION_COMMANDS
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

interface IDispatchProps {
  selectFrontendFramework: (framework: ISelected) => void;
  getFrontendFrameworks: (
    projectType: string,
    isPreview: boolean,
    serverPort: number
  ) => void;
}

interface ISelectFrontEndFrameworkProps {
  options: IOption[];
  selectedFrontendFramework: ISelected;
  vscode: IVSCodeObject;
  serverPort: number;
  isPreview: boolean;
  isRoutesVisited: IVisitedPages;
  selectedPages: ISelected[];
}

type Props = IDispatchProps & ISelectFrontEndFrameworkProps & InjectedIntlProps;

const messages = defineMessages({
  selectFrontendFramework: {
    id: "selectFrontendFramework.selectFrontendFramework",
    defaultMessage: "Select a front-end framework."
  }
});

class SelectFrontEndFramework extends React.Component<Props> {
  public componentDidMount() {
    const { getFrontendFrameworks, isPreview, serverPort } = this.props;
    if (getFrontendFrameworks) {
      getFrontendFrameworks(
        WIZARD_CONTENT_INTERNAL_NAMES.FULL_STACK_APP,
        isPreview,
        serverPort
      );
    }
  }

  public handleFrameworkChange(option: ISelected) {
    const {
      vscode,
      selectedFrontendFramework,
      selectFrontendFramework,
      selectedPages
    } = this.props;

    const { showPages } = this.props.isRoutesVisited;

    if (
      showPages &&
      selectedFrontendFramework.internalName &&
      selectedFrontendFramework.internalName !== option.internalName
    ) {
      vscode.postMessage({
        module: EXTENSION_MODULES.VSCODEUI,
        command: EXTENSION_COMMANDS.RESET_PAGES,
        track: false,
        text: "Sending framework change request...",
        payload: {
          internalName: option.internalName,
          pagesLength: selectedPages.length
        }
      });
    } else {
      selectFrontendFramework(option);
    }
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
  const { frontendOptions, previewStatus, serverPort } = state.wizardContent;
  const { frontendFramework } = state.selection;
  const { pages } = state.selection;

  return {
    isPreview: previewStatus,
    isRoutesVisited: getIsVisitedRoutesSelector(state),
    options: frontendOptions,
    serverPort,
    selectedFrontendFramework: frontendFramework,
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
  getFrontendFrameworks: (
    projectType: string,
    isPreview: boolean,
    serverPort: number
  ) => {
    dispatch(getFrontendFrameworksAction(projectType, isPreview, serverPort));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(injectIntl(SelectFrontEndFramework));
