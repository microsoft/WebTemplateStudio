import * as React from "react";
import { connect } from "react-redux";

import * as AzureActions from "../../actions/logOutAzure";

import styles from "./styles.module.css";

interface IHeaderProps {
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
      <div className={styles.headerTitle}>
        Project Acorn
      </div>
      {isLoggedIn && (<div className={styles.azureProfile}>
        <div className={styles.profileName}>
          {email}
        </div>
        <div className={styles.button} onClick={props.startLogOutToAzure}>
          Sign out
        </div>
      </div>)}
    </div>
  )
};

const mapStateToProps = (state: any): IHeaderProps => {
  const { isLoggedIn } = state.azureProfileData;
  const { email } = state.azureProfileData.profileData;
  return {
      isLoggedIn,
      email,
  }
}

const mapDispatchToProps = (dispatch: any): IDispatchProps => ({
  startLogOutToAzure: () => { dispatch(AzureActions.startLogOutAzure()) },
})

export default connect(mapStateToProps, mapDispatchToProps)(Header);
