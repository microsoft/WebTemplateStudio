import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import LongList from "./components/LongList";
import NavBar from "./components/NavBar";
import MasterDetail from "./components/MasterDetail";
import { CssBaseline } from "@material-ui/core";

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <CssBaseline />
        <NavBar />
        <Switch>
          <Route path="/longlist" exact component={LongList} />
          <Route path="/masterdetail" component={MasterDetail} />
        </Switch>
      </React.Fragment>
    );
  }
}

export default App;
