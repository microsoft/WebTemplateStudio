import classnames from "classnames";
import * as React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { Route, RouteComponentProps } from "react-router-dom";
import { ReactComponent as HomeSplashSVG } from "./assets/homeSplash.svg";
import { ReactComponent as SummarySplashSVG } from "./assets/summarySplash.svg";

import {
  EXTENSION_COMMANDS,
  ROUTES,
  DEVELOPMENT,
  FRAMEWORK_TYPE
} from "./utils/constants";

import { getVSCodeApi } from "./actions/vscodeApiActions/getVSCodeApi";
import { logIntoAzureAction } from "./actions/azureActions/logIntoAzure";
import {
  updateOutputPathAction
} from "./actions/wizardSelectionActions/updateProjectNameAndPath";

import { setValidations } from "./actions/wizardSelectionActions/setValidations";
import {
  updateTemplateGenerationStatusMessageAction,
  updateTemplateGenerationStatusAction
} from "./actions/wizardInfoActions/updateGenStatusActions";
import {
  selectPagesAction
} from "./actions/wizardSelectionActions/selectPages";
import { getVersionsDataAction } from "./actions/wizardInfoActions/getVersionData";

import appStyles from "./appStyles.module.css";
import { IVersions } from "./types/version";
import { getVSCodeApiSelector } from "./selectors/vscodeApiSelector";
import { IVSCodeObject } from "./reducers/vscodeApiReducer";
import { IServiceStatus } from "./reducers/generationStatus/genStatus";
import { ISelected } from "./types/selected";
import { AppState } from "./reducers";
import { IOption } from "./types/option";
import { setPreviewStatusAction } from "./actions/wizardContentActions/setPreviewStatus";
import { ThunkDispatch } from "redux-thunk";
import RootAction from "./actions/ActionType";
import { getPagesOptionsAction } from "./actions/wizardContentActions/getPagesOptions";
import { getPages, getFrameworks, getUserStatus, getTemplateInfo } from "./utils/extensionService/extensionService";

import { setBackendFrameworksAction } from "./actions/wizardContentActions/setBackendFrameworks";
import { setFrontendFrameworksAction } from "./actions/wizardContentActions/setFrontendFrameworks";
import { parseFrameworksPayload } from "./utils/parseFrameworksPayload";

import Loadable from "react-loadable";
import PageDetails from "./containers/PageDetails";
import { MODAL_TYPES } from "./actions/modalActions/typeKeys";
import RightSidebar from "./containers/RightSidebar";
import TopNavBar from "./components/TopNavBar";

const PageSelectFrameworks = Loadable({
  loader: () => import(/* webpackChunkName: "PageSelectFrameworks" */  "./containers/PageSelectFrameworks"),
  loading:() => <div/>
});
const PageAddPages = Loadable({
  loader: () => import(/* webpackChunkName: "PageAddPages" */  "./containers/PageAddPages"),
  loading:() => <div/>
});
const PageReviewAndGenerate = Loadable({
  loader: () => import(/* webpackChunkName: "PageReviewAndGenerate" */  "./containers/PageReviewAndGenerate"),
  loading:() => <div/>
});
const PageAzureLogin = Loadable({
  loader: () => import(/* webpackChunkName: "PageAzureLogin" */  "./containers/PageAzureLogin"),
  loading:() => <div/>
});
const PostGenerationModal = Loadable({
  loader: () => import(/* webpackChunkName: "PostGenerationModal" */  "./containers/PostGenerationModal"),
  loading:() => <div/>
});
const CosmosResourceModal = Loadable({
  loader: () => import(/* webpackChunkName: "CosmosResourceModal" */  "./containers/CosmosResourceModal"),
  loading:() => <div/>
});
const AppServiceModal = Loadable({
  loader: () => import(/* webpackChunkName: "AppServiceModal" */  "./containers/AppServiceModal"),
  loading:() => <div/>
});
const ViewLicensesModal = Loadable({
  loader: () => import(/* webpackChunkName: "ViewLicensesModal" */  "./containers/ViewLicensesModal"),
  loading:() => <div/>
});

if (process.env.NODE_ENV === DEVELOPMENT) {
  require("./css/themes.css");
}

interface IDispatchProps {
  updateOutputPath: (outputPath: string) => any;
  getVSCodeApi: () => void;
  logIntoAzure: (email: string, subscriptions: []) => void;
  setValidations: (validations: any) => void;
  updateTemplateGenStatusMessage: (status: string) => any;
  updateTemplateGenStatus: (isGenerated: IServiceStatus) => any;
  getVersionsData: (versions: IVersions) => any;
  getPages: (pages: IOption[]) => any;
  setPreviewStatus: (isPreview: boolean) => void;
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
  modalState: any;
}

