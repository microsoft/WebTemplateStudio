import * as React from "react";
import configureMockStore from "redux-mock-store";
import "@testing-library/jest-dom";
import "@testing-library/jest-dom/extend-expect";
import { RenderResult, fireEvent, waitFor, act } from "@testing-library/react";

import { getInitialState, setSelectedRoute } from "../../mockData/mockStore";
import { renderWithStore } from "../../testUtils";
import { AzureResourceType } from "../../utils/constants/azure";
import * as extensionService from "../../utils/extensionService/extensionService";

import messages from "./messages";
import styles from "./styles.module.css";
import ProjectOutput from ".";
import { AppState } from "../../store/combineReducers";

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
