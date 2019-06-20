import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import "./App.css";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";

import Blank from "./components/Blank";
import Grid from "./components/Grid";
import List from "./components/List";
import Master_Detail from "./components/Master_Detail";
import Master_Detail2 from "./components/Master_Detail2";
//TODO Web Template Studio: Add routes for your new pages here.
class App extends Component {
  render() {
    return (
      <React.Fragment>
        <NavBar />
        <Switch>
          <Redirect exact path = "/" to = "/Blank" />
          <Route path = "/Blank" component = { Blank } />
          <Route path = "/Grid" component = { Grid } />
          <Route path = "/List" component = { List } />
          <Route path = "/Master_Detail" component = { Master_Detail } />
          <Route path = "/Master_Detail2" component = { Master_Detail2 } />
        </Switch>
        <Footer />
      </React.Fragment>
    );
  }
}

export default App;
