import * as React from "react";

import Dropdown from "../../components/Dropdown";

import styles from "./styles.module.css";
import { ISelected } from "../../types/selected";

interface IProps {
  handleDropdownChange: (
    dropdownTitle: IDropDownOptionType,
    selectDropdownOption: (dropDrownItem: ISelected) => void
  ) => void;
  selectDropdownOption: (dropDrownItem: ISelected) => void;
  options: IDropDownOptionType[];
  title: string;
  isVisible: boolean;
  value: IDropDownOptionType;
}

const RightSidebarDropdown = (props: IProps) => {
  return (
    <div>
      {props.isVisible && (
        <div className={styles.sidebarItem}>
          <div className={styles.dropdownTitle}>{props.title}</div>
          <Dropdown
            handleChange={dropDrownItem => {
              props.handleDropdownChange(
                dropDrownItem,
                props.selectDropdownOption
              );
            }}
            options={props.options}
            value={props.value}
          />
        </div>
      )}
    </div>
  );
};

export default RightSidebarDropdown;
