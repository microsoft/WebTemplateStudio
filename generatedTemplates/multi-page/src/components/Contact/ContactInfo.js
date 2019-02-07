import React from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "./Contact.css";

export default function ContactInfo() {
  return (
    <div>
      <Row>
        <Col>
          <h2>Connect With Us</h2>
          <p>
            For support or any questions contact us at sesamestreet@outlook.com
          </p>
        </Col>
      </Row>
      <Row className="mt-5">
        <Col>
          <h2>Location</h2>
          <p>
            Microsoft Vancouver <br /> 858 Beatty Street <br /> Vancouver, BC{" "}
            <br /> +1 604-693-7000
          </p>
        </Col>
      </Row>
    </div>
  );
}
