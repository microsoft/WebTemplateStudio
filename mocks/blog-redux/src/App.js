import React, { Component } from "react";
import BlogPost from "./components/BlogPost";
import CommentList from "./containers/CommentList";
import CommentForm from "./containers/CommentForm";
import Navbar from "./components/NavBar";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

class App extends Component {
  render() {
    return (
      <div>
        <Container>
          <Row>
            <Col md={{ span: 10, offset: 1 }}>
              <Navbar />
            </Col>
            <Col md={{ span: 8, offset: 2 }}>
              <BlogPost />
              <CommentForm />
              <CommentList />
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default App;
