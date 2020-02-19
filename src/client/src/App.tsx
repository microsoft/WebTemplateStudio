import classnames from "classnames";
import * as React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { Route, RouteComponentProps } from "react-router-dom";

import PageDetails from "./containers/PageDetails";
import PageAddPages from "./containers/PageAddPages";
import PageNewProject from "./containers/PageNewProject";
import CosmosResourceModal from "./containers/CosmosResourceModal";
import Footer from "./containers/Footer";
import Header from "./containers/Header";
import PageReviewAndGenerate from "./containers/PageReviewAndGenerate";
import RightSidebar from "./containers/RightSidebar";
import RedirectModal from "./containers/RedirectModal";
import ViewLicensesModal from "./containers/ViewLicensesModal";

import { ReactComponent as HomeSplashSVG } from "./assets/homeSplash.svg";
import { ReactComponent as SummarySplashSVG } from "./assets/summarySplash.svg";

import {
  EXTENSION_COMMANDS,
  EXTENSION_MODULES,
  ROUTES,
  DEVELOPMENT,
  BOOTSTRAP_LICENSE,
  FRAMEWORK_TYPE
} from "./utils/constants";

import { getVSCodeApi } from "./actions/vscodeApiActions/getVSCodeApi";
import { logIntoAzureAction } from "./actions/azureActions/logIntoAzure";
import {
  updateOutputPathAction
} from "./actions/wizardSelectionActions/updateProjectNameAndPath";
import {
  setAccountAvailability,
  setAppNameAvailabilityAction,
  setSiteNameAvailabilityAction,
  IAvailabilityFromExtension
} from "./actions/azureActions/setAccountAvailability";
import PageAzureLogin from "./containers/PageAzureLogin";
import { getSubscriptionData } from "./actions/azureActions/subscriptionData";
import { setValidations } from "./actions/wizardSelectionActions/setValidations";
import {
  updateTemplateGenerationStatusMessageAction,
  updateTemplateGenerationStatusAction
} from "./actions/wizardInfoActions/updateGenStatusActions";
import {
  selectPagesAction
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
import { IVSCodeObject } from "./reducers/vscodeApiReducer";
import { setAzureValidationStatusAction } from "./actions/azureActions/setAzureValidationStatusAction";
import { IServiceStatus } from "./reducers/generationStatus/genStatus";
import { resetPagesAction } from "./actions/wizardSelectionActions/selectPages";
import { ISelected } from "./types/selected";
import { AppState } from "./reducers";
import { IOption } from "./types/option";
import { setPreviewStatusAction } from "./actions/wizardContentActions/setPreviewStatus";
import { setPortAction } from "./actions/wizardContentActions/setPort";
import { ThunkDispatch } from "redux-thunk";
import RootAction from "./actions/ActionType";
import TopNavBar from "./components/TopNavBar";
import { getPagesOptionsAction } from "./actions/wizardContentActions/getPagesOptions";
import PageSelectFrameworks from './containers/PageSelectFrameworks';
import { getPages, getFrameworks } from "./utils/extensionService/extensionService";
import AppServiceModal from "./containers/AppServiceModal";
import PostGenerationModal from "./containers/PostGenerationModal";
import { setBackendFrameworksAction } from "./actions/wizardContentActions/setBackendFrameworks";
import { setFrontendFrameworksAction } from "./actions/wizardContentActions/setFrontendFrameworks";
import { parseFrameworksPayload } from "./utils/parseFrameworksPayload";

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
  setSiteNameAvailability: (
    isAvailableObject: IAvailabilityFromExtension
  ) => any;
  setValidations: (validations: any) => void;
  setAzureValidationStatus: (status: boolean) => void;
  updateTemplateGenStatusMessage: (status: string) => any;
  updateTemplateGenStatus: (isGenerated: IServiceStatus) => any;
  getVersionsData: (versions: IVersions) => any;
  updateDependencyInfo: (dependencyInfo: IDependencyInfo) => any;
  getPages: (pages: IOption[]) => any;
  selectPages: (pages: ISelected[]) => void;
  resetPageSelection: () => any;
  setPreviewStatus: (isPreview: boolean) => void;
  setPort: (port: number) => void;
  setPages: (pages: ISelected[]) => void;
  setBackendFrameworks: (frameworks: IOption[]) => any;
  setFrontendFrameworks: (frameworks: IOption[]) => any;
}

