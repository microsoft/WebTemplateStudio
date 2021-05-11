import "@testing-library/jest-dom";
import "@testing-library/jest-dom/extend-expect";

import { act, RenderResult } from "@testing-library/react";
import * as React from "react";
import configureMockStore from "redux-mock-store";

import { getInitialState } from "../../../mockData/mockStore";
import { AppState } from "../../../store/combineReducers";
import { renderWithStore } from "../../../testUtils";
import ProjectOutput from ".";
import messages from "./messages";

describe("Project Output component", () => {
  let store: any;
  let props: any;
  let wrapper: RenderResult;
  let initialState: AppState;

  const mockStore = configureMockStore();

  beforeEach(() => {
    initialState = getInitialState();
    store = mockStore(initialState);
    props = {};
    wrapper = renderWithStore(<ProjectOutput {...props} />, store);
  });

  it("renders without crashing", () => {
    act(() => {
      expect(wrapper).toBeDefined();
    });
  });

  it("should have description for button", () => {
    const expectedOutputPathTitle = intl.formatMessage(messages.outputPathTitle);
    expect(wrapper.getByText(expectedOutputPathTitle)).toBeDefined();
  });
});
