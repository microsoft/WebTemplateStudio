import * as React from "react";
import { withRouter, RouteComponentProps, Link } from "react-router-dom";
import { connect } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import classnames from "classnames";
import { InjectedIntlProps, injectIntl, FormattedMessage } from "react-intl";
import styles from "./styles.module.css";

import {
  KEY_EVENTS,
  ROUTES
} from "../../utils/constants";

import { setDetailPageAction } from "../../actions/wizardInfoActions/setDetailsPage";
import { IOption } from "../../types/option";
import { azureMessages } from "../../mockData/azureServiceOptions";
import { AppState } from "../../reducers";
import AzureSubscriptions from "./AzureSubscriptions";
import AzureStudent from "./AzureStudent";
import Title from "../../components/Title";
import RootAction from "../../actions/ActionType";
import keyUpHandler from "../../utils/keyUpHandler";
import AzureLoginModal from "./AzureLoginModal";
import { azureLogout } from "../../utils/extensionService/extensionService";
import { startLogOutAzure } from "../../actions/azureActions/logOutAzure";

interface IDispatchProps {
  setDetailPage: (detailPageInfo: IOption) => any;
  startLogOutToAzure: () => any;
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
  signOutClick = () => {
    azureLogout(this.props.vscode).then((event)=>{
      const message = event.data;
      if (message.payload.success) {
        this.props.startLogOutToAzure();
      }
    });
  };
  signOutkeyDownHandler = (event: React.KeyboardEvent) => {
    if (event.key === KEY_EVENTS.ENTER || event.key === KEY_EVENTS.SPACE) {
      this.signOutClick();
    }
  };

  public render() {
    const { isLoggedIn, intl, email } = this.props;

    return (
      <div className={styles.centerViewAzure}>
        <AzureLoginModal/>
        <Link
          tabIndex={0}
          to={ROUTES.REVIEW_AND_GENERATE}
          className={styles.optionalFlag}
          onKeyUp={keyUpHandler}
        >
          {azureMessages.azureSkipButton.defaultMessage}
        </Link>
        <div
          className={classnames(styles.container, {
            [styles.signedIn]: isLoggedIn
          })}
        >
          <div className={styles.logInInfoBar}>
            <Title>{intl.formatMessage(azureMessages.azureLoginTitle)}</Title>
            {isLoggedIn && (
              <div className={styles.azureProfile}>
                <div className={styles.profileName}>{email}</div>
                <div
                  role="button"
                  tabIndex={0}
                  className={classnames(styles.button, styles.signOutButton)}
                  onClick={this.signOutClick}
                  onKeyDown={this.signOutkeyDownHandler}
                >
                  <FormattedMessage
                    id="header.signOut"
                    defaultMessage="Sign out"
                  />
                </div>
              </div>
            )}
          </div>
          {!isLoggedIn && <AzureStudent />}
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
  dispatch: ThunkDispatch<AppState, void, RootAction>
): IDispatchProps => ({
  setDetailPage: (detailPageInfo: IOption) => {
    const isIntlFormatted = true;
    dispatch(setDetailPageAction(detailPageInfo, isIntlFormatted));
  },
  startLogOutToAzure: () => {
    dispatch(startLogOutAzure());
  },
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(injectIntl(AzureLogin))
);
