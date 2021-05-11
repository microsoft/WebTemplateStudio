// https://react-select.com/styles#style-object
// custom styling for dropdown component using the Style API provided by react-select

export default {
  input: (): any => ({
    color: "var(--vscode-editor-foreground)",
  }),
  indicatorSeparator: (base: any): any => ({
    ...base,
    display: "none",
  }),
  singleValue: (base: any): any => ({
    ...base,
    color: "var(--vscode-editor-foreground)",
  }),
  placeholder: (base: any): any => ({
    ...base,
    color: "var(--vscode-menu-foreground)",
  }),
  valueContainer: (base: any): any => ({
    ...base,
    padding: "0 0.2em",
  }),
  indicatorContainer: (base: any): any => ({
    ...base,
    padding: "0",
  }),
  control: (base: any, state: any): any => ({
    ...base,
    minHeight: "2.5em",
    maxHeight: "2.5em",
    border: state.isFocused ? "1px solid var(--vscode-contrastActiveBorder)" : "none",
    borderRadius: 0,
    boxShadow: "none",
    background: "var(--vscode-editorWidget-border)",
    "&:hover": {
      outline: "0.5px solid rgba(0,0,0,0.5)",
    },
    padding: "0 0.2em",
    cursor: "pointer",
  }),
  option: (provided: any, state: any): any => ({
    ...provided,
    backgroundColor: state.isFocused && "var(--vscode-menu-foreground)",
    color: state.isFocused && "var(--vscode-editor-background)",
    "&:hover": {
      background: "var(--vscode-menu-foreground)",
      border: 0,
      color: "var(--vscode-editor-background)",
    },
    cursor: "pointer",
  }),
  menu: (base: any): any => ({
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
    wordWrap: "break-word",
  }),
  menuList: (base: any): any => ({
    ...base,
    // kill the white space on first and last option
    padding: 0,
    background: "var(--vscode-editorWidget-border)",
    border: "none",
    maxHeight: "130px",
  }),
};
