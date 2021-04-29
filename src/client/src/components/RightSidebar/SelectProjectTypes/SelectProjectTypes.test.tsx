//TODO: review and add proper testing
import { RenderResult } from "@testing-library/react";
import * as React from "react";
import configureMockStore from "redux-mock-store";

import { addProjectTypeOptions, getInitialState, setSelectedProjectTypeAction } from "../../../mockData/mockStore";
import { AppState } from "../../../store/combineReducers";
import { renderWithStore } from "../../../testUtils";
import SelectProjectTypes from "./index";

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
  });
});
