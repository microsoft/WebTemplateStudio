import React from "react";
import classnames from "classnames";
import styles from "./masterdetail.module.css";

export default function MasterDetailSideBarTab(props) {
  return (
    <button
      onClick={() => props.onDisplayTabClick(props.index)}
      type="button"
      className={classnames(
        "list-group-item",
        "list-group-item-action",
        styles.sidebarText
      )}
    >
      <img src={props.image} alt="Default Grey Avatar" className="mr-3" />
      {props.tabText}
    </button>
  );
}
