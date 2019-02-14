import * as React from "react";
import Select from "react-select";

import dropdownstyles from "./dropdownstyles";

interface IDropdownOption {
    value: string,
    label: string,
}

interface DropdownProps {
    options: IDropdownOption[],
    defaultValue: IDropdownOption;
    handleChange?: (e: any) => void;
}

const Dropdown = ({ options, defaultValue, handleChange }: DropdownProps) => {
    return (
        <Select
            onChange={handleChange}
            styles={dropdownstyles}
            isSearchable={false}
            defaultValue={defaultValue}
            options={options} />
    )
}

export default Dropdown;