interface IStateProps {
  vscode: IVSCodeObject;
  frontendOptions: IOption[];
  selectedFrontend: ISelected;
  selectedBackend: ISelected;
  selectedPages: ISelected[];
  isPreview: boolean;
}

type Props = IDispatchProps & IStateProps & RouteComponentProps;

const App = (props: Props) => {
  const { selectedFrontend, selectedBackend, vscode, selectedPages, setPages, isPreview, setFrontendFrameworks, setBackendFrameworks } = props;

  React.useEffect(()=>{
    props.getVSCodeApi();
  },[]);

  React.useEffect(()=>{
      const { vscode } = props;
        vscode.postMessage({
          module: EXTENSION_MODULES.AZURE,
          command: EXTENSION_COMMANDS.GET_USER_STATUS,
          track: true
        });
      messageEventsFromExtension();
      getFrameworksListAndSetToStore();
  },[props.vscode]);

  React.useEffect(()=>{
    loadPages();
  },[selectedFrontend, selectedBackend]);

  const getFrameworksListAndSetToStore = ()=>{
    getFrameworks(vscode, isPreview).then((event: any)=>{
      const message = event.data;
      setFrontendFrameworks(
        parseFrameworksPayload(
          message.payload.frameworks,
          FRAMEWORK_TYPE.FRONTEND,
          message.payload.isPreview
        )
      );
      setBackendFrameworks(
        parseFrameworksPayload(
          message.payload.frameworks,
          FRAMEWORK_TYPE.BACKEND,
          message.payload.isPreview
        )
      );
    });
  }

  const loadPages = () => {
    getPages(vscode, selectedFrontend.internalName, selectedBackend.internalName).then((event)=>{
      props.getPages(event.data.payload.pages);
      selectedPages.map((selectedPage)=>{
        selectedPage.internalName = `wts.Page.${selectedFrontend.internalName}.${selectedPage.defaultName ? selectedPage.defaultName.replace(" ",""):""}`;
      });
      setPages(selectedPages);
    });
  }

  function messageEventsFromExtension(){
    window.addEventListener("message", event => {
      const message = event.data;
      switch (message.command) {
        case EXTENSION_COMMANDS.GET_DEPENDENCY_INFO:
          props.updateDependencyInfo(message.payload);
          break;
        case EXTENSION_COMMANDS.GET_OUTPUT_PATH:
          if (message.payload != null && message.payload.outputPath != null) {
            props.updateOutputPath(message.payload.outputPath);
          }
          break;
        case EXTENSION_COMMANDS.GET_USER_STATUS:
        case EXTENSION_COMMANDS.AZURE_LOGIN:
          // email will be null or undefined if login didn't work correctly
          if (message.payload != null) {
            props.logIntoAzure(
              message.payload.email,
              message.payload.subscriptions
            );
          }
          break;
        case EXTENSION_COMMANDS.AZURE_LOGOUT:
          // Update UI only if user sign out is confirmed by the extension
          if (message.payload) {
            props.startLogOutToAzure();
          }
          break;
        case EXTENSION_COMMANDS.SUBSCRIPTION_DATA_FUNCTIONS:
        case EXTENSION_COMMANDS.SUBSCRIPTION_DATA_COSMOS:
        case EXTENSION_COMMANDS.SUBSCRIPTION_DATA_APP_SERVICE:
          // Expect resource groups and locations on this request
          // Receive resource groups and locations
          // and update redux (resourceGroups, locations)
          if (message.payload != null) {
            props.saveSubscriptionData({
              locations: message.payload.locations,
              resourceGroups: message.payload.resourceGroups,
              validName: message.payload.validName
            });
          }
          break;
        case EXTENSION_COMMANDS.NAME_COSMOS:
          // Receive input validation
          // and update redux (boolean, string)
          props.setCosmosResourceAccountNameAvailability({
            isAvailable: message.payload.isAvailable,
            message: message.payload.reason
          });
          props.setAzureValidationStatus(false);
          break;
        case EXTENSION_COMMANDS.NAME_FUNCTIONS:
          props.setAppNameAvailability({
            isAvailable: message.payload.isAvailable,
            message: message.payload.reason
          });
          props.setAzureValidationStatus(false);
          break;
        case EXTENSION_COMMANDS.NAME_APP_SERVICE:
          props.setSiteNameAvailability({
            isAvailable: message.payload.isAvailable,
            message: message.payload.reason
          });
          props.setAzureValidationStatus(false);
          break;
        case EXTENSION_COMMANDS.GEN_STATUS_MESSAGE:
          props.updateTemplateGenStatusMessage(message.payload.status);
          break;
        case EXTENSION_COMMANDS.GEN_STATUS:
          props.updateTemplateGenStatus(message.payload);
          break;
        case EXTENSION_COMMANDS.GET_TEMPLATE_INFO:
          const versionData: IVersions = {
            templatesVersion:message.payload.templatesVersion,
            wizardVersion: message.payload.wizardVersion
          };
          props.getVersionsData(versionData);
          props.setValidations({
            itemNameValidationConfig:message.payload.itemNameValidationConfig,
            projectNameValidationConfig:message.payload.projectNameValidationConfig
          });
          break;
        case EXTENSION_COMMANDS.RESET_PAGES:
          if (message.payload.resetPages) {
            props.resetPageSelection();
            
            // select default blank page
            const PAGES_SELECTION: ISelected[] = [
              {
                title: "Blank",
                internalName: `wts.Page.${message.payload.internalName}.Blank`,
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
            props.selectPages(PAGES_SELECTION);
          }
          break;
        case EXTENSION_COMMANDS.GET_PREVIEW_STATUS:
          props.setPreviewStatus(message.payload.preview);
          break;
      }
    });
  }

  const { pathname } = props.location;
  return (
    <React.Fragment>
      <Header />
      <TopNavBar />

      <div className={appStyles.container}>
        <RedirectModal />
        <ViewLicensesModal />
        <AppServiceModal/>
        <CosmosResourceModal/>
        <PostGenerationModal/>

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
          <Route path={ROUTES.AZURE_LOGIN} component={PageAzureLogin} />
          <Route
            path={ROUTES.REVIEW_AND_GENERATE}
            component={PageReviewAndGenerate}
          />
          <Route
            path={ROUTES.SELECT_FRAMEWORKS}
            component={PageSelectFrameworks}
          />
          <Route path={ROUTES.SELECT_PAGES} component={PageAddPages} />
          <Route
            exact={true}
            path={ROUTES.NEW_PROJECT}
            component={PageNewProject}
          />
        </main>
        <RightSidebar />
      </div>
      <Footer />
    </React.Fragment>
  );
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
  setValidations: (validations: any) => {
    dispatch(setValidations(validations));
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
  getPages: (pages: IOption[]) => {
    dispatch(getPagesOptionsAction(pages));
  },
  selectPages: (pages: ISelected[]) => {
    dispatch(selectPagesAction(pages));
  },
  getVersionsData: (versions: IVersions) => {
    dispatch(getVersionsDataAction(versions));
  },
  resetPageSelection: () => {
    dispatch(resetPagesAction());
  },
  setPreviewStatus: (isPreview: boolean) => {
    dispatch(setPreviewStatusAction(isPreview));
  },
  setPort: (port: number) => {
    dispatch(setPortAction(port));
  },
  setPages: (pages: ISelected[]) => {
    dispatch(selectPagesAction(pages));
  },
  setBackendFrameworks: (frameworks: IOption[]) => {
    dispatch(setBackendFrameworksAction(frameworks));
  },
  setFrontendFrameworks: (frameworks: IOption[]) => {
    dispatch(setFrontendFrameworksAction(frameworks));
  }
});

const mapStateToProps = (state: AppState): IStateProps => ({
  vscode: getVSCodeApiSelector(state),
  selectedFrontend: state.selection.frontendFramework,
  selectedBackend: state.selection.backendFramework,
  frontendOptions: state.wizardContent.frontendOptions,
  selectedPages: state.selection.pages,
  isPreview:  state.wizardContent.previewStatus
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(App)
);