type Props = IDispatchProps & IStateProps & RouteComponentProps;

const App = (props: Props) => {
  const { selectedFrontend, selectedBackend, vscode, selectedPages, setPages, frontendOptions,
    isPreview, setFrontendFrameworks, setBackendFrameworks, modalState, logIntoAzure } = props;
  const [isLoaded, setIsLoaded] = React.useState(false);
  const promisesLoading: Array<any> = new Array<any>();

  const addToPromisesList = (promise: Promise<any>)=>{
    promisesLoading.push(promise);
    return promise;
  }
  const Header = Loadable({
    loader: () => addToPromisesList(import(/* webpackChunkName: "Header" */  "./containers/Header")),
    loading:() => <div/>
  });
  
  const Footer = Loadable({
    loader: () => addToPromisesList(import(/* webpackChunkName: "Footer" */  "./containers/Footer")),
    loading:() => <div/>
  });
  const PageNewProject = Loadable({
    loader: () => addToPromisesList(import(/* webpackChunkName: "PageNewProject" */ "./containers/PageNewProject")),
    loading:() => <div/>
  });

  if (frontendOptions.length === 0){
    messageEventsFromExtension();
    getFrameworksListAndSetToStore();
  }

  Promise.all(promisesLoading).then(()=>{
    setIsLoaded(true);
  })

  React.useEffect(()=>{
    props.getVSCodeApi();
  },[]);

  React.useEffect(()=>{
    getUserStatus(vscode).then((event)=>{
      const message = event.data;
      if (message.payload !== null) {
        logIntoAzure(
          message.payload.email,
          message.payload.subscriptions
        );
      }
    });

    getTemplateInfo(vscode).then((event)=>{
      const message = event.data;
      const versionData: IVersions = {
        templatesVersion:message.payload.templatesVersion,
        wizardVersion: message.payload.wizardVersion
      };
      props.getVersionsData(versionData);
      props.setValidations({
        itemNameValidationConfig:message.payload.itemNameValidationConfig,
        projectNameValidationConfig:message.payload.projectNameValidationConfig
      });
      props.setPreviewStatus(message.payload.preview);
    });
  },[props.vscode]);

  React.useEffect(()=>{
    loadPages();
  },[selectedFrontend, selectedBackend]);

  function getFrameworksListAndSetToStore(){
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
        //only one way
        //from extension to client
        case EXTENSION_COMMANDS.GET_OUTPUT_PATH:
          if (message.payload !== null && message.payload.outputPath !== undefined) {
            props.updateOutputPath(message.payload.outputPath);
          }
          break;
        case EXTENSION_COMMANDS.GEN_STATUS_MESSAGE:
          props.updateTemplateGenStatusMessage(message.payload.status);
          break;
        case EXTENSION_COMMANDS.GEN_STATUS:
          props.updateTemplateGenStatus(message.payload);
          break;
      }
    });
  }

  const { pathname } = props.location;
  return (
    <React.Fragment>
      {isLoaded && (<Header />)}
      {isLoaded && (<TopNavBar />)}

      {isLoaded && (<div className={appStyles.container}>
        {(modalState.modalType === MODAL_TYPES.VIEW_LICENSES_MODAL) && (<ViewLicensesModal/>)}
        {(modalState.modalType === MODAL_TYPES.APP_SERVICE_MODAL) && (<AppServiceModal/>)}
        {(modalState.modalType === MODAL_TYPES.COSMOS_DB_MODAL) && (<CosmosResourceModal/>)}
        {(modalState.modalType === MODAL_TYPES.POST_GEN_MODAL) && (<PostGenerationModal/>)}

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
      </div>)}
      {isLoaded && (<Footer />)}
      {!isLoaded && (<div className={appStyles.spinnerContainer}></div>)}
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
  updateOutputPath: (outputPath: string) => {
    dispatch(updateOutputPathAction(outputPath));
  },
  setValidations: (validations: any) => {
    dispatch(setValidations(validations));
  },
  updateTemplateGenStatusMessage: (status: string) => {
    dispatch(updateTemplateGenerationStatusMessageAction(status));
  },
  updateTemplateGenStatus: (isGenerated: IServiceStatus) => {
    dispatch(updateTemplateGenerationStatusAction(isGenerated));
  },
  getPages: (pages: IOption[]) => {
    dispatch(getPagesOptionsAction(pages));
  },
  getVersionsData: (versions: IVersions) => {
    dispatch(getVersionsDataAction(versions));
  },
  setPreviewStatus: (isPreview: boolean) => {
    dispatch(setPreviewStatusAction(isPreview));
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
  isPreview:  state.wizardContent.previewStatus,
  modalState: state.modals.openModal
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(App)
);
