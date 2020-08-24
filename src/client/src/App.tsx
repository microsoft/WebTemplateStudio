import classnames from "classnames";
import * as React from "react";
import { connect, useDispatch } from "react-redux";
import { ReactComponent as SummarySplashSVG } from "./assets/summarySplash.svg";
import { ReactComponent as HomeSplashSVG } from "./assets/homeSplash.svg";
import { DEVELOPMENT } from "./utils/constants/constants";
import appStyles from "./appStyles.module.css";
import { AppState } from "./store/combineReducers";
import { IOption } from "./types/option";
import PageDetails from "./pages/PageDetails";
import { NAVIGATION_MODAL_TYPES } from "./store/navigation/typeKeys";
import RightSidebar from "./components/RightSidebar";
import TopNavBar from "./components/TopNavBar";
import { setOutputPathAction } from "./store/userSelection/app/action";
import { loadAction } from "./store/config/config/action";
import loadable from '@loadable/component'
import { EXTENSION_COMMANDS } from "./utils/constants/commands";
import { ROUTE } from "./utils/constants/routes";
import { getSelectedRoute } from "./store/userSelection/app/wizardSelectionSelector/wizardSelectionSelector";

const PageSelectFrameworks = loadable(()=> import(/* webpackChunkName: "PageSelectFrameworks" */  "./pages/PageSelectFrameworks"));
const PageAddPages = loadable(()=> import(/* webpackChunkName: "PageAddPages" */  "./pages/PageAddPages"));
const PageReviewAndGenerate = loadable(() => import(/* webpackChunkName: "PageReviewAndGenerate" */  "./pages/PageReviewAndGenerate"));
const PageAddServices = loadable(() => import(/* webpackChunkName: "PageAddServices" */  "./pages/PageAddServices"));
const GenerationModal = loadable(() => import(/* webpackChunkName: "GenerationModal" */  "./modals/GenerationModal"));
const CosmosDbModal = loadable(() => import(/* webpackChunkName: "CosmosDbModal" */  "./modals/CosmosDbModal"));
const AppServiceModal = loadable(() => import(/* webpackChunkName: "AppServiceModal" */  "./modals/AppServiceModal"));
const ViewLicensesModal = loadable(() => import(/* webpackChunkName: "ViewLicensesModal" */  "./modals/ViewLicensesModal"));
const AzureLoginModal = loadable(() => import(/* webpackChunkName: "AzureLoginModal" */  "./modals/AzureLoginModal"));

if (process.env.NODE_ENV === DEVELOPMENT) {
  require("./css/themes.css");
}

interface IStateProps {
  frontendOptions: IOption[];
  modalState: any;
  selectedRoute: string;
  isDetailPageVisible: boolean;
}

type Props = IStateProps;

const App = (props: Props) => {
  const { modalState, selectedRoute, isDetailPageVisible } = props;
  const dispatch = useDispatch();

  const Header = loadable(() => import(/* webpackChunkName: "Header" */  "./components/Header"));
  const Footer = loadable(() => import(/* webpackChunkName: "Footer" */  "./components/Footer"));
  const PageNewProject = loadable(() => import(/* webpackChunkName: "PageNewProject" */ "./pages/PageNewProject"));
  
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
              selectedRoute === ROUTE.NEW_PROJECT,
            [appStyles.centerViewMaxHeight]: selectedRoute === ROUTE.PAGE_DETAILS,
            [appStyles.centerViewAzurePage]: selectedRoute === ROUTE.ADD_SERVICES
          })}
        >
           {selectedRoute === ROUTE.NEW_PROJECT ? (
            <HomeSplashSVG
             className={classnames(appStyles.splash, appStyles.homeSplash)}
            />
          ) : null}

          {selectedRoute === ROUTE.REVIEW_AND_GENERATE ? (
            <SummarySplashSVG
              className={classnames(
                appStyles.splash,
                appStyles.summarySplash
              )}
            />
          ) : null}

          {isDetailPageVisible && (<PageDetails />)}
          {(!isDetailPageVisible && selectedRoute === ROUTE.ADD_SERVICES) && (<PageAddServices/>)}
          {(!isDetailPageVisible && selectedRoute === ROUTE.REVIEW_AND_GENERATE) && (<PageReviewAndGenerate />)}
          {(!isDetailPageVisible && selectedRoute === ROUTE.SELECT_FRAMEWORKS) && (<PageSelectFrameworks/>)}
          {(!isDetailPageVisible && selectedRoute === ROUTE.ADD_PAGES) && (<PageAddPages isModal={false}/>)}
          {(!isDetailPageVisible && selectedRoute === ROUTE.NEW_PROJECT) && (<PageNewProject/>)}

        </main>
        <RightSidebar />
      </div>
      {!isDetailPageVisible && (<Footer />)}
    </React.Fragment>
  );
}

const mapStateToProps = (state: AppState): IStateProps => ({
  frontendOptions: state.templates.frontendOptions,
  modalState: state.navigation.modals.openModal,
  selectedRoute : getSelectedRoute(state),
  isDetailPageVisible: state.config.detailsPage.data.title !== ""
});

export default
  connect(
    mapStateToProps
  )(App);