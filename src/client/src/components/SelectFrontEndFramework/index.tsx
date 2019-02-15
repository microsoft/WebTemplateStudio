import * as React from "react";
import { connect } from "react-redux";

import SelectBackendFramework from "../SelectBackendFramework";

import SelectOption from "../SelectOption";

import { getFrontendFrameworksAction } from "../../actions/getFrontendFrameworks";
import { selectFrontendFramework as selectFrontendAction } from "../../actions/selectFrontEndFramework";

import { IOption } from "../../types/option";

interface IDispatchProps {
  selectFrontendFramework: (framework: string) => void;
  getFrontendFrameworks: () => void;
}

interface ISelectFrontEndFrameworkProps {
  options: IOption[];
  selectedFramework: string;
}

type Props = IDispatchProps & ISelectFrontEndFrameworkProps;

class SelectFrontEndFramework extends React.Component<Props> {
  /**
   * Finds the index of the framework currently selected in the wizard
   * 
   * @param framework 
   */
  public convertSelectionToIndexNumber(framework: string): number[] {
    for (let i = 0; i < this.props.options.length; i++) {
      if (this.props.options[i].title === framework) {
        return [i];
      }
    }
    return [0];
  }
  public render() {
    return (
      <div>
        <SelectOption
          selectCard={this.props.selectFrontendFramework}
          multiSelect={false}
          title="Select a front-end framework for your project."
          options={this.props.options}
          selectedCards={this.convertSelectionToIndexNumber(this.props.selectedFramework)}
        />
        <SelectBackendFramework />
      </div>
    );
  }
}

const mapStateToProps = (state: any): ISelectFrontEndFrameworkProps => {
  const { frontendOptions } = state.wizardContent;
  const { frontendFramework} = state.selection;
  return {
    options: frontendOptions,
    selectedFramework: frontendFramework,
  }
}

const mapDispatchToProps = (dispatch: any): IDispatchProps => ({
  selectFrontendFramework: (framework: string) => { dispatch(selectFrontendAction(framework)) },
  getFrontendFrameworks: () => { dispatch(getFrontendFrameworksAction()) }
});

export default connect(mapStateToProps, mapDispatchToProps)(SelectFrontEndFramework);
