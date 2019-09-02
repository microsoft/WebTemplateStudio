import classnames from "classnames";
import * as React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { Route, RouteComponentProps, Link } from "react-router-dom";

import PageDetails from "./containers/PageDetails";
import SelectFrameworks from "./containers/SelectFrameworks";
import SelectPages from "./containers/SelectPages";
import NewProject from "./containers/NewProject";
import CosmosResourceModal from "./containers/CosmosResourceModal";
import Footer from "./containers/Footer";
import Header from "./containers/Header";
import ReviewAndGenerate from "./containers/ReviewAndGenerate";
import RightSidebar from "./containers/RightSidebar";
import PostGenerationModal from "./containers/PostGenerationModal";
import RedirectModal from "./containers/RedirectModal";
import ViewLicensesModal from "./containers/ViewLicensesModal";
import AppServiceModal from "./containers/AppServiceModal";
import AddPagesModal from "./containers/AddPagesModal";

import { ReactComponent as HomeSplashSVG } from "./assets/homeSplash.svg";
import { ReactComponent as SummarySplashSVG } from "./assets/summarySplash.svg";

import {
  EXTENSION_COMMANDS,
  EXTENSION_MODULES,
  ROUTES,
  DEVELOPMENT,
  FRAMEWORK_TYPE,
  BOOTSTRAP_LICENSE
} from "./utils/constants";

