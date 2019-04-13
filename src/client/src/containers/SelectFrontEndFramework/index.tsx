import * as React from "react";
import { connect } from "react-redux";

import SelectOption from "../SelectOption";

import { selectFrontendFramework as selectFrontendAction } from "../../actions/wizardSelectionActions/selectFrontEndFramework";

import { getFrontendFrameworksAction } from "../../actions/wizardContentActions/getFrontendFrameworks";
import { IOption } from "../../types/option";
import { ISelected } from "../../types/selected";
import { WIZARD_CONTENT_INTERNAL_NAMES } from "../../utils/constants";

import { defineMessages, injectIntl, InjectedIntlProps } from "react-intl";
import { AppState } from "../../reducers";

interface IDispatchProps {
  selectFrontendFramework: (framework: ISelected) => void;
  getFrontendFrameworks: (projectType: string) => void;
}

interface ISelectFrontEndFrameworkProps {
  options: IOption[];
  selectedFrontendFramework: ISelected;
}

type Props = IDispatchProps & ISelectFrontEndFrameworkProps & InjectedIntlProps;

const messages = defineMessages({
  selectFrontendFramework: {
    id: "selectFrontendFramework.selectFrontendFramework",
    defaultMessage: "3. Select a front-end framework."
  }
});

class SelectFrontEndFramework extends React.Component<Props> {
  public componentDidMount() {
    if (this.props.getFrontendFrameworks) {
      this.props.getFrontendFrameworks(
        WIZARD_CONTENT_INTERNAL_NAMES.FULL_STACK_APP
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
      selectedFrontendFramework,
      selectFrontendFramework,
      intl
    } = this.props;
    return (
      <div>
        {this.props.options.length > 0 && (
          <SelectOption
            selectCard={selectFrontendFramework}
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
  const { frontendOptions } = state.wizardContent;
  const { frontendFramework } = state.selection;
  return {
    options: frontendOptions,
    selectedFrontendFramework: frontendFramework
  };
};

const mapDispatchToProps = (dispatch: any): IDispatchProps => ({
  selectFrontendFramework: (framework: ISelected) => {
    dispatch(selectFrontendAction(framework));
  },
  getFrontendFrameworks: (projectType: string) => {
    dispatch(getFrontendFrameworksAction(projectType));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(injectIntl(SelectFrontEndFramework));
