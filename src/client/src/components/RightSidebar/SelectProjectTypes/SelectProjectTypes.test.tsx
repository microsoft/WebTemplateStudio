//TODO: review and add proper testing
import * as React from "react";
import configureMockStore from "redux-mock-store";
import { RenderResult } from "@testing-library/react";

import {
  getInitialState,
  addProjectTypeOptions,
  setSelectedProjectTypeAction,
} from "../../../mockData/mockStore";
import SelectProjectTypes from "./index";
import { renderWithStore } from "../../../testUtils";
import { AppState } from "../../../store/combineReducers";

import messages from "./messages";

describe("Select Project Types", () => {
  let wrapper: RenderResult;
  let store: any;
  const mockStore = configureMockStore();

  describe("With several project types", () => {
    beforeEach(() => {
      const initialState: AppState = getInitialState();
      addProjectTypeOptions(initialState);
      setSelectedProjectTypeAction(initialState, "");

      store = mockStore(initialState);
      wrapper = renderWithStore(<SelectProjectTypes />, store);
    });

    it("renders without crashing", () => {
      expect(wrapper).toBeDefined();
    });

    xit("should have messages", () => {
      const expectedText = intl.formatMessage(messages.selectProjectTypes);
      expect(wrapper.getByText(expectedText)).toBeDefined();
    });
  });

  describe("No need to choose project type. Only one available", () => {
    beforeEach(() => {
      const initialState: AppState = getInitialState();
      setSelectedProjectTypeAction(initialState, "");

      store = mockStore(initialState);
      wrapper = renderWithStore(<SelectProjectTypes />, store);
    });

    it("renders without crashing", () => {
      expect(wrapper).toBeDefined();
    });

    xit("should not have message", () => {
      const expectedText = intl.formatMessage(messages.selectProjectTypes);
      expect(wrapper.getByText(expectedText)).not.toBeDefined();
    });
  });
});
