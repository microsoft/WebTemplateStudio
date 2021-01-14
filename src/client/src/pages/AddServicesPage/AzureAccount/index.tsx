import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { InjectedIntlProps, injectIntl } from "react-intl";
import { AppContext } from "../../../AppContext";
import { AppState } from "../../../store/combineReducers";

import keyUpHandler from "../../../utils/keyUpHandler";
import buttonStyles from "../../../css/button.module.css";
import classnames from "classnames";
import styles from "./styles.module.css";

import { AZURE_LINKS } from "../../../utils/constants/azure";
import { azureLogin, azureLogout } from "../../../utils/extensionService/extensionService";
import { logIntoAzureActionAction, logOutAzureAction } from "../../../store/config/azure/action";
import { isLoggedInSelector } from "../../../store/config/azure/selector";
import messages from "./messages";

type Props = InjectedIntlProps;

const AzureAccount = ({ intl }: Props) => {
  const dispatch = useDispatch();
  const { vscode } = React.useContext(AppContext);
  const isLoggedIn = useSelector((state: AppState) => isLoggedInSelector(state));
  const email = useSelector((state: AppState) => state.config.azureProfileData.email);

  const signOutAzure = async () => {
    const event = await azureLogout(vscode);
    if (event.data.payload.success) {
      dispatch(logOutAzureAction());
    }
  };

  const handleSignInClick = async () => {
    const event = await azureLogin(vscode);
    if (event.data.payload !== null) {
      const loginData = event.data.payload as AzureProfile;
      dispatch(logIntoAzureActionAction(loginData));
    }
  };

  return (
    <>
      {isLoggedIn && (
        <div className={styles.azureProfile} data-testid="loggedInContainer">
          <div className={styles.loginDetails}>
            {email}
            <br />
            <button
              className={classnames(buttonStyles.buttonLink, styles.signOutButton)}
              onClick={signOutAzure}
              aria-label={intl.formatMessage(messages.ariaSignOutLabel)}
            >
              {intl.formatMessage(messages.signOut)}
            </button>
          </div>
        </div>
      )}
      {!isLoggedIn && (
        <div className={classnames(styles.azureProfile, styles.buttonContainer)}>
          <button
            className={classnames(styles.button, buttonStyles.buttonHighlighted)}
            onClick={handleSignInClick}
            aria-label={intl.formatMessage(messages.ariaSignInLabel)}
          >
            {intl.formatMessage(messages.signIn)}
          </button>

          <a
            href={AZURE_LINKS.CREATE_FREE_ACCOUNT}
            target="_blank"
            rel="noreferrer noopener"
            onKeyUp={keyUpHandler}
            tabIndex={-1}
          >
            <button
              className={classnames(styles.button, buttonStyles.buttonHighlighted)}
              aria-label={intl.formatMessage(messages.ariaCreateAccountLabel)}
            >
              {intl.formatMessage(messages.createAccount)}
            </button>
          </a>
        </div>
      )}
    </>
  );
};

export default injectIntl(AzureAccount);
