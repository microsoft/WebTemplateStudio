import * as React from "react";
import { connect } from "react-redux";

import SelectOption from "../../components/SelectOption";

import { selectFrontendFramework as selectFrontendAction } from "../../actions/selectFrontEndFramework";

import { getFrontendFrameworksAction } from "../../actions/getFrontendFrameworks";
import { IOption } from "../../types/option";
import { ISelected } from "../../types/selected";

interface IDispatchProps {
  selectFrontendFramework: (framework: ISelected) => void;
  getFrontendFrameworks: (projectType: string) => void;
}

interface ISelectFrontEndFrameworkProps {
  options: IOption[];
  selectedFramework: string;
}

type Props = IDispatchProps & ISelectFrontEndFrameworkProps;

class SelectFrontEndFramework extends React.Component<Props> {
  public componentDidMount() {
    // TODO: use store to get project type next time.
    if (this.props.getFrontendFrameworks !== undefined) {
      this.props.getFrontendFrameworks("FullStackWebApp");
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
            selectCard={this.props.selectFrontendFramework}
            multiSelect={false}
            title="Select a front-end framework for your project."
            options={this.props.options}
            selectedCards={this.convertSelectionToIndexNumber(
              this.props.selectedFramework
            )}
          />
        )}
      </div>
    );
  }
}

const mapStateToProps = (state: any): ISelectFrontEndFrameworkProps => {
  const { frontendOptions } = state.wizardContent;
  const { frontendFramework } = state.selection;
  return {
    options: frontendOptions,
    selectedFramework: frontendFramework
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
)(SelectFrontEndFramework);
