import * as React from "react";
import { connect } from "react-redux";
import { HashRouter as Router, Route } from "react-router-dom";
import * as Redux from "redux";

import Header from "./components/Header";
import LeftSidebar from "./components/LeftSidebar";
import RightSidebar from "./components/RightSidebar";
import SelectBackEndFramework from "./components/SelectBackendFramework";
import SelectFrontEndFramework from "./components/SelectFrontEndFramework";
import SelectPages from "./components/SelectPages";
import SelectWebApp from "./components/SelectWebApp";
import Welcome from "./components/Welcome";
import Footer from "./containers/Footer";
import leftSidebarData from "./mockData/leftSidebarData";

import { getVSCodeApi } from "./actions/getVSCodeApi";

import appStyles from "./appStyles.module.css";

interface IDispatchProps {
  getVSCodeApi: () => void;
}

class App extends React.Component<IDispatchProps> {
  public static defaultProps = {
    getVSCodeApi: undefined,
  };

  public componentDidMount() {
    if (this.props.getVSCodeApi() !== undefined) {
      this.props.getVSCodeApi();
    }
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
              <Route path="/SelectBackEnd" component={SelectBackEndFramework} />
              <Route
                path="/SelectFrontEnd"
                component={SelectFrontEndFramework}
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
});

export default connect(null, mapDispatchToProps)(App);
