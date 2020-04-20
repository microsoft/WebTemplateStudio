import React from "react";
import classnames from "classnames";
import styles from "./styles.module.css";
import imgGreyAvatar from "../../images/GreyAvatar.svg";
import PropTypes from "prop-types";

const MasterList = ({ sampleOrder, selectSampleOrder }) => {
  return (
    <button
      onClick={() => selectSampleOrder(sampleOrder)}
      type="button"
      className={classnames(
        "list-group-item",
        "list-group-item-action",
        styles.sidebarText
      )}
    >
      <img src={ sampleOrder.imageSrc ? sampleOrder.imageSrc : imgGreyAvatar} alt="Default Grey Avatar" className="mr-3" />
      {sampleOrder.title}
    </button>
  );
}

MasterList.propTypes = {
  sampleOrder: PropTypes.any,
  selectSampleOrder: PropTypes.func
}

export default MasterList;