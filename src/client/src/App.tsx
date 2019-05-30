import classnames from "classnames";
import * as React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { Route, RouteComponentProps } from "react-router-dom";

import LeftSidebar from "./components/LeftSidebar";
import PageDetails from "./containers/PageDetails";
import SelectFrameworks from "./components/SelectFrameworks";
import SelectPages from "./containers/SelectPages";
import SelectWebApp from "./containers/SelectWebApp";
import NewProject from "./containers/NewProject";
import CosmosResourceModal from "./containers/CosmosResourceModal";
import Footer from "./containers/Footer";
import Header from "./containers/Header";
import ReviewAndGenerate from "./containers/ReviewAndGenerate";
import RightSidebar from "./containers/RightSidebar";
import PostGenerationModal from "./containers/PostGenerationModal";

import {
  EXTENSION_COMMANDS,
  EXTENSION_MODULES,
  ROUTES,
  DEVELOPMENT
} from "./utils/constants";

import { getVSCodeApi } from "./actions/vscodeApiActions/getVSCodeApi";
import { logIntoAzureAction } from "./actions/azureActions/logIntoAzure";
import { updateOutputPathAction } from "./actions/wizardSelectionActions/updateProjectNameAndPath";
import {
  setAccountAvailability,
  setAppNameAvailabilityAction,
  IAvailabilityFromExtension
} from "./actions/azureActions/setAccountAvailability";
import AzureLogin from "./containers/AzureLogin";
import { getSubscriptionData } from "./actions/azureActions/subscriptionData";
import AzureFunctionsModal from "./containers/AzureFunctionsModal";
import { setProjectPathValidation } from "./actions/wizardSelectionActions/setProjectPathValidation";
import {
  updateTemplateGenerationStatusMessageAction,
  updateTemplateGenerationStatusAction
} from "./actions/wizardInfoActions/updateGenStatusActions";
import { getVersionsDataAction } from "./actions/wizardInfoActions/getVersionData";

import appStyles from "./appStyles.module.css";
import { startLogOutAzure } from "./actions/azureActions/logOutAzure";
import { IVersions } from "./types/version";
import { getVSCodeApiSelector } from "./selectors/vscodeApiSelector";
import { IVSCodeObject } from "./reducers/vscodeApiReducer";
import { setAzureValidationStatusAction } from "./actions/azureActions/setAzureValidationStatusAction";
import { IServiceStatus } from "./reducers/generationStatus/genStatus";
import { resetPagesAction } from "./actions/wizardSelectionActions/selectPages";
import { selectFrontendFramework } from "./actions/wizardSelectionActions/selectFrontEndFramework";
import { ISelected } from "./types/selected";
import { AppState } from "./reducers";
import { IOption } from "./types/option";
import { setPreviewStatusAction } from "./actions/wizardContentActions/setPreviewStatus";
import { setPortAction } from "./actions/wizardContentActions/setPort";
import { ThunkDispatch } from "redux-thunk";
import RootAction from "./actions/ActionType";

if (process.env.NODE_ENV === DEVELOPMENT) {
  require("./css/themes.css");
}

interface IDispatchProps {
  updateOutputPath: (outputPath: string) => any;
  getVSCodeApi: () => void;
  logIntoAzure: (email: string, subscriptions: []) => void;
  startLogOutToAzure: () => any;
  saveSubscriptionData: (subscriptionData: any) => void;
  setCosmosResourceAccountNameAvailability: (
    isAvailableObject: IAvailabilityFromExtension
  ) => any;
  setAppNameAvailability: (
    isAvailableObject: IAvailabilityFromExtension
  ) => any;
  setProjectPathValidation: (validation: any) => void;
  setAzureValidationStatus: (status: boolean) => void;
  updateTemplateGenStatusMessage: (status: string) => any;
  updateTemplateGenStatus: (isGenerated: IServiceStatus) => any;
  getVersionsData: (versions: IVersions) => any;
  resetPageSelection: () => any;
  selectFrontend: (frontendFramework: ISelected) => any;
  setPreviewStatus: (isPreview: boolean) => void;
  setPort: (port: number) => void;
}

