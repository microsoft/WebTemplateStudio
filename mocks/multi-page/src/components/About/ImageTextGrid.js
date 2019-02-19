import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Figure from "react-bootstrap/Figure";
import defaultImage from "../../images/defaultImage.jpg";

export default function ImageTextGrid() {
  return (
    <div>
      <Row>
        <Col>
          <Figure>
            <Figure.Image src={defaultImage} />
          </Figure>
        </Col>
        <Col className="align-self-center">
          <h3 className>Header</h3>
          <p>
            Excepteur tempor amet tempor consequat ad exercitation duis dolor
            deserunt sit. Aliquip anim veniam excepteur aliqua culpa nulla
            laborum elit amet minim qui aliquip do in. Aute mollit velit laboris
            irure elit do amet ea aute qui.
          </p>
        </Col>
      </Row>
      <Row>
        <Col className="align-self-center">
          <h3 className>Header</h3>
          <p>
            Excepteur tempor amet tempor consequat ad exercitation duis dolor
            deserunt sit. Aliquip anim veniam excepteur aliqua culpa nulla
            laborum elit amet minim qui aliquip do in. Aute mollit velit laboris
            irure elit do amet ea aute qui.
          </p>
        </Col>
        <Col>
          <Figure>
            <Figure.Image src={defaultImage} />
          </Figure>
        </Col>
      </Row>
    </div>
  );
}
