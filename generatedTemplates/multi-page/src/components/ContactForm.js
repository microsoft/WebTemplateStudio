import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";

export default function ContactForm() {
  return (
    <Form>
      <Form.Row>
        <Form.Group as={Col} controlId="formGridEmail">
          <Form.Control type="email" placeholder="Enter email" />
        </Form.Group>
        <Form.Group as={Col} controlId="formGridPassword">
          <Form.Control placeholder="Subject" />
        </Form.Group>
      </Form.Row>
      <Form.Row>
        <Form.Group as={Col} controlId="exampleForm.ControlTextarea1">
          <Form.Control
            as="textarea"
            placeholder="Your message here"
            rows="6"
          />
        </Form.Group>
      </Form.Row>
      <Button variant="primary" type="submit">
        Send
      </Button>
    </Form>
  );
}
