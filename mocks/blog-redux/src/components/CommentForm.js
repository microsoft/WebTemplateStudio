import React from "react";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";

export default function CommentForm(props) {
  return (
    <Row>
      <Col>
        <Form className="my-3" onSubmit={event => props.onSubmitComment(event)}>
          <Form.Group as={Col} controlId="formComment">
            <Form.Control
              as="textarea"
              placeholder="Enter comment here..."
              rows="2"
              name="formComment"
              value={props.commentFieldValue}
              onChange={event => props.onUpdateCommentField(event)}
            />
          </Form.Group>
          <Button variant="outline-secondary" size="sm" type="submit">
            Comment
          </Button>
        </Form>
      </Col>
    </Row>
  );
}
