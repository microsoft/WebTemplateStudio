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
    value?: IDropdownOption | undefined;
}

const Dropdown = ({ options, defaultValue, handleChange, value }: DropdownProps) => {
    return (
        <Select
            value={value}
            onChange={handleChange}
            styles={dropdownstyles}
            isSearchable={false}
            defaultValue={defaultValue}
            options={options} />
    )
}

export default Dropdown;