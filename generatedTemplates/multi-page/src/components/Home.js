import React, { Component } from "react";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Jumbotron from "react-bootstrap/Jumbotron";

export default class Home extends Component {
  render() {
    return (
      <Container>
        <Navbar bg="light">
          <Navbar.Brand href="/">Web Template Studio</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link href="/blog">Blog</Nav.Link>
              <Nav.Link href="/contact">Contact</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
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
