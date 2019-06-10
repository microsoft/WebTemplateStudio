import * as React from "react";
import { withRouter, RouteComponentProps } from "react-router-dom";
import { connect } from "react-redux";

import LoginCard from "../../components/LoginCard";
import Title from "../../components/Title";

import azure from "../../assets/azure.svg";
import styles from "./styles.module.css";

import AzureSubscriptions from "../AzureSubscriptions";
import { EXTENSION_COMMANDS, EXTENSION_MODULES } from "../../utils/constants";
import { InjectedIntlProps, injectIntl } from "react-intl";
import { setDetailPageAction } from "../../actions/wizardInfoActions/setDetailsPage";
import { IOption } from "../../types/option";
import { messages } from "../../mockData/azureServiceOptions";

import { microsoftAzureDetails } from "../../mockData/azureServiceOptions";
import { withLocalPath } from "../../utils/getSvgUrl";
import { AppState } from "../../reducers";
import { Dispatch } from "redux";
import RootAction from "../../actions/ActionType";

interface IDispatchProps {
  setDetailPage: (detailPageInfo: IOption) => any;
}

interface IAzureLoginProps {
  isLoggedIn: boolean;
  vscode: any;
}

type Props = IDispatchProps & IAzureLoginProps & InjectedIntlProps & RouteComponentProps;

class AzureLogin extends React.Component<Props> {
  handleClick = () => {
    // initiates a login command to VSCode ReactPanel class

    this.props.vscode.postMessage({
      module: EXTENSION_MODULES.AZURE,
      command: EXTENSION_COMMANDS.AZURE_LOGIN,
      track: true
    });
  };
  public render() {
    const { isLoggedIn, intl, setDetailPage } = this.props;
    return (
      <div>
        <Title>{intl.formatMessage(messages.azureLoginTitle)}</Title>
        <div className={styles.loginCard}>
          {!isLoggedIn && (
            <LoginCard
              svgUrl={withLocalPath(azure)}
              handleClick={() => {
                this.handleClick();
              }}
              cardTitle={intl.formatMessage(messages.azureTitle)}
              cardBody={intl.formatMessage(messages.azureCardBody)}
              handleDetailsClick={setDetailPage}
              option={microsoftAzureDetails}
            />
          )}
        </div>
        <AzureSubscriptions />
      </div>
    );
  }
}

const mapStateToProps = (state: AppState): IAzureLoginProps => {
  const { isLoggedIn } = state.azureProfileData;
  const { vscodeObject } = state.vscode;
  return {
    isLoggedIn,
    vscode: vscodeObject
  };
};

const mapDispatchToProps = (
  dispatch: Dispatch<RootAction>
): IDispatchProps => ({
  setDetailPage: (detailPageInfo: IOption) => {
    const isIntlFormatted = true;
    dispatch(setDetailPageAction(detailPageInfo, isIntlFormatted));
  }
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(injectIntl(AzureLogin))
);
