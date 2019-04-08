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
import { logIntoAzureAction } from "./actions/logIntoAzure";
import { updateOutputPathAction } from "./actions/updateProjectNameAndPath";
import {
  setAccountAvailability,
  setAppNameAvailabilityAction
} from "./actions/setAccountAvailability";
import AzureLogin from "./containers/AzureLogin";
import { getSubscriptionData } from "./actions/subscriptionData";
import AzureFunctionsModal from "./containers/AzureFunctionsModal";
import { setProjectPathValidation } from "./actions/setProjectPathValidation";
import {
  updateTemplateGenerationStatusMessageAction,
  updateTemplateGenerationStatusAction
} from "./actions/updateGenStatusActions";
import { getVersionsDataAction } from "./actions/getVersionData";

import appStyles from "./appStyles.module.css";
import { startLogOutAzure } from "./actions/logOutAzure";
import { IVersions } from "./types/version";
import { getVSCodeApiSelector } from "./selectors/vscodeApiSelector";
import { IVSCodeObject } from "./reducers/vscodeApiReducer";

interface IDispatchProps {
  updateOutputPath: (outputPath: string) => any;
  getVSCodeApi: () => void;
  logIntoAzure: (email: string, subscriptions: []) => void;
  startLogOutToAzure: () => any;
  saveSubscriptionData: (subscriptionData: any) => void;
  setCosmosResourceAccountNameAvailability: (isAvailableObject: any) => any;
  setAppNameAvailability: (isAvailableObject: any) => any;
  setProjectPathValidation: (validation: any) => void;
  updateTemplateGenStatusMessage: (status: string) => any;
  updateTemplateGenStatus: (isGenerated: boolean) => any;
  getVersionsData: (versions: IVersions) => any;
}

interface IStateProps {
  vscode: IVSCodeObject;
}

type Props = IDispatchProps & IStateProps & RouteComponentProps;

class App extends React.Component<Props> {
  public static defaultProps = {
    getVSCodeApi: () => {},
    loadWizardContent: () => {},
    logIntoAzure: () => {},
    startLogOutToAzure: () => {},
    saveSubscriptionData: () => {},
    updateOutputPath: () => {},
    setCosmosResourceAccountNameAvailability: () => {},
    setAppNameAvailability: () => {},
    setProjectPathValidation: () => {},
    updateTemplateGenStatusMessage: () => {},
    updateTemplateGenStatus: () => {},
    getVersionsData: () => {}
  };

  public componentDidMount() {
    this.props.getVSCodeApi();
    // listens for a login event from VSCode
    window.addEventListener("message", event => {
      const message = event.data;
      switch (message.command) {
        case EXTENSION_COMMANDS.GET_OUTPUT_PATH:
          if (message.payload != null && message.payload.outputPath != null) {
            this.props.updateOutputPath(message.payload.outputPath);
          }
          return;
        case EXTENSION_COMMANDS.GET_USER_STATUS:
        case EXTENSION_COMMANDS.AZURE_LOGIN:
          // email will be null or undefined if login didn't work correctly
          if (message.payload != null) {
            this.props.logIntoAzure(
              message.payload.email,
              message.payload.subscriptions
            );
          }
          return;
        case EXTENSION_COMMANDS.AZURE_LOGOUT:
          this.props.startLogOutToAzure();
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
        case EXTENSION_COMMANDS.PROJECT_PATH_VALIDATION:
          this.props.setProjectPathValidation(
            message.payload.projectPathValidation
          );
          return;
        case EXTENSION_COMMANDS.GEN_STATUS_MESSAGE:
          this.props.updateTemplateGenStatusMessage(message.payload.status);
          return;
        case EXTENSION_COMMANDS.GEN_STATUS:
          this.props.updateTemplateGenStatus(message.payload);
          return;
        case EXTENSION_COMMANDS.GET_VERSIONS:
          this.props.getVersionsData(message.payload);
          return;
      }
    });
  }

  public componentDidUpdate(prevProps: Props) {
    const { vscode } = this.props;
    if (vscode !== prevProps.vscode) {
      vscode.postMessage({
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
              [appStyles.centerView]:
                pathname === ROUTES.WELCOME || pathname == ROUTES.PAGE_DETAILS,
              [appStyles.centerViewCropped]:
                pathname !== ROUTES.WELCOME && pathname !== ROUTES.PAGE_DETAILS
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
  logIntoAzure: (email: string, subscriptions: any[]) => {
    dispatch(logIntoAzureAction({ email, subscriptions }));
  },
  startLogOutToAzure: () => {
    dispatch(startLogOutAzure());
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
  setProjectPathValidation: (validation: any) => {
    dispatch(setProjectPathValidation(validation));
  },
  updateTemplateGenStatusMessage: (status: string) => {
    dispatch(updateTemplateGenerationStatusMessageAction(status));
  },
  updateTemplateGenStatus: (isGenerated: boolean) => {
    dispatch(updateTemplateGenerationStatusAction(isGenerated));
  },
  getVersionsData: (versions: IVersions) => {
    dispatch(getVersionsDataAction(versions));
  }
});

const mapStateToProps = (state: any): IStateProps => ({
  vscode: getVSCodeApiSelector(state)
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(App)
);
