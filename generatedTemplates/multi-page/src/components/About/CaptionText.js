import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import defaultImage from "../../images/defaultImageVertical.jpg";

export default function CaptionText() {
  return (
    <div>
      <Row>
        <Col>
          <Image src={defaultImage} fluid />
        </Col>
      </Row>
      <Row>
        <Col>
          <p>
            Consectetur sunt ea aliqua dolore aute proident ex reprehenderit.
          </p>
        </Col>
      </Row>
    </div>
  );
}
