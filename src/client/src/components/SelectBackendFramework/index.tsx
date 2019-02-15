import * as React from "react";
import { connect } from "react-redux";

import SelectOption from "../SelectOption";

import { selectBackendFrameworkAction } from "../../actions/selectBackEndFramework";
;
import { IOption } from "../../types/option";

interface IDispatchProps {
  selectBackendFramework: (backendFramework: string) => void
}

interface ISelectBackendProps {
  options: IOption[];
  selectedBackend: string;
}

type Props = IDispatchProps & ISelectBackendProps;

class SelectBackEndFramework extends React.Component<Props> {
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
          selectCard={this.props.selectBackendFramework}
          multiSelect={false}
          title="Select a back-end framework for your project."
          options={this.props.options}
          selectedCards={this.convertSelectionToIndexNumber(this.props.selectedBackend)}
        />
      </div>
    );
  }
}

const mapStateToProps = (state: any): ISelectBackendProps => {
  const { backendOptions } = state.wizardContent;
  const { backendFramework } = state.selection;
  return {
    options: backendOptions,
    selectedBackend: backendFramework,
  }
}

const mapDispatchToProps = (dispatch: any): IDispatchProps => ({
  selectBackendFramework: (backendFramework: string) => { dispatch(selectBackendFrameworkAction(backendFramework))},
})

export default connect(mapStateToProps, mapDispatchToProps)(SelectBackEndFramework);
