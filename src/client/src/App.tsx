import * as React from "react";
import { connect } from "react-redux";
import { HashRouter as Router } from "react-router-dom";
import * as Redux from "redux";

import LeftSidebar from "./components/LeftSidebar";
import SelectFrameworks from "./components/SelectFrameworks";
import SelectPages from "./components/SelectPages";
import SelectWebApp from "./components/SelectWebApp";
import Welcome from "./components/Welcome";
import CosmosResourceModal from "./containers/CosmosResourceModal";
import Footer from "./containers/Footer";
import Header from "./containers/Header";
import RightSidebar from "./containers/RightSidebar";

import leftSidebarData from "./mockData/leftSidebarData";

import { getVSCodeApi } from "./actions/getVSCodeApi";
import { loadWizardContentAction } from "./actions/loadWizardContent";
import { logIntoAzureAction } from "./actions/logIntoAzure";
import appStyles from "./appStyles.module.css";
import AzureLogin from "./containers/AzureLogin";
import EngineAPIService from "./services/EngineAPIService";
import ReviewAndGenerate from "./containers/ReviewAndGenerate";


interface IDispatchProps {
  getVSCodeApi: () => void;
  loadWizardContent: () => void;
  logIntoAzure: (email: string) => void;
}

class App extends React.Component<IDispatchProps> {
  public static defaultProps = {
    getVSCodeApi: () => {},
    loadWizardContent: () => {},
    logIntoAzure: () => {},
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
            this.props.logIntoAzure(message.email);
          }
        return;
      }
    })
  }

  public render() {
    return (
      <Router>
        <div>
          <Header />
          <ReviewAndGenerate />
          {/*
          <div className={appStyles.container}>
            <CosmosResourceModal />
            <div className={appStyles.leftView}>
              <LeftSidebar sidebarItems={leftSidebarData} />
            </div>
            <div className={appStyles.centerView}>
              <Route path="/AzureLogin" component={AzureLogin} />
              <Route path="/SelectFrameworks" component={SelectFrameworks} />
              <Route path="/SelectPages" component={SelectPages} />
              <Route path="/SelectWebApp" component={SelectWebApp} />
              <Route exact={true} path="/" component={Welcome} />
            </div>
            <div className={appStyles.rightView}>
              <RightSidebar />
            </div>
          </div>
          */}
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
  logIntoAzure: (email: string) => {
    dispatch(logIntoAzureAction(email));
  },
});

export default connect(
  null,
  mapDispatchToProps
)(App);
