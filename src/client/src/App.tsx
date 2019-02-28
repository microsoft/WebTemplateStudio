import * as React from "react";
import { connect } from "react-redux";
import { HashRouter as Router, Route } from "react-router-dom";
import * as Redux from "redux";

import LeftSidebar from "./components/LeftSidebar";
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
import appStyles from "./appStyles.module.css";
import AzureLogin from "./containers/AzureLogin";
import EngineAPIService from "./services/EngineAPIService";
import { getSubscriptionData } from "./actions/subscriptionData";


interface IDispatchProps {
  getVSCodeApi: () => void;
  loadWizardContent: () => void;
  logIntoAzure: (email: string, subscriptions: []) => void;
  saveSubscriptions: (subscriptionData: any) => void;
}

type Props = IDispatchProps

class App extends React.Component<Props> {
  public static defaultProps = {
    getVSCodeApi: () => { },
    loadWizardContent: () => { },
    logIntoAzure: () => { },
    saveSubscriptions: () => { },
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
          this.props.saveSubscriptions({ locations: message.locations, resourceGroups: message.resourceGroups });
          return;

        case "nameFunction":
          // Receive input validation
          // and update redux (boolean, string)
          return;
      }
    })
  }

  public render() {
    return (
      <Router>
        <div>
          <Header />
          {/*<ReviewAndGenerate />*/}
          <div className={appStyles.container}>
            <CosmosResourceModal />
            <div className={appStyles.leftView}>
              <LeftSidebar sidebarItems={leftSidebarData} />
            </div>
            <div className={appStyles.centerView}>
              <Route path={ROUTES.AZURE_LOGIN} component={AzureLogin} />
              <Route path={ROUTES.REVIEW_AND_GENERATE} component={ReviewAndGenerate} />
              <Route path={ROUTES.SELECT_FRAMEWORKS} component={SelectFrameworks} />
              <Route path={ROUTES.SELECT_PAGES} component={SelectPages} />
              <Route path={ROUTES.SELECT_PROJECT_TYPE} component={SelectWebApp} />
              <Route exact={true} path="/" component={Welcome} />
            </div>
            <div className={appStyles.rightView}>
              <RightSidebar />
            </div>
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
  saveSubscriptions: (subscriptionData: any) => {
    dispatch(getSubscriptionData(subscriptionData));
  }
});

export default connect(
  null,
  mapDispatchToProps
)(App);
