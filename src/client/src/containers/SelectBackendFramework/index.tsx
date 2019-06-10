import * as React from "react";
import { connect } from "react-redux";

import SelectOption from "../SelectOption";

import { getBackendFrameworksAction } from "../../actions/wizardContentActions/getBackendFrameworks";
import { selectBackendFrameworkAction } from "../../actions/wizardSelectionActions/selectBackEndFramework";
import { IOption } from "../../types/option";
import { ISelected } from "../../types/selected";

import { WIZARD_CONTENT_INTERNAL_NAMES } from "../../utils/constants";

import styles from "./styles.module.css";

import { injectIntl, defineMessages, InjectedIntlProps } from "react-intl";
import { AppState } from "../../reducers";
import { ThunkDispatch } from "redux-thunk";
import RootAction from "../../actions/ActionType";

interface IDispatchProps {
  selectBackendFramework: (backendFramework: ISelected) => void;
  getBackendFrameworks: (
    projectType: string,
    isPreview: boolean,
    serverPort: number
  ) => void;
}

interface ISelectBackendProps {
  options: IOption[];
  selectedBackend: ISelected;
  serverPort: number;
  isPreview: boolean;
}

type Props = IDispatchProps & ISelectBackendProps & InjectedIntlProps;

const messages = defineMessages({
  selectBackendFramework: {
    id: "selectBackendFramework.selectBackendFramework",
    defaultMessage: "Select a back-end framework."
  }
});

class SelectBackEndFramework extends React.Component<Props> {
  public componentDidMount() {
    const { getBackendFrameworks, isPreview, serverPort } = this.props;
    if (getBackendFrameworks !== undefined) {
      getBackendFrameworks(
        WIZARD_CONTENT_INTERNAL_NAMES.FULL_STACK_APP,
        isPreview,
        serverPort
      );
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
    const {
      options,
      selectedBackend,
      selectBackendFramework,
      intl
    } = this.props;
    return (
      <div className={styles.container}>
        {options.length > 0 && (
          <SelectOption
            selectCard={selectBackendFramework}
            multiSelect={false}
            title={intl.formatMessage(messages.selectBackendFramework)}
            options={options}
            selectedCardIndices={this.convertSelectionToIndexNumber(
              selectedBackend
            )}
          />
        )}
      </div>
    );
  }
}

const mapStateToProps = (state: AppState): ISelectBackendProps => {
  const { backendOptions, previewStatus, serverPort } = state.wizardContent;
  const { backendFramework } = state.selection;

  return {
    isPreview: previewStatus,
    options: backendOptions,
    selectedBackend: backendFramework,
    serverPort
  };
};

const mapDispatchToProps = (
  dispatch: ThunkDispatch<AppState, void, RootAction>
): IDispatchProps => ({
  selectBackendFramework: (backendFramework: ISelected) => {
    dispatch(selectBackendFrameworkAction(backendFramework));
  },
  getBackendFrameworks: (
    projectType: string,
    isPreview: boolean,
    serverPort: number
  ) => {
    dispatch(getBackendFrameworksAction(projectType, isPreview, serverPort));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(injectIntl(SelectBackEndFramework));
