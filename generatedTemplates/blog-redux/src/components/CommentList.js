import React from "react";
import Comment from "./Comment";

export default function CommentList(props) {
  return (
    <div>
      {props.commentsList.map(message => (
        <Comment key={message.id} text={message.text} />
      ))}
    </div>
  );
}
