import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import NavigationBar from "../Common/NavigationBar";
import CaptionText from "./CaptionText";
import ImageTextGrid from "./ImageTextGrid";
import "./About.css";

export default function About() {
  return (
    <Container>
      <NavigationBar />
      <Row>
        <Col className="text-center background-grey py-5">
          <div className="control-spacing" />
          <h1>About Us</h1>
          <h5>Here is a tagline</h5>
          <div className="control-spacing" />
        </Col>
      </Row>
      <Row>
        <Col className="text-center mt-5">
          <h2>What we value</h2>
        </Col>
      </Row>
      <Row className="mt-3">
        <Col className="mx-5">
          <CaptionText />
        </Col>
        <Col className="mx-5">
          <CaptionText />
        </Col>
        <Col className="mx-5">
          <CaptionText />
        </Col>
      </Row>
      <Row className="mt-5">
        <ImageTextGrid />
      </Row>
    </Container>
  );
}
