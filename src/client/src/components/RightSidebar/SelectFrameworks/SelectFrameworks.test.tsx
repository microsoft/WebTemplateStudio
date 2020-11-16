import * as React from "react";
import configureMockStore from "redux-mock-store";
import SelectFrameworks from "./index";
import messages from "./messages";
import * as ReactRedux from 'react-redux'
import { getInitialState, addFrontEndFrameworksOptions, addBackEndFrameworksOptions, setFrontendFramework, setBackendFramework } from "../../../mockData/mockStore";
import { render, RenderResult } from "@testing-library/react";
import { IntlProvider } from "react-intl";
import { AppState } from "../../../store/combineReducers";

describe("SelectFrameworks", () => {
  let wrapper: RenderResult;
  let store: any;
  const mockStore = configureMockStore();

  describe("With both frontend and backend frameworks", () => {
    beforeEach(() => {
      const initialState: AppState = getInitialState();
      addFrontEndFrameworksOptions(initialState);
      addBackEndFrameworksOptions(initialState);
      setBackendFramework(initialState,"React");
      setFrontendFramework(initialState,"Node");

      store = mockStore(initialState);
      wrapper = render(
        <IntlProvider locale="en">
          <ReactRedux.Provider store={store}>
            <SelectFrameworks/>
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

  describe("When backend framework is optional", () => {
    beforeEach(() => {
      const initialState: AppState = getInitialState();
      addFrontEndFrameworksOptions(initialState);
      setFrontendFramework(initialState,"Node");

      store = mockStore(initialState);
      wrapper = render(
        <IntlProvider locale="en">
          <ReactRedux.Provider store={store}>
            <SelectFrameworks/>
          </ReactRedux.Provider>
        </IntlProvider>
      );
    });

    it("renders without crashing", () => {
      expect(wrapper).toBeDefined();
    });

    it("should have frontend framework messages", () => {
      const expectedTextFrontendFramework = intl.formatMessage(messages.frontendFramework);
      expect(wrapper.getByText(expectedTextFrontendFramework)).toBeDefined();
    });

    it("should not have backend framework messages", () => {
      const expectedTextBackendFramework = intl.formatMessage(messages.backendFramework);
      expect(wrapper.queryByText(expectedTextBackendFramework)).not.toBeInTheDocument();
    });
  });
});
