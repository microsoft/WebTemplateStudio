import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import "./App.css";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import Grid from "./components/Grid";
import List from "./components/List";
import Blank from "./components/Blank";
import MasterDetail from "./components/MasterDetail";

// TODO Web Template Studio: Add routes for your new pages here.
class App extends Component {
  render() {
    return (
      <React.Fragment>
        <NavBar />
        <Switch>
          <Route path="/list" component={List} />
          <Route path="/masterdetail" component={MasterDetail} />
          <Route path="/grid" component={Grid} />
          <Route path="/blank" component={Blank} />
        </Switch>
        <Footer />
      </React.Fragment>
    );
  }
}

export default App;
