import React from "react";
import Card from "react-bootstrap/Card";
import Image from "react-bootstrap/Image";
import defaultImage from "../images/default.png";

export default function Comment(props) {
  return (
    <Card className="my-3">
      <Card.Header />
      <Card.Body>
        <Card.Text>{props.text}</Card.Text>
      </Card.Body>
    </Card>
  );
}
