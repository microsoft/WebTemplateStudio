import * as React from "react";
import { connect } from "react-redux";

import SelectOption from "../SelectOption";

import { selectPagesAction } from "../../actions/selectPages";

import { IOption } from "../../types/option";
import { ISelected } from "../../types/selected";

interface IDispatchProps {
  selectPages: (pages: ISelected[]) => void;
}

interface ISelectPagesProps {
  options: IOption[];
}

type Props = IDispatchProps & ISelectPagesProps;

class SelectPages extends React.Component<Props> {
  public render() {
    return (
      <div>
        <SelectOption
          selectOptions={this.props.selectPages}
          multiSelect={true}
          title="What pages do you need for your application?"
          options={this.props.options}
        />
      </div>
    );
  }
}

const mapStateToProps = (state: any): ISelectPagesProps => {
  const { pageOptions } = state.wizardContent;
  return {
    options: pageOptions
  };
};

const mapDispatchToProps = (dispatch: any): IDispatchProps => ({
  selectPages: (pages: ISelected[]) => {
    dispatch(selectPagesAction(pages));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SelectPages);