interface IStateProps {
  vscode: IVSCodeObject;
  frontendOptions: IOption[];
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
    setAzureValidationStatus: () => {},
    updateTemplateGenStatusMessage: () => {},
    updateTemplateGenStatus: () => {},
    getVersionsData: () => {},
    setPreviewStatus: () => {},
    setPort: () => {}
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
          break;
        case EXTENSION_COMMANDS.GET_USER_STATUS:
        case EXTENSION_COMMANDS.AZURE_LOGIN:
          // email will be null or undefined if login didn't work correctly
          if (message.payload != null) {
            this.props.logIntoAzure(
              message.payload.email,
              message.payload.subscriptions
            );
          }
          break;
        case EXTENSION_COMMANDS.AZURE_LOGOUT:
          this.props.startLogOutToAzure();
          break;
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
          break;
        case EXTENSION_COMMANDS.NAME_COSMOS:
          // Receive input validation
          // and update redux (boolean, string)
          this.props.setCosmosResourceAccountNameAvailability({
            isAvailable: message.payload.isAvailable,
            message: message.payload.reason
          });
          this.props.setAzureValidationStatus(false);
          break;

        case EXTENSION_COMMANDS.NAME_FUNCTIONS:
          this.props.setAppNameAvailability({
            isAvailable: message.payload.isAvailable,
            message: message.payload.reason
          });
          this.props.setAzureValidationStatus(false);
          break;
        case EXTENSION_COMMANDS.PROJECT_PATH_VALIDATION:
          this.props.setProjectPathValidation(
            message.payload.projectPathValidation
          );
          break;
        case EXTENSION_COMMANDS.GEN_STATUS_MESSAGE:
          this.props.updateTemplateGenStatusMessage(message.payload.status);
          break;
        case EXTENSION_COMMANDS.GEN_STATUS:
          this.props.updateTemplateGenStatus(message.payload);
          break;
        case EXTENSION_COMMANDS.GET_VERSIONS:
          this.props.getVersionsData(message.payload);
          break;
        case EXTENSION_COMMANDS.RESET_PAGES:
          if (message.payload.resetPages) {
            this.props.frontendOptions.map((frontend: IOption) => {
              if (frontend.internalName === message.payload.internalName) {
                const {
                  title,
                  internalName,
                  version,
                  author,
                  licenses
                } = frontend;
                this.props.selectFrontend({
                  title: title as string,
                  internalName,
                  version,
                  author,
                  licenses
                });
              }
            });
            this.props.resetPageSelection();
            this.props.history.push(ROUTES.SELECT_PAGES);
          }
          break;
        case EXTENSION_COMMANDS.GET_PREVIEW_STATUS:
          this.props.setPreviewStatus(message.payload.preview);
          break;
        case EXTENSION_COMMANDS.GET_PORT:
          this.props.setPort(message.payload.port);
          break;
      }
    });
  }

  public componentDidUpdate(prevProps: Props) {
    const { vscode } = this.props;
    if (vscode !== prevProps.vscode) {
      vscode.postMessage({
        module: EXTENSION_MODULES.AZURE,
        command: EXTENSION_COMMANDS.GET_USER_STATUS,
        track: true
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

          <main
            className={classnames(appStyles.centerView, {
              [appStyles.centerViewMaxHeight]: pathname === ROUTES.PAGE_DETAILS
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
            <Route exact={true} path={ROUTES.NEW_PROJECT} component={NewProject} />
          </main>
          <RightSidebar />
        </div>
        <Footer />
      </React.Fragment>
    );
  }
}

const mapDispatchToProps = (dispatch: ThunkDispatch<AppState, void, RootAction>): IDispatchProps => ({
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
  setAzureValidationStatus: (status: boolean) => {
    dispatch(setAzureValidationStatusAction(status));
  },
  updateTemplateGenStatusMessage: (status: string) => {
    dispatch(updateTemplateGenerationStatusMessageAction(status));
  },
  updateTemplateGenStatus: (isGenerated: IServiceStatus) => {
    dispatch(updateTemplateGenerationStatusAction(isGenerated));
  },
  getVersionsData: (versions: IVersions) => {
    dispatch(getVersionsDataAction(versions));
  },
  resetPageSelection: () => {
    dispatch(resetPagesAction());
  },
  selectFrontend: (frontendFramework: ISelected) => {
    dispatch(selectFrontendFramework(frontendFramework));
  },
  setPreviewStatus: (isPreview: boolean) => {
    dispatch(setPreviewStatusAction(isPreview));
  },
  setPort: (port: number) => {
    dispatch(setPortAction(port));
  }
});

const mapStateToProps = (state: AppState): IStateProps => ({
  vscode: getVSCodeApiSelector(state),
  frontendOptions: state.wizardContent.frontendOptions
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(App)
);
