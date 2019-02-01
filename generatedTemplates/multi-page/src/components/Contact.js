import React, { Component } from "react";
import ContactForm from "./ContactForm";
import ContactInfo from "./ContactInfo";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";

export default class Contact extends Component {
  render() {
    return (
      <Container>
        <h1>Get in Touch</h1>
        <Row>
          <Col>
            <ContactForm />
          </Col>
          <Col>
            <ContactInfo />
          </Col>
        </Row>
      </Container>
    );
  }
}
