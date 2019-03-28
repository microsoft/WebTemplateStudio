import classnames from "classnames";
import * as React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { Route, RouteComponentProps } from "react-router-dom";
import * as Redux from "redux";

import LeftSidebar from "./components/LeftSidebar";
import PageDetails from "./containers/PageDetails";
import SelectFrameworks from "./components/SelectFrameworks";
import SelectPages from "./components/SelectPages";
import SelectWebApp from "./components/SelectWebApp";
import Welcome from "./components/Welcome";
import CosmosResourceModal from "./containers/CosmosResourceModal";
import Footer from "./containers/Footer";
import Header from "./containers/Header";
import ReviewAndGenerate from "./containers/ReviewAndGenerate";
import RightSidebar from "./containers/RightSidebar";
import PostGenerationModal from "./containers/PostGenerationModal";

import { EXTENSION_COMMANDS, ROUTES } from "./utils/constants";

import { getVSCodeApi } from "./actions/getVSCodeApi";
import { loadWizardContentAction } from "./actions/loadWizardContent";
import { logIntoAzureAction } from "./actions/logIntoAzure";
import { updateOutputPathAction } from "./actions/updateProjectNameAndPath";
import {
  setAccountAvailability,
  setAppNameAvailabilityAction
} from "./actions/setAccountAvailability";
import AzureLogin from "./containers/AzureLogin";
import { getSubscriptionData } from "./actions/subscriptionData";
import AzureFunctionsModal from "./containers/AzureFunctionsModal";
import { setPathAndNameValidation } from "./actions/setPathAndNameValidation";
import { updateTemplateGenerationStatusAction } from "./actions/updateGenStatusActions";

import appStyles from "./appStyles.module.css";

interface IDispatchProps {
  updateOutputPath: (outputPath: string) => any;
  getVSCodeApi: () => void;
  loadWizardContent: () => void;
  logIntoAzure: (email: string, subscriptions: []) => void;
  saveSubscriptionData: (subscriptionData: any) => void;
  setCosmosResourceAccountNameAvailability: (isAvailableObject: any) => any;
  setAppNameAvailability: (isAvailableObject: any) => any;
  setPathAndNameValidation: (validation: {}) => void;
  updateTemplateGenStatus: (status: string) => void;
}

interface IStateProps {
  vscode: any;
}

type Props = IDispatchProps & IStateProps & RouteComponentProps;

class App extends React.Component<Props> {
  public static defaultProps = {
    getVSCodeApi: () => {},
    loadWizardContent: () => {},
    logIntoAzure: () => {},
    saveSubscriptionData: () => {},
    updateOutputPath: () => {},
    setCosmosResourceAccountNameAvailability: () => {},
    setAppNameAvailability: () => {},
    setPathAndNameValidation: () => {},
    updateTemplateGenStatus: () => {}
  };

  public componentDidMount() {
    this.props.getVSCodeApi();
    this.props.loadWizardContent();
    // listens for a login event from VSCode
    window.addEventListener("message", event => {
      const message = event.data;
      switch (message.command) {
        case EXTENSION_COMMANDS.GET_OUTPUT_PATH:
          if (message.payload != null && message.payload.outputPath != null) {
            this.props.updateOutputPath(
              message.payload.outputPath.substring(
                1,
                message.payload.outputPath.length
              )
            );
          }
          return;
        case EXTENSION_COMMANDS.GET_USER_STATUS:
        case "login":
          // email will be null or undefined if login didn't work correctly
          if (message.payload != null) {
            this.props.logIntoAzure(
              message.payload.email,
              message.payload.subscriptions
            );
          }
          return;
        case EXTENSION_COMMANDS.SUBSCRIPTION_DATA_FUNCTIONS:
        case EXTENSION_COMMANDS.SUBSCRIPTION_DATA_COSMOS:
          // Expect resource groups and locations on this request
          // Receive resource groups and locations
          // and update redux (resourceGroups, locations)
          if (message.payload != null) {
            this.props.saveSubscriptionData({
              locations: message.payload.locations,
              resourceGroups: message.payload.resourceGroups
            });
          }
          return;
        case EXTENSION_COMMANDS.NAME_COSMOS:
          // Receive input validation
          // and update redux (boolean, string)
          this.props.setCosmosResourceAccountNameAvailability({
            isAvailable: message.payload.isAvailable,
            message: message.message
          });
          return;

        case EXTENSION_COMMANDS.NAME_FUNCTIONS:
          this.props.setAppNameAvailability({
            isAvailable: message.payload.isAvailable,
            message: message.message
          });
          return;
        case EXTENSION_COMMANDS.PROJECT_PATH_AND_NAME_VALIDATION:
          this.props.setPathAndNameValidation(message.payload.validation);
          return;
        case EXTENSION_COMMANDS.STATUS:
          this.props.updateTemplateGenStatus(message.payload.status);
          return;
      }
    });
  }

  public componentDidUpdate(prevProps: Props) {
    if (this.props.vscode !== prevProps.vscode) {
      this.props.vscode.postMessage({
        command: EXTENSION_COMMANDS.GET_USER_STATUS
      });
    }
  }

  public render() {
    const { pathname } = this.props.location;
    return (
      <React.Fragment>
        <Header />
        <div className={appStyles.container}>
          <CosmosResourceModal />
          <AzureFunctionsModal />
          <PostGenerationModal />
          <LeftSidebar />
          <div
            className={classnames({
              [appStyles.centerView]: pathname === ROUTES.WELCOME,
              [appStyles.centerViewCropped]: pathname !== ROUTES.WELCOME
            })}
          >
            <Route path={ROUTES.PAGE_DETAILS} component={PageDetails} />
            <Route path={ROUTES.AZURE_LOGIN} component={AzureLogin} />
            <Route
              path={ROUTES.REVIEW_AND_GENERATE}
              component={ReviewAndGenerate}
            />
            <Route
              path={ROUTES.SELECT_FRAMEWORKS}
              component={SelectFrameworks}
            />
            <Route path={ROUTES.SELECT_PAGES} component={SelectPages} />
            <Route path={ROUTES.SELECT_PROJECT_TYPE} component={SelectWebApp} />
            <Route exact={true} path={ROUTES.WELCOME} component={Welcome} />
          </div>
          <RightSidebar />
        </div>
        <Footer />
      </React.Fragment>
    );
  }
}

const mapDispatchToProps = (dispatch: Redux.Dispatch<any>): IDispatchProps => ({
  getVSCodeApi: () => {
    dispatch(getVSCodeApi());
  },
  loadWizardContent: () => {
    dispatch(loadWizardContentAction());
  },
  logIntoAzure: (email: string, subscriptions: any[]) => {
    dispatch(logIntoAzureAction({ email, subscriptions }));
  },
  saveSubscriptionData: (subscriptionData: any) => {
    dispatch(getSubscriptionData(subscriptionData));
  },
  updateOutputPath: (outputPath: string) => {
    dispatch(updateOutputPathAction(outputPath));
  },
  setCosmosResourceAccountNameAvailability: (isAvailableObject: any) => {
    dispatch(setAccountAvailability(isAvailableObject));
  },
  setAppNameAvailability: (isAvailableObject: any) => {
    dispatch(setAppNameAvailabilityAction(isAvailableObject));
  },
  setPathAndNameValidation: (validation: {}) => {
    dispatch(setPathAndNameValidation(validation));
  },
  updateTemplateGenStatus: (status: string) => {
    dispatch(updateTemplateGenerationStatusAction(status));
  }
});

const mapStateToProps = (state: any): IStateProps => ({
  vscode: state.vscode.vscodeObject
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(App)
);
