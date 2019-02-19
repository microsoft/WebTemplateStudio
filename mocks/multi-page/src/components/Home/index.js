import React, { Component } from "react";
import Container from "react-bootstrap/Container";
import Jumbotron from "react-bootstrap/Jumbotron";
import NavigationBar from "../Common/NavigationBar";

export default class Home extends Component {
  render() {
    return (
      <Container>
        <NavigationBar />
        <Jumbotron fluid className="text-center">
          <Container>
            <h1>This is a title</h1>
            <p>Here is some text explaining why the site was developed.</p>
          </Container>
        </Jumbotron>
      </Container>
    );
  }
}
