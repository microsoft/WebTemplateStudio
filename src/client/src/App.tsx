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
import { ROUTES } from "./utils/constants";

import { getVSCodeApi } from "./actions/getVSCodeApi";
import { loadWizardContentAction } from "./actions/loadWizardContent";
import { logIntoAzureAction } from "./actions/logIntoAzure";
import { updateOutputPathAction } from "./actions/updateProjectNameAndPath";
import appStyles from "./appStyles.module.css";
import AzureLogin from "./containers/AzureLogin";
import EngineAPIService from "./services/EngineAPIService";
import { getSubscriptionData } from "./actions/subscriptionData";

interface IDispatchProps {
  updateOutputPath: (outputPath: string) => any;
  getVSCodeApi: () => void;
  loadWizardContent: () => void;
  logIntoAzure: (email: string, subscriptions: []) => void;
  saveSubscriptionData: (subscriptionData: any) => void;
}

type Props = IDispatchProps;

class App extends React.Component<Props> {
  public static defaultProps = {
    getVSCodeApi: () => { },
    loadWizardContent: () => { },
    logIntoAzure: () => { },
    saveSubscriptionData: () => { },
    updateOutputPath: () => {}
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
          if (message.outputPath != null) {
            this.props.updateOutputPath(
              message.outputPath.substring(1, message.outputPath.length)
            );
          }
          return;
        case "login":
          // email will be null or undefined if login didn't work correctly
          if (message.email != null) {
            this.props.logIntoAzure(message.email, message.subscriptions);
          }
          return;
        case "subscriptionData":
          // Expect resource groups and locations on this request

          // Receive resource groups and locations
          // and update redux (resourceGroups, locations)
          this.props.saveSubscriptionData({ locations: message.locations, resourceGroups: message.resourceGroups });
          return;

        case "nameFunction":
          // Receive input validation
          // and update redux (boolean, string)
          return;
      }
    });
  }

  public render() {
    return (
      <Router>
        <div>
          <Header />
          {/*<ReviewAndGenerate />*/}
          <div className={appStyles.container}>
            <CosmosResourceModal />
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
    dispatch(getSubscriptionData(subscriptionData))
  },
  updateOutputPath: (outputPath: string) => {
    dispatch(updateOutputPathAction(outputPath));
  }
});

export default connect(
  null,
  mapDispatchToProps
)(App);
