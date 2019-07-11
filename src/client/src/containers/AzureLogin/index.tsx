import * as React from "react";
import { withRouter, RouteComponentProps } from "react-router-dom";
import { connect } from "react-redux";

import LoginCard from "../../components/LoginCard";
import Title from "../../components/Title";

import azure from "../../assets/azure.svg";
import styles from "./styles.module.css";

import AzureSubscriptions from "../AzureSubscriptions";
import {
  EXTENSION_COMMANDS,
  EXTENSION_MODULES,
  KEY_EVENTS
} from "../../utils/constants";
import { InjectedIntlProps, injectIntl, FormattedMessage } from "react-intl";
import { setDetailPageAction } from "../../actions/wizardInfoActions/setDetailsPage";
import { IOption } from "../../types/option";
import { messages } from "../../mockData/azureServiceOptions";

import { microsoftAzureDetails } from "../../mockData/azureServiceOptions";
import { withLocalPath } from "../../utils/getSvgUrl";
import { AppState } from "../../reducers";
import { Dispatch } from "redux";
import RootAction from "../../actions/ActionType";

interface IDispatchProps {
  setDetailPage: (detailPageInfo: IOption) => any;
}

interface IAzureLoginProps {
  isLoggedIn: boolean;
  vscode: any;
  email: string;
}

type Props = IDispatchProps &
  IAzureLoginProps &
  InjectedIntlProps &
  RouteComponentProps;

class AzureLogin extends React.Component<Props> {
  handleClick = () => {
    // initiates a login command to VSCode ReactPanel class

    this.props.vscode.postMessage({
      module: EXTENSION_MODULES.AZURE,
      command: EXTENSION_COMMANDS.AZURE_LOGIN,
      track: true
    });
  };
  signOutClick = () => {
    this.props.vscode.postMessage({
      module: EXTENSION_MODULES.AZURE,
      command: EXTENSION_COMMANDS.AZURE_LOGOUT,
      track: true
    });
  };
  keyDownClick = (event: React.KeyboardEvent) => {
    if (event.key === KEY_EVENTS.ENTER || event.key === KEY_EVENTS.SPACE) {
      this.signOutClick();
    }
  };
  public render() {
    const { isLoggedIn, intl, setDetailPage, email } = this.props;

    return (
      <div className={styles.container}>
        <Title>{intl.formatMessage(messages.azureLoginTitle)}</Title>
        {isLoggedIn && (
          <div className={styles.azureProfile}>
            <div className={styles.profileName}>{email}</div>
            <div
              role="button"
              className={styles.button}
              tabIndex={0}
              onClick={this.signOutClick.bind(this)}
              onKeyDown={this.keyDownClick.bind(this)}
            >
              <FormattedMessage id="header.signOut" defaultMessage="Sign out" />
            </div>
          </div>
        )}
        <div className={styles.loginCard}>
          {!isLoggedIn && (
            <LoginCard
              svgUrl={withLocalPath(azure)}
              handleClick={() => {
                this.handleClick();
              }}
              cardTitle={intl.formatMessage(messages.azureTitle)}
              cardBody={intl.formatMessage(messages.azureCardBody)}
              handleDetailsClick={setDetailPage}
              option={microsoftAzureDetails}
            />
          )}
        </div>
        <AzureSubscriptions />
      </div>
    );
  }
}

const mapStateToProps = (state: AppState): IAzureLoginProps => {
  const { isLoggedIn } = state.azureProfileData;
  const { vscodeObject } = state.vscode;
  const { email } = state.azureProfileData.profileData;
  return {
    isLoggedIn,
    vscode: vscodeObject,
    email
  };
};

const mapDispatchToProps = (
  dispatch: Dispatch<RootAction>
): IDispatchProps => ({
  setDetailPage: (detailPageInfo: IOption) => {
    const isIntlFormatted = true;
    dispatch(setDetailPageAction(detailPageInfo, isIntlFormatted));
  }
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(injectIntl(AzureLogin))
);
