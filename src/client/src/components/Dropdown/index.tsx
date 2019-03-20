import * as React from "react";
import { ReactComponent as ArrowDown } from "../../assets/chevron.svg";

import Select, { components } from "react-select";
import dropdownstyles from "./dropdownstyles";

import styles from "./styles.module.css";

interface IDropdownProps {
  options: IDropDownOptionType[];
  defaultValue?: IDropDownOptionType;
  handleChange?: (e: any) => void;
  value?: IDropDownOptionType | undefined;
}

const DropdownIndicator = (props: any) => {
  return (
    components.DropdownIndicator && (
      <components.DropdownIndicator {...props}>
        <ArrowDown className={styles.icon}/>
      </components.DropdownIndicator>
    )
  );
}

const Dropdown = ({
  options,
  defaultValue,
  handleChange,
  value
}: IDropdownProps) => {
  return (
    <Select
      components ={{ DropdownIndicator }}
      value={value}
      onChange={handleChange}
      styles={dropdownstyles}
      isSearchable={false}
      defaultValue={defaultValue}
      options={options}
      menuPlacement="auto"
    />
  );
};

export default Dropdown;
