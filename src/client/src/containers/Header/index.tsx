import * as React from "react";
import { connect } from "react-redux";

import styles from "./styles.module.css";
import { IVSCodeObject } from "../../reducers/vscodeApiReducer";
import { EXTENSION_COMMANDS, EXTENSION_MODULES } from "../../utils/constants";
import { getVSCodeApiSelector } from "../../selectors/vscodeApiSelector";
import LeftSidebarLink from "../../components/LeftSidebarLink"; //this

import { FormattedMessage, injectIntl } from "react-intl";
import { AppState } from "../../reducers";
import LeftSidebar from "../../components/LeftSidebar";

interface IHeaderProps {
  vscode: IVSCodeObject;
  isLoggedIn: boolean;
  email: string;
}

type Props = IHeaderProps;

const Header = (props: Props) => {
  const { isLoggedIn, email } = props;
  const signOutClick = () => {
    props.vscode.postMessage({
      module: EXTENSION_MODULES.AZURE,
      command: EXTENSION_COMMANDS.AZURE_LOGOUT,
      track: true
    });
  };
  const keyDownClick = (event: any) => {
    if (event.keyCode === 13 || event.keyCode === 32) {
      signOutClick();
    }
  };
  return (
    <div className={styles.header}>
      <div className={styles.headerTitle}>Web Template Studio</div>
      <LeftSidebar />
      {isLoggedIn && (
        <div className={styles.azureProfile}>
          <div className={styles.profileName}>{email}</div>
          <div
            role="button"
            className={styles.button}
            tabIndex={0}
            onClick={signOutClick}
            onKeyDown={keyDownClick}
          >
            <FormattedMessage id="header.signOut" defaultMessage="Sign out" />
          </div>
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (state: AppState): IHeaderProps => {
  const { isLoggedIn } = state.azureProfileData;
  const { email } = state.azureProfileData.profileData;
  return {
    vscode: getVSCodeApiSelector(state),
    isLoggedIn,
    email
  };
};

export default connect(mapStateToProps)(injectIntl(Header));
