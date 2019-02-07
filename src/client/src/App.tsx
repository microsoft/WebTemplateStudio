import * as React from 'react';
import { HashRouter as Router, Route } from 'react-router-dom';

import appStyles from './appStyles.module.css';

import Welcome from './components/Welcome';
import Header from './components/Header';
import Footer from './components/Footer';
import RightSidebar from './components/RightSidebar';
import LeftSidebar from './components/LeftSidebar';
import SelectWebApp from './components/SelectWebApp';
import SelectFrontEndFramework from './components/SelectFrontEndFramework';

import leftSidebarData from './mockData/leftSidebarData';
import SelectBackEndFramework from './components/SelectBackendFramework';
import SelectPages from './components/SelectPages';

class App extends React.Component {
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
              <Route path="/selectBackEnd" component={SelectBackEndFramework} />
              <Route path="/selectFrontEnd" component={SelectFrontEndFramework} />
              <Route path="/selectPages" component={SelectPages} />
              <Route path="/SelectWebApp" component={SelectWebApp} />
              <Route exact path="/" component={Welcome} />
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

export default App;
