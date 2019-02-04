let nextCommentId = 5;

// Update displayed comments after post button is pressed
export const submitComment = () => ({
  type: "SUBMIT_COMMENT",
  id: nextCommentId++
});

// Update the comment field as it is typed
export const updateCommentField = event => ({
  type: "UPDATE_COMMENT_FIELD",
  text: event.target.value
});
