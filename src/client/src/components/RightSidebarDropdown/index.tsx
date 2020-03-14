import * as React from "react";

import Dropdown from "../../components/Dropdown";

import styles from "./styles.module.css";
import { IOption } from "../../types/option";

interface IProps {
  handleDropdownChange: (
    dropdownTitle: IDropDownOptionType
  ) => void;
  options: IDropDownOptionType[];
  title: string;
  isVisible: boolean;
  value: IDropDownOptionType;
  disabled?: boolean;
  optionsData: IOption[];
}

const RightSidebarDropdown = (props: IProps) => {
  return (
    <div>
      {props.isVisible && (
        <div className={styles.sidebarItem}>
          <div className={styles.dropdownTitle}>{props.title}</div>
          <Dropdown
            handleChange={dropDrownItem => {
              props.handleDropdownChange(dropDrownItem);
            }}
            disabled={props.disabled}
            ariaLabel={props.title}
            options={props.options}
            value={props.value}
          />
        </div>
      )}
    </div>
  );
};

export default RightSidebarDropdown;