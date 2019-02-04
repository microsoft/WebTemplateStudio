import CommentList from "../components/CommentList";
import { connect } from "react-redux";

const mapStateToProps = state => {
  return {
    commentsList: state.comments.commentsList
  };
};

export default connect(mapStateToProps)(CommentList);
