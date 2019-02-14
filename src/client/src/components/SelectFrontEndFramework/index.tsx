import * as React from "react";
import { connect } from "react-redux";

import SelectOption from "../SelectOption";

import { selectFrontendFramework as selectFrontendAction } from "../../actions/selectFrontEndFramework";
import options from "./optionsData";

interface IDispatchProps {
  selectFrontendFramework: (framework: string) => void;
}

class SelectFrontEndFramework extends React.Component<IDispatchProps> {
  public render() {
    return (
      <div>
        <SelectOption
          selectCard={this.props.selectFrontendFramework}
          multiSelect={false}
          title="Select a front-end framework for your project."
          options={options}
        />
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch: any): IDispatchProps => ({
  selectFrontendFramework: (framework: string) => { dispatch(selectFrontendAction(framework)) }
});

export default connect(null, mapDispatchToProps)(SelectFrontEndFramework);
