import * as React from "react";
import { connect } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import classnames from "classnames";
import { InjectedIntlProps, injectIntl, FormattedMessage } from "react-intl";
import styles from "./styles.module.css";

import {
  KEY_EVENTS,
  ROUTES
} from "../../utils/constants";

import { IOption } from "../../types/option";
import { azureMessages } from "../../mockData/azureServiceOptions";
import { AppState } from "../../store/combineReducers";
import AzureSubscriptions from "./AzureSubscriptions";
import AzureStudent from "./AzureStudent";
import Title from "../../components/Title";
import RootAction from "../../store/ActionType";
import keyUpHandler from "../../utils/keyUpHandler";
import AzureLoginModal from "./AzureLoginModal";
import { azureLogout } from "../../utils/extensionService/extensionService";
import { startLogOutAzureAction } from "../../store/azureProfileData/login/action";
import { IVSCodeObject } from "../../types/vscode";
import { AppContext } from "../../AppContext";
import { setPageWizardPageAction, setDetailPageAction } from "../../store/config/pages/action";

interface IDispatchProps {
  setDetailPage: (detailPageInfo: IOption) => any;
  startLogOutToAzure: () => any;
}

interface IAzureLoginProps {
  isLoggedIn: boolean;
  email: string;
}

type Props = IDispatchProps &
  IAzureLoginProps &
  InjectedIntlProps;

const AzureLogin = (props: Props)=> {
  const {
    startLogOutToAzure,
    isLoggedIn, intl, email
  } = props;
  const vscode: IVSCodeObject = React.useContext(AppContext).vscode;

  const signOutClick = () => {
    azureLogout(vscode).then((event)=>{
      const message = event.data;
      if (message.payload.success) {
        startLogOutToAzure();
      }
    });
  };

  const signOutkeyDownHandler = (event: React.KeyboardEvent) => {
    if (event.key === KEY_EVENTS.ENTER || event.key === KEY_EVENTS.SPACE) {
      signOutClick();
    }
  };

  return (
      <div className={styles.centerViewAzure}>
        <AzureLoginModal/>
        <a
          tabIndex={0}
          className={styles.optionalFlag}
          onKeyUp={keyUpHandler}
        >
          {azureMessages.azureSkipButton.defaultMessage}
        </a>
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
                  onClick={signOutClick}
                  onKeyDown={signOutkeyDownHandler}
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

const mapStateToProps = (state: AppState): IAzureLoginProps => {
  const { isLoggedIn } = state.azureProfileData;
  const { email } = state.azureProfileData.profileData;
  return {
    isLoggedIn,
    email
  };
};

const mapDispatchToProps = (
  dispatch: ThunkDispatch<AppState, void, RootAction>
): IDispatchProps => ({
  setDetailPage: (detailPageInfo: IOption) => {
    const isIntlFormatted = true;
    dispatch(setPageWizardPageAction(ROUTES.PAGE_DETAILS));
    dispatch(setDetailPageAction(detailPageInfo, isIntlFormatted, ROUTES.AZURE_LOGIN));
  },
  startLogOutToAzure: () => {
    dispatch(startLogOutAzureAction());
  },
});

export default 
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(injectIntl(AzureLogin));
