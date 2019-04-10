// https://react-select.com/styles#style-object
// custom styling for dropdown component using the Style API provided by react-select

export default {
  indicatorSeparator: (base: any) => ({
    ...base,
    display: "none"
  }),
  singleValue: (base: any) => ({
    ...base,
    color: "var(--vscode-editor-foreground);"
  }),
  placeholder: (base: any) => ({
    ...base,
    color: "var(--vscode-textLink-foreground);"
  }),
  control: (base: any, state: any): any => ({
    ...base,
    color: "white",
    border: "1px solid var(--vscode-editor-foreground)",
    borderRadius: 0,
    background: "var(--vscode-input-background)",
    "&:hover": {
      outline: "0.5px solid rgba(0,0,0,0.5)"
    },
    cursor: "pointer"
  }),
  option: (provided: any, state: any) => ({
    ...provided,
    backgroundColor: state.isSelected
      ? "#DFDFDF"
      : state.isFocused
      ? "#DFDFDF"
      : "none",
    color: state.isSelected && "black",
    "&:hover": {
      background: "#DFDFDF",
      border: 0,
      color: "black"
    },
    cursor: "pointer"
  }),
  menu: (base: any) => ({
    ...base,
    // override border radius to match the box
    borderRadius: 0,
    border: "1px solid var(--vscode-editor-foreground)",
    // beautify the word cut by adding a dash see https://caniuse.com/#search=hyphens for the compatibility
    hyphens: "auto",
    // kill the gap when opening up or down
    marginTop: 0,
    marginBottom: 0,
    textAlign: "left",
    // prevent menu to scroll y
    wordWrap: "break-word"
  }),
  menuList: (base: any) => ({
    ...base,
    // kill the white space on first and last option
    padding: 0,
    background: "var(--vscode-editor-background)"
  })
};
