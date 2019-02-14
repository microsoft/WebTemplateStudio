import * as React from "react";
import { connect } from "react-redux";

import SelectOption from "../SelectOption";

import { selectBackendFrameworkAction } from "../../actions/selectBackEndFramework";

import options from "./optionsData";

interface IDispatchProps {
  selectBackendFramework: (backendFramework: string) => void
}

class SelectBackEndFramework extends React.Component<IDispatchProps> {
  public render() {
    return (
      <div>
        <SelectOption
          selectCard={this.props.selectBackendFramework}
          multiSelect={false}
          title="Select a back-end framework for your project."
          options={options}
        />
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch: any): IDispatchProps => ({
  selectBackendFramework: (backendFramework: string) => { dispatch(selectBackendFrameworkAction(backendFramework))},
})

export default connect(null, mapDispatchToProps)(SelectBackEndFramework);
