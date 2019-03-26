import React from "react";

export default function ListForm(props) {
  const { onAddListItem, multilineTextField, onChangeInputText } = props;
  return (
    <div className="input-group my-3">
      <input
        type="text"
        onChange={event => onChangeInputText(event, "multilineTextField")}
        value={multilineTextField}
        className="form-control"
        placeholder="Add text here..."
        aria-label="Add text here..."
      />
      <button
        type="button"
        class="btn btn-primary ml-2"
        onClick={() => onAddListItem()}
      >
        Submit
      </button>
    </div>
  );
}
