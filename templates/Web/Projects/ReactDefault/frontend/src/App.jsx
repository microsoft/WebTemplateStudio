import React from "react";
import { Switch, Route } from "react-router-dom";
import "./App.css";
import NavBar from "./components/navbar/NavBar";
import Footer from "./components/footer/Footer";

//TODO Web Template Studio: Add routes for your new pages here.
const App = () => {
    return (
      <React.Fragment>
        <NavBar />
        <Switch>
        </Switch>
        <Footer />
      </React.Fragment>
    );
}

export default App;
