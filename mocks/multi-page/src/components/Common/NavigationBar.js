import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";

export default function NavBar() {
  return (
    <Navbar>
      <Navbar.Brand href="/">Logo/Title</Navbar.Brand>
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav>
          <Nav.Link href="/about">About</Nav.Link>
          <Nav.Link href="/blog">Blog</Nav.Link>
          <Nav.Link href="/contact">Contact</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}
