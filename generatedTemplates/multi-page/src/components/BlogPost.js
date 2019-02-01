import React from "react";
import Card from "react-bootstrap/Card";

export default function BlogPost(props) {
  return (
    <Card className="my-3">
      <Card.Header>{props.title}</Card.Header>
      <Card.Body>
        <Card.Text>{props.text}</Card.Text>
      </Card.Body>
    </Card>
  );
}
