const defaultState = {
  commentsList: [
    { id: 1, text: "First Comment" },
    { id: 2, text: "Second Comment" }
  ],
  commentFieldValue: ""
};

const comments = (state = defaultState, action) => {
  switch (action.type) {
    case "SUBMIT_COMMENT":
      return {
        commentsList: [
          ...state.commentsList,
          {
            id: action.id,
            text: state.commentFieldValue
          }
        ],
        commentFieldValue: ""
      };
    case "UPDATE_COMMENT_FIELD":
      return { ...state, commentFieldValue: action.text };
    default:
      return state;
  }
};

export default comments;
