import React from "react";
import classnames from "classnames";
import styles from "./WarningMessage.module.css";
import PropTypes from "prop-types";

// A pop up message used to warn users about failed API calls to the back end
const WarningMessage = ({ open, text, onWarningClose }) => {
  return (
    <React.Fragment>
      {open && (
        <div
          className={classnames(
            "alert",
            "alert-warning",
            "ml-3",
            styles.warningPosition
          )}
          role="alert"
        >
          {text}
          <button
            onClick={onWarningClose}
            className="close ml-2"
            aria-label="Close"
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
      )}
    </React.Fragment>
  );
}

WarningMessage.propTypes = {
  open: PropTypes.bool,
  text: PropTypes.string,
  onWarningClose:PropTypes.func
}

export default WarningMessage;