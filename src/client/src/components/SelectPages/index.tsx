import * as React from "react";
import { connect } from "react-redux";

import SelectOption from "../SelectOption";

import { selectPagesAction } from "../../actions/selectPages";

import { IOption } from "../../types/option";
import { ISelected } from "../../types/selected";
import { getPagesOptionsAction } from "../../actions/getPagesOptions";

interface IDispatchProps {
  selectPages: (pages: ISelected[]) => void;
  getPages: (
    projectType: string,
    frontendFramework: string,
    backendFramework: string
  ) => void;
}

interface ISelectPagesProps {
  options: IOption[];
  selectedBackend: ISelected;
  selectedFrontend: ISelected;
  selectedPages: ISelected[];
  selectedProjectType: ISelected;
}

type Props = IDispatchProps & ISelectPagesProps;

class SelectPages extends React.Component<Props> {
  public componentDidMount() {
    const {
      getPages,
      selectedBackend,
      selectedFrontend,
      selectedProjectType
    } = this.props;

    if (getPages !== undefined) {
      getPages(
        selectedProjectType.internalName,
        selectedFrontend.internalName,
        selectedBackend.internalName
      );
    }
  }
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
    const { options, selectPages, selectedPages } = this.props;
    return (
      <div>
        {options.length > 0 && (
          <SelectOption
            selectOptions={selectPages}
            multiSelect={true}
            selectedCards={this.convertSelectedPagesToIndices(selectedPages)}
            title="What pages do you need for your application?"
            options={options}
          />
        )}
      </div>
    );
  }
}

const mapStateToProps = (state: any): ISelectPagesProps => {
  const { pageOptions } = state.wizardContent;
  const { pages } = state.selection;
  const { appType } = state.selection;
  const { frontendFramework } = state.selection;
  const { backendFramework } = state.selection;

  return {
    options: pageOptions,
    selectedBackend: backendFramework,
    selectedFrontend: frontendFramework,
    selectedPages: pages,
    selectedProjectType: appType
  };
};

const mapDispatchToProps = (dispatch: any): IDispatchProps => ({
  getPages: (
    projectType: string,
    frontendFramework: string,
    backendFramework: string
  ) => {
    dispatch(
      getPagesOptionsAction(projectType, frontendFramework, backendFramework)
    );
  },
  selectPages: (pages: ISelected[]) => {
    dispatch(selectPagesAction(pages));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SelectPages);
