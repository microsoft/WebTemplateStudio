import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { InjectedIntlProps, injectIntl } from "react-intl";
import { AppContext } from "../../../AppContext";
import { AppState } from "../../../store/combineReducers";

import keyUpHandler from "../../../utils/keyUpHandler";
import buttonStyles from "../../../css/buttonStyles.module.css";
import classnames from "classnames";
import styles from "./styles.module.css";
import messages from "./messages";

import { azureLogin, azureLogout } from "../../../utils/extensionService/extensionService";
import { logIntoAzureActionAction, logOutAzureAction } from "../../../store/config/azure/action";
import { isLoggedInSelector } from "../../../store/config/azure/selector";

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

  const handleSignInClick = () => {
    azureLogin(vscode).then((event) => {
      const message = event.data;
      if (message.payload !== null) {
        const loginData = message.payload as AzureProfile;
        dispatch(logIntoAzureActionAction(loginData));
      }
    })
  };

  
  return (
    <>
      {isLoggedIn && (
        <div className={styles.azureProfile}>
          {email}
          <button className={classnames(buttonStyles.buttonLink, styles.signOutButton)}
            onClick={signOutAzure}>
            {intl.formatMessage(messages.signOut)}
          </button>
        </div>
      )}
      {!isLoggedIn && (
        <div className={styles.azureProfile}>
          <button className={classnames(buttonStyles.buttonDark, styles.button)}
            onClick={handleSignInClick}>
            {intl.formatMessage(messages.signIn)}
          </button>

          <div className={styles.buttonContainer}>
            <button
              className={classnames(
                styles.button,
                buttonStyles.buttonHighlighted
              )}>
              <a
                className={styles.buttonLink}
                href="https://azure.microsoft.com/free/"
                target="_blank" rel='noreferrer'
                onKeyUp={keyUpHandler}>
                {intl.formatMessage(messages.createAccount)}
              </a>
            </button>
          </div>
      </div>
      )
      }
    </>
  );
};

export default injectIntl(AzureAccount);
