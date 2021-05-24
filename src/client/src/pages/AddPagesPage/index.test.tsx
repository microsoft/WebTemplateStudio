import { RenderResult } from "@testing-library/react";
import * as React from "react";
import configureMockStore from "redux-mock-store";

import {
  addBackEndFrameworksOptions,
  addFrontEndFrameworksOptions,
  getInitialState,
  loadMasters,
} from "../../mockData/mockStore";
import { AppState } from "../../store/combineReducers";
import { renderWithStore } from "../../testUtils";
import AddPagesPage from ".";
import messages from "./messages";

describe("AddPagesPage", () => {
  let props: any;
  let wrapper: RenderResult;

  let store: any;
  let initialState: AppState;
  const mockStore = configureMockStore();

  beforeEach(() => {
    initialState = getInitialState();
    loadMasters(initialState);
    addFrontEndFrameworksOptions(initialState);
    addBackEndFrameworksOptions(initialState);
    store = mockStore(initialState);

    props = {
      isModal: true,
    };
  });

  it("renders without crashing", () => {
    wrapper = renderWithStore(<AddPagesPage {...props} />, store);
    expect(wrapper).toBeDefined();
  });

  it("check title", () => {
    wrapper = renderWithStore(<AddPagesPage {...props} />, store);

    expect(wrapper.getByText(intl.formatMessage(messages.pagesTitleQuestion))).toBeDefined();
  });
});
