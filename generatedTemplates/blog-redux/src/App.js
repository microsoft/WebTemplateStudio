import React, { Component } from "react";
import BlogPost from "./components/BlogPost";
import CommentList from "./containers/CommentList";
import CommentForm from "./containers/CommentForm";
import Container from "react-bootstrap/Container";

class App extends Component {
  render() {
    return (
      <Container>
        <BlogPost />
        <CommentList />
        <CommentForm />
      </Container>
    );
  }
}

export default App;
