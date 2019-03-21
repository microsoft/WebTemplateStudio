import * as React from "react";
import { connect } from "react-redux";
import { HashRouter as Router, Route } from "react-router-dom";
import * as Redux from "redux";

import LeftSidebar from "./components/LeftSidebar";
import PageDetails from "./components/PageDetails";
import SelectFrameworks from "./components/SelectFrameworks";
import SelectPages from "./components/SelectPages";
import SelectWebApp from "./components/SelectWebApp";
import Welcome from "./components/Welcome";
import CosmosResourceModal from "./containers/CosmosResourceModal";
import Footer from "./containers/Footer";
import Header from "./containers/Header";
import ReviewAndGenerate from "./containers/ReviewAndGenerate";
import RightSidebar from "./containers/RightSidebar";

import leftSidebarData from "./mockData/leftSidebarData";
import { ROUTES, EXTENSION_COMMANDS } from "./utils/constants";

import { getVSCodeApi } from "./actions/getVSCodeApi";
import { loadWizardContentAction } from "./actions/loadWizardContent";
import { logIntoAzureAction } from "./actions/logIntoAzure";
import { updateOutputPathAction } from "./actions/updateProjectNameAndPath";
import { setAccountAvailability, setAppNameAvailabilityAction } from "./actions/setAccountAvailability";
import appStyles from "./appStyles.module.css";
import AzureLogin from "./containers/AzureLogin";
import EngineAPIService from "./services/EngineAPIService";
import { getSubscriptionData } from "./actions/subscriptionData";
import AzureFunctionsModal from "./containers/AzureFunctionsModal";
import { setPathAndNameValidation } from "./actions/setPathAndNameValidation";

interface IDispatchProps {
  updateOutputPath: (outputPath: string) => any;
  getVSCodeApi: () => void;
  loadWizardContent: () => void;
  logIntoAzure: (email: string, subscriptions: []) => void;
  saveSubscriptionData: (subscriptionData: any) => void;
  setCosmosResourceAccountNameAvailability: (isAvailableObject: any) => any;
  setAppNameAvailability: (isAvailableObject: any) => any;
  setPathAndNameValidation: (validation: {}) => void;
}

interface IStateProps {
  vscode: any;
}

type Props = IDispatchProps & IStateProps;

class App extends React.Component<Props> {
  public static defaultProps = {
    getVSCodeApi: () => { },
    loadWizardContent: () => { },
    logIntoAzure: () => { },
    saveSubscriptionData: () => { },
    updateOutputPath: () => { },
    setCosmosResourceAccountNameAvailability: () => { },
    setAppNameAvailability: () => { },
    setPathAndNameValidation: () => { }
  };

  public componentDidMount() {
    this.props.getVSCodeApi();
    this.props.loadWizardContent();
    const api = new EngineAPIService("5000", undefined);
    api.syncPlatforms();
    // listens for a login event from VSCode
    window.addEventListener("message", event => {
      const message = event.data;
      switch (message.command) {
        case "getOutputPath":
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
        case EXTENSION_COMMANDS.SUBSCRIPTION_DATA:
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
        case "name-cosmos":
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
    return (
      <Router>
        <div>
          <Header />
          <div className={appStyles.container}>
            <CosmosResourceModal />
            <AzureFunctionsModal />
            <LeftSidebar sidebarItems={leftSidebarData} />
            <div className={appStyles.centerView}>
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
              <Route
                path={ROUTES.SELECT_PROJECT_TYPE}
                component={SelectWebApp}
              />
              <Route exact={true} path="/" component={Welcome} />
            </div>
            <RightSidebar />
          </div>
          <Footer />
        </div>
      </Router>
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
  logIntoAzure: (email: string, subscriptions: []) => {
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
  }
});

const mapStateToProps = (state: any): IStateProps => ({
  vscode: state.vscode.vscodeObject
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
