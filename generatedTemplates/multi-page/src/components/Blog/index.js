import React, { Component } from "react";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import NavigationBar from "../Common/NavigationBar";
import Comment from "./Comment";
import BlogPost from "./BlogPost";

export default class Blog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      comments: [
        {
          text:
            "Ipsum aliquip dolore nulla Lorem do commodo enim officiaLaboris sint culpa incididunt do enim eiusmod nisi occaecat do sit ea duis duis nisi. Ullamco reprehenderit anim commodo non quis pariatur. Excepteur veniam excepteur aliquip laboris nisi dolor non culpa proident commodo.",
          id: 1
        },
        {
          text:
            "Laboris sint culpa incididunt do enim eiusmod nisi occaecat do sit ea duis duis nisi. Ullamco reprehenderit anim commodo non quis pariatur. Excepteur veniam excepteur aliquip laboris nisi dolor non culpa proident commodo.",
          id: 2
        }
      ]
    };

    // Comment ID will increment from 3. If a database is used to store the comments then use the id assigned by the database.
    this.commentID = 3;
    this.handleChange = this.handleChange.bind(this);
    this.onNewComment = this.onNewComment.bind(this);
  }

  onNewComment(event) {
    this.setState(prevState => ({
      comments: [
        {
          text: this.state.commentFieldValue,
          id: this.commentID
        },
        ...prevState.comments
      ],
      commentFieldValue: ""
    }));
    this.commentID++;
    event.preventDefault();
  }

  handleChange(event) {
    const name = event.target.name;
    this.setState({ [name]: event.target.value });
  }

  render() {
    return (
      <Container>
        <Row>
          <Col md={{ span: 10, offset: 1 }}>
            <NavigationBar />
          </Col>
        </Row>
        <Row>
          <Col md={{ span: 8, offset: 2 }}>
            <BlogPost />
            <Form className="my-3" onSubmit={this.onNewComment}>
              <Form.Group controlId="commentFieldValue">
                <Form.Control
                  as="textarea"
                  placeholder="Enter comment here..."
                  rows="2"
                  name="commentFieldValue"
                  value={this.state.commentFieldValue}
                  onChange={this.handleChange}
                />
              </Form.Group>
              <Button variant="outline-secondary" size="sm" type="submit">
                Post
              </Button>
            </Form>
            {this.state.comments.map(comment => (
              <Comment key={comment.id} text={comment.text} />
            ))}
          </Col>
        </Row>
      </Container>
    );
  }
}
