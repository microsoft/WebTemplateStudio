import * as React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

import LoginCard from "../../components/LoginCard";
import Title from "../../components/Title";

import azure from "../../assets/azure.svg";
import styles from "./styles.module.css";

import AzureSubscriptions from "../AzureSubscriptions";
import { EXTENSION_COMMANDS } from "../../utils/constants";
import { InjectedIntlProps, injectIntl } from "react-intl";
import { setDetailPageAction } from "../../actions/setDetailsPage";
import { IOption } from "../../types/option";
import { withLocalPath } from "../../utils/getSvgUrl";
import { messages } from "../../mockData/azureServiceOptions";

import { microsoftAzureDetails } from "../../mockData/azureServiceOptions";
import { withLocalPath } from "../../utils/getSvgUrl";

interface IDispatchProps {
  setDetailPage: (detailPageInfo: IOption) => any;
}

interface IAzureLoginProps {
  isLoggedIn: boolean;
  vscode: any;
}

type Props = IDispatchProps & IAzureLoginProps & InjectedIntlProps;

class AzureLogin extends React.Component<Props> {
  handleClick = () => {
    // initiates a login command to VSCode ReactPanel class
    this.props.vscode.postMessage({
      command: EXTENSION_COMMANDS.AZURE_LOGIN
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

const mapStateToProps = (state: any): IAzureLoginProps => {
  const { isLoggedIn } = state.azureProfileData;
  const { vscodeObject } = state.vscode;
  return {
    isLoggedIn,
    vscode: vscodeObject
  };
};

const mapDispatchToProps = (dispatch: any): IDispatchProps => ({
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
