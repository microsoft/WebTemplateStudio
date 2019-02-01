import React, { Component } from "react";
import BlogPost from "./BlogPost";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

export default class Blog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [
        {
          title: "First Blog Title",
          text: "This is my first blog post",
          id: 1
        },
        {
          title: "Second Blog Title",
          text: "This is my second blog post",
          id: 2
        }
      ]
    };

    this.handleChange = this.handleChange.bind(this);
    this.onNewBlogPost = this.onNewBlogPost.bind(this);
  }

  onNewBlogPost(event) {
    this.setState(prevState => ({
      posts: [
        ...prevState.posts,
        {
          title: this.state.formBlogTitle,
          text: this.state.formBlogPost,
          id: 3
        }
      ]
    }));
    event.preventDefault();
  }

  handleChange(event) {
    const name = event.target.name;
    this.setState({ [name]: event.target.value });
  }

  render() {
    return (
      <Container>
        {this.state.posts.map(post => (
          <BlogPost key={post.id} title={post.title} text={post.text} />
        ))}
        <Form className="my-3" onSubmit={this.onNewBlogPost}>
          <Form.Group as={Col} controlId="formBlogTitle">
            <Form.Control
              type="text"
              placeholder="Title..."
              name="formBlogTitle"
              value={this.state.formBlogTitle}
              onChange={this.handleChange}
            />
          </Form.Group>
          <Form.Group as={Col} controlId="formBlogPost">
            <Form.Control
              as="textarea"
              placeholder="Your blog post here..."
              rows="6"
              name="formBlogPost"
              value={this.state.formBlogPost}
              onChange={this.handleChange}
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Post
          </Button>
        </Form>
      </Container>
    );
  }
}
