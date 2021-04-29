import { render } from "@testing-library/react";
import * as React from "react";
import { IntlProvider } from "react-intl";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";

import { getInitialState, loadMasters } from "../../mockData/mockStore";
import { AppState } from "../../store/combineReducers";
import AddPagesPage from "./index";
import messages from "./messages";

describe("AddPagesPage", () => {
  let props: any;
  let wrapper: any;
  let store: any;
  let initialState: AppState;
  const mockStore = configureMockStore();

  beforeEach(() => {
    initialState = getInitialState();
    loadMasters(initialState);
    store = mockStore(initialState);

    props = {
      isModal: true,
      intl: global.intl,
    };

    wrapper = render(
      <IntlProvider locale="en">
        <Provider store={store}>
          <AddPagesPage {...props} />
        </Provider>
      </IntlProvider>
    );
  });

  xit("check card components", () => {
    const buttonLength = wrapper.queryAllByRole("button").length;
    expect(buttonLength).toBe(
      initialState.templates.backendOptions.length + initialState.templates.frontendOptions.length
    );
  });

  it("check title", () => {
    expect(wrapper.getByText(intl.formatMessage(messages.pagesTitleQuestion))).toBeDefined();
  });
});
