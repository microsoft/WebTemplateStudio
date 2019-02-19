import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";
import Contact from "./components/Contact";
import Home from "./components/Home";
import Blog from "./components/Blog";
import About from "./components/About";

class App extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/contact" component={Contact} />
        <Route path="/blog" component={Blog} />
        <Route path="/about" component={About} />
      </Switch>
    );
  }
}

export default App;
