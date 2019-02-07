import React, { Component } from "react";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import ContactForm from "./ContactForm";
import ContactInfo from "./ContactInfo";
import NavigationBar from "../Common/NavigationBar";
import "./Contact.css";

export default class Contact extends Component {
  render() {
    return (
      <Container>
        <NavigationBar />
        <div className="control-spacing" />
        <Row>
          <Col md={{ span: 5 }}>
            <h1>Contact Us</h1>
            <ContactForm />
          </Col>
          <Col md={{ span: 5, offset: 2 }}>
            <ContactInfo />
          </Col>
        </Row>
      </Container>
    );
  }
}
