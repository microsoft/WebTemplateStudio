import * as React from "react";
import { Provider } from "react-redux";
import { IntlProvider } from "react-intl";
import { render } from "@testing-library/react";

const renderWithIntl = (component: any) => {
  return render(<IntlProvider locale="en">{component}</IntlProvider>);
};

const renderWithStore = (component: any, store: any) => {
  return renderWithIntl(<Provider store={store}>{component}</Provider>);
};

export { renderWithIntl, renderWithStore };
