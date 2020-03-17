import * as React from "react";
import configureMockStore from "redux-mock-store";
import SelectFrameworks from "./index";
import messages from "../strings";
import * as ReactRedux from 'react-redux'
import { getInitialState } from "../../../mockData/mockStore";
import { render, RenderResult } from "@testing-library/react";
import { IntlProvider } from "react-intl";

describe("SelectFrameworks", () => {
  let wrapper: RenderResult;
  let store: any;
  const mockStore = configureMockStore();

  describe("Tests", () => {
    beforeEach(() => {
      store = mockStore(getInitialState());
      let props: any = {location:{pathname:"/"}};
      wrapper = render(
        <IntlProvider locale="en">
          <ReactRedux.Provider store={store}>
            <SelectFrameworks {...props}/>
          </ReactRedux.Provider>
        </IntlProvider>
      );
    });

    it("renders without crashing", () => {
      expect(wrapper).toBeDefined();
    });

    it("should have messages", () => {
      const expectedTextFrontendFramework = intl.formatMessage(messages.frontendFramework);
      const expectedTextBackendFramework = intl.formatMessage(messages.backendFramework);
      expect(wrapper.getByText(expectedTextFrontendFramework)).toBeDefined();
      expect(wrapper.getByText(expectedTextBackendFramework)).toBeDefined();
    });
  });
});
