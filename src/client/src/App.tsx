import classnames from "classnames";
import * as React from "react";
import { connect, useDispatch } from "react-redux";
import { ReactComponent as HomeSplashSVG } from "./assets/homeSplash.svg";
import { ReactComponent as SummarySplashSVG } from "./assets/summarySplash.svg";

import {
  EXTENSION_COMMANDS,
  ROUTES,
  DEVELOPMENT
} from "./utils/constants";

import appStyles from "./appStyles.module.css";
import { AppState } from "./store/combineReducers";
import { IOption } from "./types/option";
import Loadable from "react-loadable";
import PageDetails from "./containers/PageDetails";
import { MODAL_TYPES } from "./store/modals/typeKeys";
import RightSidebar from "./containers/RightSidebar";
import TopNavBar from "./components/TopNavBar";
import { setOutputPathAction } from "./store/userSelection/app/action";
import { loadAction } from "./store/config/config/action";
import { logIntoAzureActionAction } from "./store/config/azure/action";
import { getUserStatus } from "./utils/extensionService/extensionService";
import { AppContext } from "./AppContext";

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
const GenerationModal = Loadable({
  loader: () => import(/* webpackChunkName: "GenerationModal" */  "./containers/GenerationModal"),
  loading:() => <div/>
});
const CosmosDbModal = Loadable({
  loader: () => import(/* webpackChunkName: "CosmosDbModal" */  "./containers/CosmosDbModal"),
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

interface IStateProps {
  frontendOptions: IOption[];
  modalState: any;
  selectedRoute: string;
}

type Props = IStateProps;

const App = (props: Props) => {
  const { frontendOptions,
    modalState, selectedRoute } = props;
  const [isLoaded, setIsLoaded] = React.useState(false);
  const promisesLoading: Array<any> = new Array<any>();
  const dispatch = useDispatch();

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
  const {vscode} = React.useContext(AppContext);
  
  if (frontendOptions.length === 0){
    messageEventsFromExtension();
  }

  Promise.all(promisesLoading).then(()=>{
    setIsLoaded(true);
  })

  React.useEffect(()=>{
    getUserStatus(vscode).then((event)=>{
      const message = event.data;
      if (message.payload !== null) {
        const azureProfile = message.payload as AzureProfile;
        dispatch(logIntoAzureActionAction(azureProfile))
      }
    });
    dispatch(loadAction());
  },[vscode]);

  function messageEventsFromExtension(){
    window.addEventListener("message", event => {
      const message = event.data;
      switch (message.command) {
        case EXTENSION_COMMANDS.GET_OUTPUT_PATH:
          if (message.payload !== null && message.payload.outputPath !== undefined) {
            dispatch(setOutputPathAction(message.payload.outputPath));
          }
          break;
      }
    });
  }

  return (
    <React.Fragment>
      {isLoaded && (<Header />)}
      {isLoaded && (<TopNavBar  />)}

      {isLoaded && (<div className={appStyles.container}>
        {(modalState.modalType === MODAL_TYPES.VIEW_LICENSES_MODAL) && (<ViewLicensesModal/>)}
        {(modalState.modalType === MODAL_TYPES.APP_SERVICE_MODAL) && (<AppServiceModal/>)}
        {(modalState.modalType === MODAL_TYPES.COSMOS_DB_MODAL) && (<CosmosDbModal/>)}
        {(modalState.modalType === MODAL_TYPES.GEN_MODAL) && (<GenerationModal/>)}

        <main
          className={classnames(appStyles.centerView, {
            [appStyles.centerViewNewProjectPage]:
              selectedRoute === ROUTES.NEW_PROJECT,
            [appStyles.centerViewMaxHeight]: selectedRoute === ROUTES.PAGE_DETAILS,
            [appStyles.centerViewAzurePage]: selectedRoute === ROUTES.AZURE_LOGIN
          })}
        >
          {selectedRoute === ROUTES.NEW_PROJECT ? (
            <HomeSplashSVG
             className={classnames(appStyles.splash, appStyles.homeSplash)}
            />
          ) : null}

          {selectedRoute === ROUTES.REVIEW_AND_GENERATE ? (
            <SummarySplashSVG
              className={classnames(
                appStyles.splash,
                appStyles.summarySplash
              )}
            />
          ) : null}

          {(selectedRoute === ROUTES.PAGE_DETAILS) && (<PageDetails />)}
          {(selectedRoute === ROUTES.AZURE_LOGIN) && (<PageAzureLogin/>)}
          {(selectedRoute === ROUTES.REVIEW_AND_GENERATE) && (<PageReviewAndGenerate />)}
          {(selectedRoute === ROUTES.SELECT_FRAMEWORKS) && (<PageSelectFrameworks/>)}
          {(selectedRoute === ROUTES.SELECT_PAGES) && (<PageAddPages isModal={false}/>)}
          {(selectedRoute === ROUTES.NEW_PROJECT) && (<PageNewProject/>)}

        </main>
        <RightSidebar />
      </div>)}
      {isLoaded && (<Footer />)}
      {!isLoaded && (<div className={appStyles.spinnerContainer}></div>)}
    </React.Fragment>
  );
}

const mapStateToProps = (state: AppState): IStateProps => ({
  frontendOptions: state.templates.frontendOptions,
  modalState: state.modals.openModal,
  selectedRoute : state.wizardRoutes.selected,
});

export default
  connect(
    mapStateToProps
  )(App);