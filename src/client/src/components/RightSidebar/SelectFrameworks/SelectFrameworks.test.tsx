import { RenderResult } from "@testing-library/react";
import * as React from "react";
import configureMockStore from "redux-mock-store";

import {
  addBackEndFrameworksOptions,
  addFrontEndFrameworksOptions,
  getInitialState,
  setBackendFramework,
  setFrontendFramework,
} from "../../../mockData/mockStore";
import { AppState } from "../../../store/combineReducers";
import { renderWithStore } from "../../../testUtils";
import SelectFrameworks from "./index";
import messages from "./messages";

describe("SelectFrameworks", () => {
  let wrapper: RenderResult;
  let store: any;
  const mockStore = configureMockStore();

  describe("With both frontend and backend frameworks", () => {
    beforeEach(() => {
      const initialState: AppState = getInitialState();
      addFrontEndFrameworksOptions(initialState);
      addBackEndFrameworksOptions(initialState);
      setFrontendFramework(initialState, "React");
      setBackendFramework(initialState, "Node");

      store = mockStore(initialState);
      wrapper = renderWithStore(<SelectFrameworks />, store);
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
      setFrontendFramework(initialState, "React");

      store = mockStore(initialState);
      wrapper = renderWithStore(<SelectFrameworks />, store);
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
