import React from "react";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

export default function CommentForm(props) {
  return (
    <Form className="my-3" onSubmit={event => props.onSubmitComment(event)}>
      <Form.Group as={Col} controlId="formComment">
        <Form.Control
          as="textarea"
          placeholder="Enter comment here..."
          rows="3"
          name="formComment"
          value={props.commentFieldValue}
          onChange={event => props.onUpdateCommentField(event)}
        />
      </Form.Group>
      <Button variant="primary" type="submit">
        Post
      </Button>
    </Form>
  );
}

{
  /* <Button onClick={() => props.onAddComment("This is the new comment")}>
      Add Item
    </Button> */
}

{
  // function handleChange(event) {
  //   const name = event.target.name;
  //   this.setState({ [name]: event.target.value });
  // }
  // function handleSubmit(event) {
  //   console.log("The form was submitted");
  // }
  /* <Form className="my-3" onSubmit={handleSubmit}>
  <Form.Group as={Col} controlId="formBlogPost">
    <Form.Control
      as="textarea"
      placeholder="Your blog post here..."
      rows="3"
      name="formBlogPost"
      value={this.state.formBlogPost}
      onChange={handleChange}
    />
  </Form.Group>
  <Button variant="primary" type="submit">
    Post
  </Button>
</Form>; */
}
