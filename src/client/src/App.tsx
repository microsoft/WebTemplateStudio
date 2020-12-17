import classnames from "classnames";
import * as React from "react";
import { connect, useDispatch } from "react-redux";
import { ReactComponent as SummarySplashSVG } from "./assets/summarySplash.svg";
import { ReactComponent as HomeSplashSVG } from "./assets/homeSplash.svg";
import { ENVIRONMENT, ROUTE } from "./utils/constants/constants";
import appStyles from "./appStyles.module.css";
import { AppState } from "./store/combineReducers";
import { IOption } from "./types/option";
import DetailsPage from "./pages/DetailsPage";
import { NAVIGATION_MODAL_TYPES } from "./store/navigation/typeKeys";
import RightSidebar from "./components/RightSidebar";
import TopNavBar from "./components/TopNavBar";
import { loadAction } from "./store/config/config/action";
import loadable from "@loadable/component";
import { getSelectedRoute } from "./store/userSelection/app/wizardSelectionSelector/wizardSelectionSelector";

const SelectFrameworksPage = loadable(
  () => import(/* webpackChunkName: "SelectFrameworksPage" */ "./pages/SelectFrameworksPage")
);
const SelectProjectTypePage = loadable(
  () => import(/* webpackChunkName: "SelectProjectTypePage" */ "./pages/SelectProjectTypePage")
);
const AddPagesPage = loadable(() => import(/* webpackChunkName: "AddPagesPage" */ "./pages/AddPagesPage"));
const ReviewAndGeneratePage = loadable(
  () => import(/* webpackChunkName: "ReviewAndGeneratePage" */ "./pages/ReviewAndGeneratePage")
);
const AddServicesPage = loadable(() => import(/* webpackChunkName: "AddServicesPage" */ "./pages/AddServicesPage"));
const GenerationModal = loadable(() => import(/* webpackChunkName: "GenerationModal" */ "./modals/GenerationModal"));
const CosmosDbModal = loadable(() => import(/* webpackChunkName: "CosmosDbModal" */ "./modals/CosmosDbModal"));
const AppServiceModal = loadable(() => import(/* webpackChunkName: "AppServiceModal" */ "./modals/AppServiceModal"));
const ViewLicensesModal = loadable(
  () => import(/* webpackChunkName: "ViewLicensesModal" */ "./modals/ViewLicensesModal")
);
const AzureServicesModal = loadable(
  () => import(/* webpackChunkName: "AzureServicesModal" */ "./modals/AzureServicesModal")
);
const ViewPlatformRequirementsModal = loadable(
  () => import(/* webpackChunkName: "ViewPlatformRequirementsModal" */ "./modals/ViewPlatformRequirementsModal")
);

if (process.env.NODE_ENV === ENVIRONMENT.DEVELOPMENT) {
  require("./css/mockThemes.css");
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

  const Header = loadable(() => import(/* webpackChunkName: "Header" */ "./components/Header"));
  const Footer = loadable(() => import(/* webpackChunkName: "Footer" */ "./components/Footer"));
  const NewProjectPage = loadable(() => import(/* webpackChunkName: "NewProjectPage" */ "./pages/NewProjectPage"));

  React.useEffect(() => {
    dispatch(loadAction());
  }, []);

  return (
    <React.Fragment>
      <Header />
      <TopNavBar />
      <div className={appStyles.container}>
        {modalState.modalType === NAVIGATION_MODAL_TYPES.VIEW_LICENSES_MODAL && <ViewLicensesModal />}
        {modalState.modalType === NAVIGATION_MODAL_TYPES.APP_SERVICE_MODAL && <AppServiceModal />}
        {modalState.modalType === NAVIGATION_MODAL_TYPES.COSMOS_DB_MODAL && <CosmosDbModal />}
        {modalState.modalType === NAVIGATION_MODAL_TYPES.AZURE_LOGIN_MODAL && <AzureServicesModal />}
        {modalState.modalType === NAVIGATION_MODAL_TYPES.GEN_MODAL && <GenerationModal />}
        {modalState.modalType === NAVIGATION_MODAL_TYPES.VIEW_PLATFORM_REQUIREMENTS_MODAL && <ViewPlatformRequirementsModal />}

        <main
          className={classnames(appStyles.centerView, {
            [appStyles.centerViewNewProjectPage]: selectedRoute === ROUTE.NEW_PROJECT,
            [appStyles.centerViewMaxHeight]: selectedRoute === ROUTE.PAGE_DETAILS,
            [appStyles.centerViewAzurePage]: selectedRoute === ROUTE.ADD_SERVICES,
          })}
        >
          {selectedRoute === ROUTE.NEW_PROJECT ? (
            <HomeSplashSVG className={classnames(appStyles.splash, appStyles.homeSplash)} />
          ) : null}

          {selectedRoute === ROUTE.REVIEW_AND_GENERATE ? (
            <SummarySplashSVG className={classnames(appStyles.splash, appStyles.summarySplash)} />
          ) : null}

          {isDetailPageVisible && <DetailsPage />}
          {!isDetailPageVisible && selectedRoute === ROUTE.SELECT_PROJECT_TYPE && <SelectProjectTypePage />}
          {!isDetailPageVisible && selectedRoute === ROUTE.ADD_PAGES && <AddPagesPage isModal={false} />}
          {!isDetailPageVisible && selectedRoute === ROUTE.SELECT_FRAMEWORKS && <SelectFrameworksPage />}
          {!isDetailPageVisible && selectedRoute === ROUTE.ADD_SERVICES && <AddServicesPage />}
          {!isDetailPageVisible && selectedRoute === ROUTE.REVIEW_AND_GENERATE && <ReviewAndGeneratePage />}
          {!isDetailPageVisible && selectedRoute === ROUTE.NEW_PROJECT && <NewProjectPage />}
        </main>
        <RightSidebar />
      </div>
      {!isDetailPageVisible && <Footer />}
    </React.Fragment>
  );
};

const mapStateToProps = (state: AppState): IStateProps => ({
  frontendOptions: state.templates.frontendOptions,
  modalState: state.navigation.modals.openModal,
  selectedRoute: getSelectedRoute(state),
  isDetailPageVisible: state.config.detailsPage.data.title !== "",
});

export default connect(mapStateToProps)(App);
