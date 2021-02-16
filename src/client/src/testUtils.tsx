import * as React from "react";
import { Provider } from "react-redux";
import { IntlProvider } from "react-intl";
import { render } from "@testing-library/react";
import { IDropdownProps } from "./components/Dropdown";

const renderWithIntl = (component: any) : any => {
  return render(<IntlProvider locale="en">{component}</IntlProvider>);
};

const renderWithStore = (component: any, store: any) : any => {
  return renderWithIntl(<Provider store={store}>{component}</Provider>);
};

const dropdownMock = ({ options, value, handleChange }: IDropdownProps) : JSX.Element => {
  const handleInputChange = (event: any) => {
    if (handleChange) {
      handleChange(event.currentTarget);
    }
  };
  const newValue = value ? value.label : undefined;
  return (
    <select data-testid="dropdown" value={newValue} onChange={handleInputChange}>
      {options.map(({ label, value }: any) => (
        <option key={value} value={value}>
          {label}
        </option>
      ))}
    </select>
  );
};

export { renderWithIntl, renderWithStore, dropdownMock };
