import React from "react";
import PropTypes from "prop-types";

const ListItem = ({ item, deleteItem }) => {
  return (
    <div className="col-12 mb-3 border">
      <div className="row">
        <div className="col-11">
          <p className="mt-3">{item.text}</p>
        </div>
        <div className="col-1">
          <button
            type="button"
            className="close py-2"
            data-dismiss="alert"
            aria-label="Close"
            onClick={() => deleteItem(item)}
          >
            <div aria-hidden="true">&times;</div>
          </button>
        </div>
      </div>
    </div>
  );
}

ListItem.propTypes = {
  item: PropTypes.any,
  deleteItem: PropTypes.func
}

export default ListItem;