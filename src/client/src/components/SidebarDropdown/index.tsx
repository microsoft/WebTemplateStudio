import * as React from "react";
import Select from "react-select";

const Dropdown = () => {
    return (
        <Select
            styles={{
            control: (base: any, state: any): any => ({
                ...base,
                outline: "0.5px solid rgba(0,0,0,0.5)",
                border: 0,
                background: "#DFDFDF",
                // match with the menu
                borderRadius: "0px",
                // Removes weird border around container
                boxShadow: state.isFocused ? null : null,
                "&:hover": {
                outline: "0.5px solid rgba(0,0,0,0.5)"
                }
            }),
            option: (provided: any, state: any) => ({
                ...provided,
                background: state.isSelected ? "#DFDFDF" : "none",
                color: state.isSelected && "black", 
                "&:hover": {
                    background: "#DFDFDF",
                    border: 0,
                    }
            }),
            menu: base => ({
                ...base,
                // override border radius to match the box
                borderRadius: 0,
                // beautify the word cut by adding a dash see https://caniuse.com/#search=hyphens for the compatibility
                hyphens: "auto",
                // kill the gap
                marginTop: 1,
                textAlign: "left",
                // prevent menu to scroll y
                wordWrap: "break-word"
            }),
            menuList: base => ({
                ...base,
                // kill the white space on first and last option
                padding: 0
            })
            }}
            isSearchable={false}
            defaultValue={{
            value: "apples",
            label: "apples"
            }}
            options={[
            {
                value: "apples",
                label: "apples",
            },
            {
                value: "oranges",
                label: "oranges",
            }
            ]} />
    )
}