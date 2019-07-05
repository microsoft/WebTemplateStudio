import * as React from "react";
import { connect } from "react-redux";

import styles from "./styles.module.css";
import { IVSCodeObject } from "../../reducers/vscodeApiReducer";
import { EXTENSION_COMMANDS, EXTENSION_MODULES } from "../../utils/constants";
import { getVSCodeApiSelector } from "../../selectors/vscodeApiSelector";

import { FormattedMessage, injectIntl } from "react-intl";
import { AppState } from "../../reducers";
import TopNavBar from "../../components/TopNavBar";

interface IHeaderProps {
  vscode: IVSCodeObject;
}

type Props = IHeaderProps;

const Header = (props: Props) => {
  return (
    <div className={styles.header}>
      <div className={styles.headerTitle}>Web Template Studio</div>
      <TopNavBar />
    </div>
  );
};

const mapStateToProps = (state: AppState): IHeaderProps => {
  return {
    vscode: getVSCodeApiSelector(state)
  };
};

export default connect(mapStateToProps)(injectIntl(Header));
