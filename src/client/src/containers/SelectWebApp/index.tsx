import * as React from "react";
import { connect } from "react-redux";

import { getProjectTypesAction } from "../../actions/wizardContentActions/getProjectTypes";
import { IOption } from "../../types/option";
import SelectOption from "../SelectOption";

import { selectWebAppAction } from "../../actions/wizardSelectionActions/selectWebApp";
import { ISelected } from "../../types/selected";

import { defineMessages, InjectedIntl, injectIntl } from "react-intl";
import { AppState } from "../../reducers";
import { ThunkDispatch } from "redux-thunk";
import RootAction from "../../actions/ActionType";

interface IDispatchProps {
  selectWebApp: (selectedApp: ISelected) => void;
  getProjectTypes: (serverPort: number) => any;
}

interface IStoreProps {
  selectedWebApp: ISelected;
  type: IOption[];
  serverPort: number;
}

interface IIntlProps {
  intl: InjectedIntl;
}

type Props = IDispatchProps & IStoreProps & IIntlProps;

const messages = defineMessages({
  webAppTitleQuestion: {
    id: "selectPages.webAppTitleQuestion",
    defaultMessage: "Select a project type."
  }
});

class SelectWebApp extends React.Component<Props> {
  public componentDidMount() {
    const { getProjectTypes, serverPort } = this.props;
    if (getProjectTypes) {
      getProjectTypes(serverPort);
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
            title={this.props.intl.formatMessage(messages.webAppTitleQuestion)}
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

const mapStateToProps = (state: AppState): IStoreProps => {
  const { serverPort } = state.wizardContent;
  const { appType } = state.selection;
  return {
    selectedWebApp: appType,
    type: state.wizardContent.projectTypes,
    serverPort
  };
};

const mapDispatchToProps = (
  dispatch: ThunkDispatch<AppState, void, RootAction>
): IDispatchProps => ({
  selectWebApp: (selectedApp: ISelected) => {
    dispatch(selectWebAppAction(selectedApp));
  },
  getProjectTypes: (serverPort: number) => {
    dispatch(getProjectTypesAction(serverPort));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(injectIntl(SelectWebApp));
