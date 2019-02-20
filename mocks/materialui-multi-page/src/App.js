import React, { Component } from "react";
import LongList from "./components/LongList";
import NavBar from "./components/NavBar";
import { CssBaseline } from "@material-ui/core";

class App extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <React.Fragment>
        <CssBaseline />
        <NavBar />
        <LongList />
      </React.Fragment>
    );
  }
}

export default App;
