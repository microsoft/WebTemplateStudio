import * as React from "react";
import { connect } from "react-redux";

import { getProjectTypesAction } from "../../actions/getProjectTypes";
import { IOption } from "../../types/option";
import SelectOption from "../SelectOption";

import { selectWebAppAction } from "../../actions/selectWebApp";
import { ISelected } from "../../types/selected";

interface IDispatchProps {
  selectWebApp: (selectedApp: ISelected) => void;
  getProjectTypes: () => any;
}

interface IStoreProps {
  selectedWebApp: ISelected;
  type: IOption[];
}

type Props = IDispatchProps & IStoreProps;

class SelectWebApp extends React.Component<Props> {
  public componentDidMount() {
    if (this.props.getProjectTypes !== undefined) {
      this.props.getProjectTypes();
    }
  }

  public convertSelectionToIndexNumber(framework: ISelected): number[] {
    for (let i = 0; i < this.props.type.length; i++) {
      if (this.props.type[i].internalName === framework.internalName) {
        return [i];
      }
    }
    return [0];
  }

  public render() {
    return (
      <div>
        {this.props.type.length > 0 && (
          <SelectOption
            selectCard={this.props.selectWebApp}
            multiSelect={false}
            title="What type of web application are you building?"
            options={this.props.type}
            selectedCardIndices={this.convertSelectionToIndexNumber(
              this.props.selectedWebApp
            )}
          />
        )}
      </div>
    );
  }
}

const mapStateToProps = (state: any): IStoreProps => {
  const { appType } = state.selection;
  return {
    selectedWebApp: appType,
    type: state.wizardContent.projectTypes
  };
};

const mapDispatchToProps = (dispatch: any): IDispatchProps => ({
  selectWebApp: (selectedApp: ISelected) => {
    dispatch(selectWebAppAction(selectedApp));
  },
  getProjectTypes: () => {
    dispatch(getProjectTypesAction());
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SelectWebApp);
