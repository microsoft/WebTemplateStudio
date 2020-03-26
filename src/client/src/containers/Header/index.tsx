import * as React from "react";
import { connect } from "react-redux";

import styles from "./styles.module.css";
import { IVSCodeObject } from "../../store/vscode/vscodeApiReducer";
import { getVSCodeApiSelector } from "../../selectors/vscodeApiSelector";

import { injectIntl } from "react-intl";
import { AppState } from "../../store/combineReducers";

interface IHeaderProps {
  vscode: IVSCodeObject;
}

type Props = IHeaderProps;

const Header = () => {
  return (
    <div className={styles.header}>
      <div className={styles.headerTitle}>Web Template Studio</div>
      <div className={styles.headerTitleSmall}>WebTS</div>
    </div>
  );
};

const mapStateToProps = (state: AppState): IHeaderProps => {
  return {
    vscode: getVSCodeApiSelector(state)
  };
};

export default connect(mapStateToProps)(injectIntl(Header));
