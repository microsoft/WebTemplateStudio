import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";

export default function ContactForm() {
  return (
    <Form>
      <Form.Group controlId="formGridFullName">
        <Form.Label>Full Name</Form.Label>
        <Form.Control />
      </Form.Group>
      <Form.Group controlId="formGridEmail">
        <Form.Label>Email</Form.Label>
        <Form.Control type="email" />
      </Form.Group>
      <Form.Group controlId="formGridSubject">
        <Form.Label>Subject</Form.Label>
        <Form.Control />
      </Form.Group>
      <Form.Group controlId="exampleForm.ControlTextarea">
        <Form.Label>Message</Form.Label>
        <Form.Control as="textarea" rows="5" />
      </Form.Group>
      <Form.Row>
        <Col md={{ span: 2, offset: 10 }}>
          <Button variant="secondary" type="submit">
            Submit
          </Button>
        </Col>
      </Form.Row>
    </Form>
  );
}
