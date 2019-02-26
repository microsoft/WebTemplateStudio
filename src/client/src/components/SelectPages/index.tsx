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
  selectedPages: ISelected[];
}

type Props = IDispatchProps & ISelectPagesProps;

class SelectPages extends React.Component<Props> {
  /**
   * Maps the selected page of the user and saves its state
   * so it can show up as a selected card
   */
  public convertSelectedPagesToIndices = (pages: ISelected[]): number[] => {
    const selectedPageIndices = [];
    for (let i = 0; i < pages.length; i++) {
      for (let j = 0; j < this.props.options.length; j++) {
        if (pages[i].internalName === this.props.options[j].internalName) {
          selectedPageIndices.push(j);
        }
      }
    }
    return selectedPageIndices;
  };
  public render() {
    return (
      <div>
        <SelectOption
          selectOptions={this.props.selectPages}
          multiSelect={true}
          selectedCards={this.convertSelectedPagesToIndices(
            this.props.selectedPages
          )}
          title="What pages do you need for your application?"
          options={this.props.options}
        />
      </div>
    );
  }
}

const mapStateToProps = (state: any): ISelectPagesProps => {
  const { pageOptions } = state.wizardContent;
  const { pages } = state.selection;
  return {
    options: pageOptions,
    selectedPages: pages
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
