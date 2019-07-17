import * as React from "react";
import { connect } from "react-redux";

import SelectOption from "../SelectOption";

import { selectBackendFrameworkAction } from "../../actions/wizardSelectionActions/selectBackEndFramework";
import { IOption } from "../../types/option";
import { ISelected } from "../../types/selected";

import styles from "./styles.module.css";

import { injectIntl, defineMessages, InjectedIntlProps } from "react-intl";
import { AppState } from "../../reducers";
import { ThunkDispatch } from "redux-thunk";
import RootAction from "../../actions/ActionType";

interface IDispatchProps {
  selectBackendFramework: (backendFramework: ISelected) => void;
}

interface ISelectBackendProps {
  options: IOption[];
  selectedBackend: ISelected;
  isPreview: boolean;
}

type Props = IDispatchProps & ISelectBackendProps & InjectedIntlProps;

const messages = defineMessages({
  selectBackendFramework: {
    id: "selectBackendFramework.selectBackendFramework",
    defaultMessage: "Select a back-end framework"
  }
});

class SelectBackEndFramework extends React.Component<Props> {
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
            isFrameworkSelection={true}
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
  const { backendOptions, previewStatus } = state.wizardContent;
  const { backendFramework } = state.selection;

  return {
    isPreview: previewStatus,
    options: backendOptions,
    selectedBackend: backendFramework
  };
};

const mapDispatchToProps = (
  dispatch: ThunkDispatch<AppState, void, RootAction>
): IDispatchProps => ({
  selectBackendFramework: (backendFramework: ISelected) => {
    dispatch(selectBackendFrameworkAction(backendFramework));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(injectIntl(SelectBackEndFramework));
