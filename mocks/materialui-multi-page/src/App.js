import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import LongList from "./components/LongList";
import NavBar from "./components/NavBar";
import MasterDetail from "./components/MasterDetail";
import Grid from "./components/Grid";
import { CssBaseline } from "@material-ui/core";

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <CssBaseline />
        <NavBar />
        <Switch>
          <Route path="/longlist" component={LongList} />
          <Route path="/masterdetail" component={MasterDetail} />
          <Route path="/grid" component={Grid} />
        </Switch>
      </React.Fragment>
    );
  }
}

export default App;
