import React from "react";
import Card from "react-bootstrap/Card";
import Image from "react-bootstrap/Image";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import defaultAvatarImage from "../images/DefaultAvatar.png";

export default function Comment(props) {
  return (
    <Row>
      <Col>
        <Card className="my-3">
          <Card.Header>
            <Row>
              <Col md="1">
                <Image src={defaultAvatarImage} roundedCircle width="40" />
              </Col>
              <Col>
                <Card.Title>Name of the commentor</Card.Title>
                <Card.Subtitle>Date of comment</Card.Subtitle>
              </Col>
            </Row>
          </Card.Header>
          <Card.Body>
            <Card.Text>{props.text}</Card.Text>
            <Button variant="outline-secondary" size="sm">
              Reply
            </Button>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
}
