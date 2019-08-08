// https://react-select.com/styles#style-object
// custom styling for dropdown component using the Style API provided by react-select

export default {
  input: (base: any) => ({
    color: "var(--vscode-editor-foreground)"
  }),
  indicatorSeparator: (base: any) => ({
    ...base,
    display: "none"
  }),
  singleValue: (base: any, state: any) => ({
    ...base,
    color: "var(--vscode-editor-foreground)"
  }),
  placeholder: (base: any) => ({
    ...base,
    color: "var(--vscode-menu-foreground)"
  }),
  control: (base: any, state: any): any => ({
    ...base,
    color: "white",
    border: state.isFocused
      ? "1px solid var(--vscode-contrastActiveBorder)"
      : "none",
    borderRadius: 0,
    boxShadow: "none",
    background: "var(--vscode-editorWidget-border)",
    "&:hover": {
      outline: "0.5px solid rgba(0,0,0,0.5)"
    },
    fontSize: "1.2em",
    padding: "5px",
    cursor: "pointer"
  }),
  option: (provided: any, state: any) => ({
    ...provided,
    backgroundColor: state.isFocused && "var(--vscode-menu-foreground)",
    color: state.isFocused && "var(--vscode-editor-background)",
    "&:hover": {
      background: "var(--vscode-menu-foreground)",
      border: 0,
      color: "var(--vscode-editor-background)"
    },
    cursor: "pointer"
  }),
  menu: (base: any) => ({
    ...base,
    // override border radius to match the box
    borderRadius: 0,
    // beautify the word cut by adding a dash see https://caniuse.com/#search=hyphens for the compatibility
    hyphens: "auto",
    // kill the gap when opening up or down
    marginTop: 0,
    marginBottom: 0,
    textAlign: "left",
    // prevent menu to scroll y
    wordWrap: "break-word"
  }),
  menuList: (base: any, state: any) => ({
    ...base,
    // kill the white space on first and last option
    padding: 0,
    background: "var(--vscode-editorWidget-border)",
    border: "none",
    maxHeight: "130px"
  })
};
