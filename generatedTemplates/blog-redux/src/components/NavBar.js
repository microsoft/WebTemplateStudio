import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";

export default function NavBar() {
  return (
    <Navbar>
      <Navbar.Brand href="#home">Logo/Title</Navbar.Brand>
      <Navbar.Toggle />
      <Navbar.Collapse className="justify-content-end">
        <Nav.Link href="#link">Link</Nav.Link>
        <Nav.Link href="#link">Link</Nav.Link>
        <Nav.Link href="#link">Link</Nav.Link>
      </Navbar.Collapse>
    </Navbar>
  );
}
