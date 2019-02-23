import * as React from "react";
import Select from "react-select";

import dropdownstyles from "./dropdownstyles";

interface IDropdownProps {
  options: IDropDownOptionType[];
  defaultValue?: IDropDownOptionType;
  handleChange?: (e: any) => void;
  value?: IDropDownOptionType | undefined;
}

const Dropdown = ({
  options,
  defaultValue,
  handleChange,
  value
}: IDropdownProps) => {
  return (
    <Select
      value={value}
      onChange={handleChange}
      styles={dropdownstyles}
      isSearchable={false}
      defaultValue={defaultValue}
      options={options}
    />
  );
};

export default Dropdown;