import { getVSCodeApi } from "./actions/vscodeApiActions/getVSCodeApi";
import { logIntoAzureAction } from "./actions/azureActions/logIntoAzure";
import {
  updateOutputPathAction,
  updateProjectNameAction
} from "./actions/wizardSelectionActions/updateProjectNameAndPath";
import {
  setAccountAvailability,
  setAppNameAvailabilityAction,
  setSiteNameAvailabilityAction,
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
import {
  selectPagesAction,
  updatePageCountAction
} from "./actions/wizardSelectionActions/selectPages";
import { getVersionsDataAction } from "./actions/wizardInfoActions/getVersionData";
import {
  updateDependencyInfoAction,
  IDependencyInfo
} from "./actions/wizardInfoActions/updateDependencyInfo";

import appStyles from "./appStyles.module.css";
import { startLogOutAzure } from "./actions/azureActions/logOutAzure";
import { IVersions } from "./types/version";
import { getVSCodeApiSelector } from "./selectors/vscodeApiSelector";
import { IPageCount } from "./reducers/wizardSelectionReducers/pageCountReducer";
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
import TopNavBar from "./components/TopNavBar";
import { parseFrameworksPayload } from "./utils/parseFrameworksPayload";
import { getBackendFrameworksSuccess } from "./actions/wizardContentActions/getBackendFrameworks";
import { getFrontendFrameworksSuccess } from "./actions/wizardContentActions/getFrontendFrameworks";
import { getPagesOptionsAction } from "./actions/wizardContentActions/getPagesOptions";
import frontendFramework from "./reducers/wizardSelectionReducers/selectFrontendFrameworkReducer";
import AzureLoginModal from "./containers/AzureLoginModal";

if (process.env.NODE_ENV === DEVELOPMENT) {
  require("./css/themes.css");
}

interface IDispatchProps {
  updateOutputPath: (outputPath: string) => any;
  updateProjectName: (projectName: string) => any;
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
  setSiteNameAvailability: (
    isAvailableObject: IAvailabilityFromExtension
  ) => any;
  setProjectPathValidation: (validation: any) => void;
  setAzureValidationStatus: (status: boolean) => void;
  updateTemplateGenStatusMessage: (status: string) => any;
  updateTemplateGenStatus: (isGenerated: IServiceStatus) => any;
  getVersionsData: (versions: IVersions) => any;
  updateDependencyInfo: (dependencyInfo: IDependencyInfo) => any;
  getBackendFrameworksSuccess: (frameworks: IOption[]) => any;
  getFrontendFrameworksSuccess: (frameworks: IOption[]) => any;
  getPages: (pages: IOption[]) => any;
  selectPages: (pages: ISelected[]) => void;
  updatePageCount: (pageCount: IPageCount) => any;
  resetPageSelection: () => any;
  selectFrontend: (frontendFramework: ISelected) => any;
  setPreviewStatus: (isPreview: boolean) => void;
  setPort: (port: number) => void;
}

interface IStateProps {
  vscode: IVSCodeObject;
  frontendOptions: IOption[];
  selectedFrontend: ISelected;
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
    updateDependencyInfo: () => {},
    getBackendFrameworksSuccess: () => {},
    getFrontendFrameworksSuccess: () => {},
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
        // get frameworks from extension message
        case EXTENSION_COMMANDS.GET_FRAMEWORKS:
          this.props.getFrontendFrameworksSuccess(
            parseFrameworksPayload(
              message.payload.frameworks,
              FRAMEWORK_TYPE.FRONTEND,
              message.payload.isPreview
            )
          );
          this.props.getBackendFrameworksSuccess(
            parseFrameworksPayload(
              message.payload.frameworks,
              FRAMEWORK_TYPE.BACKEND,
              message.payload.isPreview
            )
          );
          break;
        case EXTENSION_COMMANDS.GET_PAGES:
          this.props.getPages(message.payload.pages);
          break;
        case EXTENSION_COMMANDS.GET_DEPENDENCY_INFO:
          this.props.updateDependencyInfo(message.payload);
          break;
        case EXTENSION_COMMANDS.GET_OUTPUT_PATH:
          if (message.payload != null && message.payload.outputPath != null) {
            this.props.updateOutputPath(message.payload.outputPath);
          }
          break;
        case EXTENSION_COMMANDS.GET_PROJECT_NAME:
          if (message.payload != null && message.payload.projectName != null) {
            this.props.updateProjectName(message.payload.projectName);
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
          // Update UI only if user sign out is confirmed by the extension
          if (message.payload) {
            this.props.startLogOutToAzure();
          }
          break;
        case EXTENSION_COMMANDS.SUBSCRIPTION_DATA_FUNCTIONS:
        case EXTENSION_COMMANDS.SUBSCRIPTION_DATA_COSMOS:
        case EXTENSION_COMMANDS.SUBSCRIPTION_DATA_APP_SERVICE:
          // Expect resource groups and locations on this request
          // Receive resource groups and locations
          // and update redux (resourceGroups, locations)
          if (message.payload != null) {
            this.props.saveSubscriptionData({
              locations: message.payload.locations,
              resourceGroups: message.payload.resourceGroups,
              validName: message.payload.validName
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
        case EXTENSION_COMMANDS.NAME_APP_SERVICE:
          this.props.setSiteNameAvailability({
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
            this.props.resetPageSelection();
            const { selectedFrontend } = this.props;

            // reset page count
            const key = `wts.Page.${selectedFrontend.internalName}.Blank`;
            const PAGE_TYPE_COUNT: IPageCount = {};
            PAGE_TYPE_COUNT[key] = 1;
            this.props.updatePageCount(PAGE_TYPE_COUNT);

            // select default blank page
            const PAGES_SELECTION: ISelected[] = [
              {
                title: "Blank",
                internalName: `wts.Page.${selectedFrontend.internalName}.Blank`,
                id: "Blank",
                defaultName: "Blank",
                isValidTitle: true,
                licenses: [
                  {
                    text: "Bootstrap",
                    url: BOOTSTRAP_LICENSE
                  }
                ],
                author: "Microsoft"
              }
            ];
            this.props.selectPages(PAGES_SELECTION);
          }
          break;
        case EXTENSION_COMMANDS.GET_PREVIEW_STATUS:
          this.props.setPreviewStatus(message.payload.preview);
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
        <TopNavBar />

        <div className={appStyles.container}>
          <AzureLoginModal />
          <CosmosResourceModal />
          <AzureFunctionsModal />
          <PostGenerationModal />
          <RedirectModal />
          <ViewLicensesModal />
          <AppServiceModal />
          <AddPagesModal />

          <main
            className={classnames(appStyles.centerView, {
              [appStyles.centerViewNewProjectPage]:
                pathname === ROUTES.NEW_PROJECT,
              [appStyles.centerViewMaxHeight]: pathname === ROUTES.PAGE_DETAILS,
              [appStyles.centerViewAzurePage]: pathname === ROUTES.AZURE_LOGIN
            })}
          >
            {pathname === ROUTES.NEW_PROJECT ? (
              <HomeSplashSVG
                className={classnames(appStyles.splash, appStyles.homeSplash)}
              />
            ) : null}

            {pathname === ROUTES.REVIEW_AND_GENERATE ? (
              <SummarySplashSVG
                className={classnames(
                  appStyles.splash,
                  appStyles.summarySplash
                )}
              />
            ) : null}
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
              exact={true}
              path={ROUTES.NEW_PROJECT}
              component={NewProject}
            />
          </main>
          {pathname !== ROUTES.PAGE_DETAILS &&
            pathname !== ROUTES.NEW_PROJECT && <RightSidebar />}
        </div>
        <Footer />
      </React.Fragment>
    );
  }
}

const mapDispatchToProps = (
  dispatch: ThunkDispatch<AppState, void, RootAction>
): IDispatchProps => ({
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
  updateProjectName: (projectName: string) => {
    dispatch(updateProjectNameAction(projectName));
  },
  setCosmosResourceAccountNameAvailability: (
    isAvailableObject: IAvailabilityFromExtension
  ) => {
    dispatch(setAccountAvailability(isAvailableObject));
  },
  setAppNameAvailability: (isAvailableObject: IAvailabilityFromExtension) => {
    dispatch(setAppNameAvailabilityAction(isAvailableObject));
  },
  setSiteNameAvailability: (isAvailableObject: IAvailabilityFromExtension) => {
    dispatch(setSiteNameAvailabilityAction(isAvailableObject));
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
  updateDependencyInfo: (dependencyInfo: IDependencyInfo) => {
    dispatch(updateDependencyInfoAction(dependencyInfo));
  },
  getBackendFrameworksSuccess: (frameworks: IOption[]) => {
    dispatch(getBackendFrameworksSuccess(frameworks));
  },
  getFrontendFrameworksSuccess: (frameworks: IOption[]) => {
    dispatch(getFrontendFrameworksSuccess(frameworks));
  },
  getPages: (pages: IOption[]) => {
    dispatch(getPagesOptionsAction(pages));
  },
  selectPages: (pages: ISelected[]) => {
    dispatch(selectPagesAction(pages));
  },
  updatePageCount: (pageCount: IPageCount) => {
    dispatch(updatePageCountAction(pageCount));
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
  selectedFrontend: state.selection.frontendFramework,
  frontendOptions: state.wizardContent.frontendOptions
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(App)
);
