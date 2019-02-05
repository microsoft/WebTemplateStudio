import CommentForm from "../components/CommentForm";
import { connect } from "react-redux";
import { submitComment, updateCommentField } from "../actions";

const mapStateToProps = state => {
  return {
    commentFieldValue: state.comments.commentFieldValue
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onSubmitComment: event => {
      dispatch(submitComment());
      event.preventDefault();
    },
    onUpdateCommentField: event => {
      dispatch(updateCommentField(event));
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CommentForm);
