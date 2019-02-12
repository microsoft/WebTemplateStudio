import React, { Component } from "react";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import NavigationBar from "../Common/NavigationBar";
import Comment from "./Comment";
import BlogForm from "./BlogForm";
import BlogPost from "./BlogPost";

export default class Blog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      comments: []
    };

    // Comment ID will increment from 3. If a database is used to store the comments then use the id assigned by the database.
    this.commentID = 3;
    this.handleChange = this.handleChange.bind(this);
    this.onNewComment = this.onNewComment.bind(this);
  }

  // Fetch comments from the API when the components mounts
  componentDidMount() {
    fetch("/api/comments")
      .then(res => res.json())
      .then(result => this.setState({ comments: result.commentsList }));
  }

  onNewComment(event) {
    fetch("/api/comments", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: this.state.commentFieldValue })
    })
      .then(response => response.json())
      .then(
        this.setState(prevState => ({
          comments: [
            {
              text: this.state.commentFieldValue,
              id: this.commentID
            },
            ...prevState.comments
          ],
          commentFieldValue: ""
        }))
      );

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
            <BlogForm
              handleChange={this.handleChange}
              onNewComment={this.onNewComment}
              commentFieldValue={this.state.commentFieldValue}
            />
            {this.state.comments.map(comment => (
              <Comment key={comment.id} text={comment.text} />
            ))}
          </Col>
        </Row>
      </Container>
    );
  }
}
