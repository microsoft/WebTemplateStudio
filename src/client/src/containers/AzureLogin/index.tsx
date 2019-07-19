import * as React from "react";
import { withRouter, RouteComponentProps, Link } from "react-router-dom";
import { connect } from "react-redux";
import classnames from "classnames";

import LoginCard from "../../components/LoginCard";
import Title from "../../components/Title";

import azure from "../../assets/azure.svg";
import styles from "./styles.module.css";

import AzureSubscriptions from "../AzureSubscriptions";
import {
  EXTENSION_COMMANDS,
  EXTENSION_MODULES,
  KEY_EVENTS,
  ROUTES
} from "../../utils/constants";
import { InjectedIntlProps, injectIntl, FormattedMessage } from "react-intl";
import { setDetailPageAction } from "../../actions/wizardInfoActions/setDetailsPage";
import { IOption } from "../../types/option";
import { azureMessages } from "../../mockData/azureServiceOptions";

import { microsoftAzureDetails } from "../../mockData/azureServiceOptions";
import { withLocalPath } from "../../utils/getSvgUrl";
import { AppState } from "../../reducers";
import { Dispatch } from "redux";
import RootAction from "../../actions/ActionType";
import keyUpHandler from "../../utils/keyUpHandler";

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
      <div className={styles.centerViewAzure}>
        {!isLoggedIn && (
          <Link
            tabIndex={0}
            to={ROUTES.REVIEW_AND_GENERATE}
            className={styles.optionalFlag}
            onKeyUp={keyUpHandler}
          >
            {azureMessages.azureSkipButton.defaultMessage}
          </Link>
        )}
        <div
          className={classnames(styles.container, {
            [styles.signedIn]: isLoggedIn
          })}
        >
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
                <FormattedMessage
                  id="header.signOut"
                  defaultMessage="Sign out"
                />
              </div>
            </div>
          )}
          <Title>{intl.formatMessage(azureMessages.azureLoginTitle)}</Title>
          <div className={styles.loginCard}>
            {!isLoggedIn && (
              <LoginCard
                svgUrl={withLocalPath(azure)}
                handleClick={() => {
                  this.handleClick();
                }}
                cardTitle={intl.formatMessage(azureMessages.azureTitle)}
                cardBody={intl.formatMessage(azureMessages.azureCardBody)}
                handleDetailsClick={setDetailPage}
                option={microsoftAzureDetails}
              />
            )}
          </div>
          <AzureSubscriptions />
        </div>
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
