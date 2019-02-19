import * as React from "react";
import { connect } from "react-redux";

import SelectOption from "../SelectOption";

import { getFrontendFrameworksAction } from "../../actions/getFrontendFrameworks";
import { selectFrontendFramework as selectFrontendAction } from "../../actions/selectFrontEndFramework";

import { IOption } from "../../types/option";

interface IDispatchProps {
  selectFrontendFramework: (framework: string) => void;
  getFrontendFrameworks: () => void;
}

interface IDispatchState {
  options: IOption[];
}

interface ISelectFrontEndFrameworkProps {
  options: IOption[];
}

type Props = IDispatchProps & ISelectFrontEndFrameworkProps;

class SelectFrontEndFramework extends React.Component<Props> {
  public render() {
    return (
      <div>
        <SelectOption
          selectCard={this.props.selectFrontendFramework}
          multiSelect={false}
          title="Select a front-end framework for your project."
          options={this.props.options}
        />
      </div>
    );
  }
}

const mapStateToProps = (state: any): IDispatchState => {
  const { frontendOptions } = state.wizardContent;
  return {
    options: frontendOptions,
  }
}

const mapDispatchToProps = (dispatch: any): IDispatchProps => ({
  selectFrontendFramework: (framework: string) => { dispatch(selectFrontendAction(framework)) },
  getFrontendFrameworks: () => { dispatch(getFrontendFrameworksAction()) }
});

export default connect(mapStateToProps, mapDispatchToProps)(SelectFrontEndFramework);
