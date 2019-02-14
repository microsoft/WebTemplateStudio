import * as React from "react";
import Select from "react-select";

import dropdownstyles from "./dropdownstyles";

interface IDropdownOption {
    value: string,
    label: string,
}

const Dropdown = ({ options, defaultValue }: { options: IDropdownOption[], defaultValue: IDropdownOption }) => {
    return (
        <Select
            styles={dropdownstyles}
            isSearchable={false}
            defaultValue={defaultValue}
            options={options} />
    )
}

export default Dropdown;