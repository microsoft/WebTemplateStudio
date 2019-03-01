import * as React from "react";
import { connect } from "react-redux";

import SelectOption from "../../components/SelectOption";

import { getBackendFrameworksAction } from "../../actions/getBackendFrameworks";
import { selectBackendFrameworkAction } from "../../actions/selectBackEndFramework";
import { IOption } from "../../types/option";
import { ISelected } from "../../types/selected";

interface IDispatchProps {
  selectBackendFramework: (backendFramework: ISelected) => void;
  getBackendFrameworks: (projectType: string) => void;
}

interface ISelectBackendProps {
  options: IOption[];
  selectedBackend: string;
}

type Props = IDispatchProps & ISelectBackendProps;

class SelectBackEndFramework extends React.Component<Props> {
  public componentDidMount() {
    // TODO: use store to get project type next time.
    if (this.props.getBackendFrameworks !== undefined) {
      this.props.getBackendFrameworks("FullStackWebApp");
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
    return (
      <div>
        {this.props.options.length > 0 && (
          <SelectOption
            selectCard={this.props.selectBackendFramework}
            multiSelect={false}
            title="Select a back-end framework for your project."
            options={this.props.options}
            selectedCards={this.convertSelectionToIndexNumber(
              this.props.selectedBackend
            )}
          />
        )}
      </div>
    );
  }
}

const mapStateToProps = (state: any): ISelectBackendProps => {
  const { backendOptions } = state.wizardContent;
  const { backendFramework } = state.selection;

  return {
    options: backendOptions,
    selectedBackend: backendFramework
  };
};

const mapDispatchToProps = (dispatch: any): IDispatchProps => ({
  selectBackendFramework: (backendFramework: ISelected) => {
    dispatch(selectBackendFrameworkAction(backendFramework));
  },
  getBackendFrameworks: (projectType: string) => {
    dispatch(getBackendFrameworksAction(projectType));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SelectBackEndFramework);
