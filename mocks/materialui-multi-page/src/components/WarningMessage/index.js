import React from "react";
import classnames from "classnames";
import styles from "./warningmessage.module.css";

export default function index(props) {
  const { open, text, onWarningClose } = props;
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
            onClick={() => onWarningClose()}
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
