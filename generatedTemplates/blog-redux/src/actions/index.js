let nextCommentId = 5;

// Update list of comments in the redux store after Comment button has been pressed
export const submitComment = () => ({
  type: "SUBMIT_COMMENT",
  id: nextCommentId++
});

// Update the comment field at the bottom of the page as the user types
export const updateCommentField = event => ({
  type: "UPDATE_COMMENT_FIELD",
  text: event.target.value
});
