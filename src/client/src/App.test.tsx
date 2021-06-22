import { RenderResult } from "@testing-library/react";
import * as React from "react";
import configureMockStore from "redux-mock-store";

import App from "./App";
import { getInitialState } from "./mockData/mockStore";
import { renderWithStore } from "./testUtils";

describe("App", () => {
  let props: any;
  let wrapper: RenderResult;

  const mockStore = configureMockStore();
  const initialState = getInitialState();
  const store = mockStore(initialState);

  beforeEach(() => {
    props = {};
    wrapper = renderWithStore(<App {...props} />, store);
  });

  it("renders without crashing", () => {
    expect(wrapper).toBeDefined();
  });
});
