import * as React from "react";
import { connect } from "react-redux";

import LoginCard from "../../components/LoginCard";
import Title from "../../components/Title";

import azure from "../../assets/azure.svg";
import styles from "./styles.module.css";
import grid from "../../css/grid.module.css";

import AzureSubscriptions from "../AzureSubscriptions";
import {
  FormattedMessage,
  InjectedIntlProps,
  injectIntl,
  defineMessages
} from "react-intl";

interface IDispatchProps {
  startLoginToAzure: () => any;
}

interface IAzureLoginProps {
  isLoggedIn: boolean;
  vscode: any;
}

type Props = IDispatchProps & IAzureLoginProps & InjectedIntlProps;

const messages = defineMessages({
  azureDeploymentTitle: {
    id: "azureLogin.azureDeploymentTitle",
    defaultMessage: "Microsoft Azure Deployment"
  },
  azureDeploymentBody: {
    id: "azureLogin.azureDeploymentBody",
    defaultMessage:
      "Microsoft Azure is an ever-expanding set of cloud services to help your organization meet your business challenges. Sign in or create an account to get access to CosmosDB and Azure Functions from this extension"
  },
  azureLoginTitle: {
    id: "azureLogin.azureLoginTitle",
    defaultMessage: "Attach services to your web application (Optional)"
  }
});

class AzureLogin extends React.Component<Props> {
  handleClick = () => {
    // initiates a login command to VSCode ReactPanel class
    if (process.env.NODE_ENV === "production") {
      this.props.vscode.postMessage({
        command: "login"
      });
    } else {
      // @ts-ignore produces a mock login response from VSCode in development
      window.postMessage({
        command: "login",
        payload: {
          email: "devEnvironment2@email.com",
          subscriptions: [{ value: "GIV.Hackathon", label: "GIV.Hackathon" }]
        }
      });
    }
  };
  public render() {
    const { isLoggedIn, intl } = this.props;
    return (
      <div>
        <Title>{intl.formatMessage(messages.azureLoginTitle)}</Title>
        <div className={styles.loginCard}>
          {!isLoggedIn && (
            <LoginCard
              svgUrl={`${process.env.REACT_APP_RELATIVE_PATH}${azure}`}
              handleClick={() => {
                this.handleClick();
              }}
              cardTitle={intl.formatMessage(messages.azureDeploymentTitle)}
              cardBody={intl.formatMessage(messages.azureDeploymentBody)}
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

export default connect(
  mapStateToProps,
  null
)(injectIntl(AzureLogin));
