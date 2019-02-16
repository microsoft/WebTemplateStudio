import * as React from "react";
import { connect } from "react-redux";
import { HashRouter as Router, Route } from "react-router-dom";
import * as Redux from "redux";

import Header from "./components/Header";
import LeftSidebar from "./components/LeftSidebar";
import SelectFrameworks from "./components/SelectFrameworks";
import SelectPages from "./components/SelectPages";
import SelectWebApp from "./components/SelectWebApp";
import Welcome from "./components/Welcome";
import Footer from "./containers/Footer";
import RightSidebar from "./containers/RightSidebar";
import leftSidebarData from "./mockData/leftSidebarData";

import { getVSCodeApi } from "./actions/getVSCodeApi";
import { loadWizardContentAction } from "./actions/loadWizardContent";

import appStyles from "./appStyles.module.css";
import AzureLogin from "./containers/AzureLogin";

interface IDispatchProps {
  getVSCodeApi: () => void;
  loadWizardContent: () => void;
}

class App extends React.Component<IDispatchProps> {
  public static defaultProps = {
    getVSCodeApi: () => {},
    loadWizardContent: () => {},
  };

  public componentDidMount() {
    this.props.getVSCodeApi();
    this.props.loadWizardContent();
  }

  public render() {
    return (
      <Router>
        <div>
          <Header />
          <div className={appStyles.container}>
            <div className={appStyles.leftView}>
              <LeftSidebar sidebarItems={leftSidebarData} />
            </div>
            <div className={appStyles.centerView}>
              <Route path="/AzureLogin" component={AzureLogin} />
              <Route
                path="/SelectFrameworks"
                component={SelectFrameworks}
              />
              <Route path="/SelectPages" component={SelectPages} />
              <Route path="/SelectWebApp" component={SelectWebApp} />
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
  getVSCodeApi: () => { dispatch(getVSCodeApi()) },
  loadWizardContent: () => { dispatch(loadWizardContentAction()) },
});

export default connect(null, mapDispatchToProps)(App);
