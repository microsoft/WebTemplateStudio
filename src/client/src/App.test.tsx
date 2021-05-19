import { RenderResult } from "@testing-library/react";

import configureMockStore from "redux-mock-store";
import { renderWithStore } from "./testUtils";
import * as React from "react";

import App from "./App";
import { AppState } from "./store/combineReducers";
import { getInitialState } from "./mockData/mockStore";

describe("App", () => {
  let props: any;
  let wrapper: RenderResult;

  let store: any;
  let initialState: AppState;
  const mockStore = configureMockStore();
  initialState = getInitialState();
  store = mockStore(initialState);

  beforeEach(() => {
    props = {};
      wrapper = renderWithStore(<App {...props} />, store);
  });

  it("renders without crashing", () => {
    expect(wrapper).toBeDefined();
  });
});
