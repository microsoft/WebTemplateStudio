import * as React from "react";
import { connect, useDispatch } from "react-redux";
import classnames from "classnames";
import { InjectedIntlProps, injectIntl, FormattedMessage } from "react-intl";
import styles from "./styles.module.css";

import {
  KEY_EVENTS
} from "../../utils/constants";

import { azureMessages } from "../../mockData/azureServiceOptions";
import { AppState } from "../../store/combineReducers";
import AzureSubscriptions from "./AzureSubscriptions";
import AzureStudent from "./AzureStudent";
import Title from "../../components/Title";
import keyUpHandler from "../../utils/keyUpHandler";
import AzureLoginModal from "./AzureLoginModal";
import { azureLogout } from "../../utils/extensionService/extensionService";
import { startLogOutAzureAction } from "../../store/azureProfileData/login/action";
import { AppContext } from "../../AppContext";

interface IAzureLoginProps {
  isLoggedIn: boolean;
  email: string;
}

type Props = IAzureLoginProps & InjectedIntlProps;

const AzureLogin = (props: Props)=> {
  const {
    isLoggedIn, intl, email
  } = props;
  const { vscode } = React.useContext(AppContext);
  const dispatch = useDispatch();

  const signOutClick = () => {
    azureLogout(vscode).then((event)=>{
      const message = event.data;
      if (message.payload.success) {
        dispatch(startLogOutAzureAction());
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
  const { email } = state.config.azureProfileData;
  return {
    isLoggedIn,
    email
  };
};

export default 
  connect(mapStateToProps)(injectIntl(AzureLogin));
