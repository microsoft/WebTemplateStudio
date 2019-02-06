# Blog With Redux

## Redux Store Layout

```javascript
let store = {
  comments: {
    commentsList: [{ id: 1, text: "comment message" }],
    commentFieldValue: "Text currently entered in comment field"
  }
};
```

commentsList - A list of comments on the blog post.

commentFieldValue - The current value typed into the comment type area.

## Redux actions

SUBMIT_COMMENT - Triggered by the comment button this action will add a
new message to the commentList attribute in the redux store.

UPDATE_COMMENT_FIELD - Updates the commentFieldValue in the redux store as the user types
