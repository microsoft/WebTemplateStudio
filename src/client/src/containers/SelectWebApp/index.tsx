import * as React from "react";
import { connect } from "react-redux";

import { getProjectTypesAction } from "../../actions/wizardContentActions/getProjectTypes";
import { IOption } from "../../types/option";
import SelectOption from "../SelectOption";

import { selectWebAppAction } from "../../actions/wizardSelectionActions/selectWebApp";
import { ISelected } from "../../types/selected";

import { defineMessages, InjectedIntl, injectIntl } from "react-intl";
import { IVSCodeObject } from "../../reducers/vscodeApiReducer";
import { getVSCodeApiSelector } from "../../selectors/vscodeApiSelector";
import { AppState } from "../../reducers";
import { ThunkDispatch } from "redux-thunk";
import RootAction from "../../actions/ActionType";

interface IDispatchProps {
  selectWebApp: (selectedApp: ISelected) => void;
}

interface IStoreProps {
  selectedWebApp: ISelected;
  type: IOption[];
  vscode: IVSCodeObject;
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
    const { selectedWebApp, vscode } = this.props;
    // TODO: post message to extension side here
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
  const vscode = getVSCodeApiSelector(state);
  const { serverPort } = state.wizardContent;
  const { appType } = state.selection;
  return {
    selectedWebApp: appType,
    type: state.wizardContent.projectTypes,
    vscode: vscode
  };
};

const mapDispatchToProps = (
  dispatch: ThunkDispatch<AppState, void, RootAction>
): IDispatchProps => ({
  selectWebApp: (selectedApp: ISelected) => {
    dispatch(selectWebAppAction(selectedApp));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(injectIntl(SelectWebApp));
