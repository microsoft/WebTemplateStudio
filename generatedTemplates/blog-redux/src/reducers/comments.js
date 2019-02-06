const defaultState = {
  commentsList: [
    {
      id: 1,
      text:
        "Commodo minim irure labore non anim voluptate deserunt incididunt non ea. Excepteur eu culpa esse cillum mollit irure aliqua dolore ea esse aute minim. Commodo officia dolore adipisicing laboris deserunt proident id esse qui sit."
    },
    {
      id: 2,
      text:
        "Commodo minim irure labore non anim voluptate deserunt incididunt non ea. Excepteur eu culpa esse cillum mollit irure aliqua dolore ea esse aute minim. Commodo officia dolore adipisicing laboris deserunt proident id esse qui sit."
    }
  ],
  commentFieldValue: ""
};

const comments = (state = defaultState, action) => {
  switch (action.type) {
    case "SUBMIT_COMMENT":
      return {
        commentsList: [
          {
            id: action.id,
            text: state.commentFieldValue
          },
          ...state.commentsList
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
