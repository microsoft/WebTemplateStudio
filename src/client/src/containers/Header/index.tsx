import * as React from "react";
import { connect } from "react-redux";

import styles from "./styles.module.css";
import { IVSCodeObject } from "../../reducers/vscodeApiReducer";
import { EXTENSION_COMMANDS } from "../../utils/constants";
import { getVSCodeApiSelector } from "../../selectors/vscodeApiSelector";

import { FormattedMessage, injectIntl } from "react-intl";

interface IHeaderProps {
  vscode: IVSCodeObject;
  isLoggedIn: boolean;
  email: string;
}

interface IDispatchProps {
  startLogOutToAzure: () => any;
}

type Props = IHeaderProps & IDispatchProps;

const Header = (props: Props) => {
  const { isLoggedIn, email } = props;
  return (
    <div className={styles.header}>
      <div className={styles.headerTitle}>Project Acorn</div>
      {isLoggedIn && (
        <div className={styles.azureProfile}>
          <div className={styles.profileName}>{email}</div>
          <div
            className={styles.button}
            onClick={() => {
              props.vscode.postMessage({
                command: EXTENSION_COMMANDS.AZURE_LOGOUT
              });
            }}
          >
            <FormattedMessage id="header.signOut" defaultMessage="Sign out" />
          </div>
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (state: any): IHeaderProps => {
  const { isLoggedIn } = state.azureProfileData;
  const { email } = state.azureProfileData.profileData;
  return {
    vscode: getVSCodeApiSelector(state),
    isLoggedIn,
    email
  };
};

export default connect(mapStateToProps)(injectIntl(Header));
