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
}

type Props = IDispatchProps & ISelectBackendProps;

class SelectBackEndFramework extends React.Component<Props> {
  public render() {
    return (
      <div>
        <SelectOption
          selectCard={this.props.selectBackendFramework}
          multiSelect={false}
          title="Select a back-end framework for your project."
          options={this.props.options}
        />
      </div>
    );
  }
}

const mapStateToProps = (state: any): ISelectBackendProps => {
  const { backendOptions } = state.wizardContent;
  return {
    options: backendOptions,
  }
}

const mapDispatchToProps = (dispatch: any): IDispatchProps => ({
  selectBackendFramework: (backendFramework: string) => { dispatch(selectBackendFrameworkAction(backendFramework))},
})

export default connect(mapStateToProps, mapDispatchToProps)(SelectBackEndFramework);
