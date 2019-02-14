import * as React from "react";
import { connect } from "react-redux";

import SelectOption from "../SelectOption";

import { selectPagesAction } from "../../actions/selectPages";

import options from "./optionsData";

interface IDispatchProps {
  selectPages: (pages: string[]) => void;
}

class SelectPages extends React.Component<IDispatchProps> {
  public render() {
    return (
      <div>
        <SelectOption
          selectOptions={this.props.selectPages}
          multiSelect={true}
          title="What pages do you need for your application?"
          options={options}
        />
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch: any): IDispatchProps => ({
  selectPages: (pages: string[]) => { dispatch(selectPagesAction(pages)) },
});

export default connect(null, mapDispatchToProps)(SelectPages);
