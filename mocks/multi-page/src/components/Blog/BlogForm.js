import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

export default function BlogForm(props) {
  return (
    <Form className="my-3" onSubmit={props.onNewComment}>
      <Form.Group controlId="commentFieldValue">
        <Form.Control
          as="textarea"
          placeholder="Enter comment here..."
          rows="2"
          name="commentFieldValue"
          value={props.commentFieldValue}
          onChange={props.handleChange}
        />
      </Form.Group>
      <Button variant="outline-secondary" size="sm" type="submit">
        Post
      </Button>
    </Form>
  );
}
