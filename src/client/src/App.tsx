import classnames from "classnames";
import * as React from "react";
import { connect, useDispatch } from "react-redux";
import { ReactComponent as SummarySplashSVG } from "./assets/summarySplash.svg";
import { ReactComponent as HomeSplashSVG } from "./assets/homeSplash.svg";
import {
  DEVELOPMENT
} from "./utils/constants/constants";

import { ROUTES } from "./utils/constants/routes";

import appStyles from "./appStyles.module.css";
import { AppState } from "./store/combineReducers";
import { IOption } from "./types/option";
import PageDetails from "./containers/PageDetails";
import { NAVIGATION_MODAL_TYPES } from "./store/navigation/typeKeys";
import RightSidebar from "./containers/RightSidebar";
import TopNavBar from "./components/TopNavBar";
import { setOutputPathAction } from "./store/userSelection/app/action";
import { loadAction } from "./store/config/config/action";
import loadable from '@loadable/component'
import { EXTENSION_COMMANDS } from "./utils/constants/commands";

const PageSelectFrameworks = loadable(()=> import(/* webpackChunkName: "PageSelectFrameworks" */  "./containers/PageSelectFrameworks"));
const PageAddPages = loadable(()=> import(/* webpackChunkName: "PageAddPages" */  "./containers/PageAddPages"));
const PageReviewAndGenerate = loadable(() => import(/* webpackChunkName: "PageReviewAndGenerate" */  "./containers/PageReviewAndGenerate"));
const PageAddServices = loadable(() => import(/* webpackChunkName: "PageAddServices" */  "./containers/PageAddServices"));
const GenerationModal = loadable(() => import(/* webpackChunkName: "GenerationModal" */  "./containers/GenerationModal"));
const CosmosDbModal = loadable(() => import(/* webpackChunkName: "CosmosDbModal" */  "./containers/CosmosDbModal"));
const AppServiceModal = loadable(() => import(/* webpackChunkName: "AppServiceModal" */  "./containers/AppServiceModal"));
const ViewLicensesModal = loadable(() => import(/* webpackChunkName: "ViewLicensesModal" */  "./containers/ViewLicensesModal"));
const AzureLoginModal = loadable(() => import(/* webpackChunkName: "AzureLoginModal" */  "./containers/AzureLoginModal"));

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
  const { modalState, selectedRoute } = props;
  const dispatch = useDispatch();

  const Header = loadable(() => import(/* webpackChunkName: "Header" */  "./containers/Header"));
  const Footer = loadable(() => import(/* webpackChunkName: "Footer" */  "./containers/Footer"));
  const PageNewProject = loadable(() => import(/* webpackChunkName: "PageNewProject" */ "./containers/PageNewProject"));

  React.useEffect(()=>{
    dispatch(loadAction());
    messageEventsFromExtension();
  },[]);

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
      <Header />
      <TopNavBar  />

      <div className={appStyles.container}>
        {(modalState.modalType === NAVIGATION_MODAL_TYPES.VIEW_LICENSES_MODAL) && (<ViewLicensesModal/>)}
        {(modalState.modalType === NAVIGATION_MODAL_TYPES.APP_SERVICE_MODAL) && (<AppServiceModal/>)}
        {(modalState.modalType === NAVIGATION_MODAL_TYPES.COSMOS_DB_MODAL) && (<CosmosDbModal/>)}
        {(modalState.modalType === NAVIGATION_MODAL_TYPES.AZURE_LOGIN_MODAL) && (<AzureLoginModal/>)}
        {(modalState.modalType === NAVIGATION_MODAL_TYPES.GEN_MODAL) && (<GenerationModal/>)}

        <main
          className={classnames(appStyles.centerView, {
            [appStyles.centerViewNewProjectPage]:
              selectedRoute === ROUTES.NEW_PROJECT,
            [appStyles.centerViewMaxHeight]: selectedRoute === ROUTES.PAGE_DETAILS,
            [appStyles.centerViewAzurePage]: selectedRoute === ROUTES.ADD_SERVICES
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
          {(selectedRoute === ROUTES.ADD_SERVICES) && (<PageAddServices/>)}
          {(selectedRoute === ROUTES.REVIEW_AND_GENERATE) && (<PageReviewAndGenerate />)}
          {(selectedRoute === ROUTES.SELECT_FRAMEWORKS) && (<PageSelectFrameworks/>)}
          {(selectedRoute === ROUTES.SELECT_PAGES) && (<PageAddPages isModal={false}/>)}
          {(selectedRoute === ROUTES.NEW_PROJECT) && (<PageNewProject/>)}

        </main>
        <RightSidebar />
      </div>
      <Footer />
    </React.Fragment>
  );
}

const mapStateToProps = (state: AppState): IStateProps => ({
  frontendOptions: state.templates.frontendOptions,
  modalState: state.navigation.modals.openModal,
  selectedRoute : state.navigation.routes.selected,
});

export default
  connect(
    mapStateToProps
  )(App);