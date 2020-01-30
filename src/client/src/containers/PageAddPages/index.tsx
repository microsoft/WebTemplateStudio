import * as React from "react";
import { connect } from "react-redux";

import SelectOption from "../SelectOption";

import {
  updatePageCountAction
} from "../../actions/wizardSelectionActions/selectPages";

import { IOption } from "../../types/option";
import { ISelected } from "../../types/selected";
import { IPageCount } from "../../reducers/wizardSelectionReducers/pageCountReducer";

import { InjectedIntl, injectIntl } from "react-intl";
import { AppState } from "../../reducers";
import { ThunkDispatch } from "redux-thunk";
import RootAction from "../../actions/ActionType";
import { IVSCodeObject } from "../../reducers/vscodeApiReducer";
import { getVSCodeApiSelector } from "../../selectors/vscodeApiSelector";
import {
  EXTENSION_MODULES,
  EXTENSION_COMMANDS,
  WIZARD_CONTENT_INTERNAL_NAMES
} from "../../utils/constants";
import messages from "./messages";
import PageCard from "./PageCard";
import styles from "./styles.module.css";

interface IDispatchProps {
  updatePageCount: (pageCount: IPageCount) => any;
}

interface ISelectPagesProps {
  vscode: IVSCodeObject;
  options: IOption[];
  selectedBackend: ISelected;
  selectedFrontend: ISelected;
}

interface IIntlProps {
  intl: InjectedIntl;
}

type Props = IDispatchProps & ISelectPagesProps & IIntlProps;

class PageAddPages extends React.Component<Props> {
  public componentDidMount() {
    const { selectedBackend, selectedFrontend, vscode } = this.props;

    vscode.postMessage({
      module: EXTENSION_MODULES.CORETS,
      command: EXTENSION_COMMANDS.GET_PAGES,
      payload: {
        projectType: WIZARD_CONTENT_INTERNAL_NAMES.FULL_STACK_APP,
        frontendFramework: selectedFrontend.internalName,
        backendFramework: selectedBackend.internalName
      }
    });
  }

  public componentDidUpdate(newProps: ISelectPagesProps) {
    if (newProps.options.length === 0) {
      const { selectedBackend, selectedFrontend, vscode } = this.props;
      vscode.postMessage({
        module: EXTENSION_MODULES.CORETS,
        command: EXTENSION_COMMANDS.GET_PAGES,
        payload: {
          projectType: WIZARD_CONTENT_INTERNAL_NAMES.FULL_STACK_APP,
          frontendFramework: selectedFrontend.internalName,
          backendFramework: selectedBackend.internalName
        }
      });
    }
  }

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
      intl,
      updatePageCount
    } = this.props;

    return (
      <div>
        <h1 className={styles.title}>Select a front-end framework</h1>
        <div className={styles.flexContainer}>
          {options.map((option)=>{
            return (<PageCard page={option}/>)
          })}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: AppState): ISelectPagesProps => {
  const vscode = getVSCodeApiSelector(state);
  const { pageOptions } = state.wizardContent;
  const { frontendFramework } = state.selection;
  const { backendFramework } = state.selection;

  return {
    vscode: vscode,
    options: pageOptions,
    selectedBackend: backendFramework,
    selectedFrontend: frontendFramework
  };
};

const mapDispatchToProps = (
  dispatch: ThunkDispatch<AppState, void, RootAction>
): IDispatchProps => ({
  updatePageCount: (pageCount: IPageCount) => {
    dispatch(updatePageCountAction(pageCount));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(injectIntl(PageAddPages));
