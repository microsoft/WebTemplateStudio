import * as React from "react";
import configureMockStore from "redux-mock-store";
import '@testing-library/jest-dom';
import TopNavBar from ".";
import { getInitialState, setSubscriptions } from "../../mockData/mockStore";
import { RenderResult } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { renderWithStore } from "../../testUtils";
import messages from "./messages";
import stylesTopNavBarLink from "../TopNavBarLink/styles.module.css";
import { AppState } from "../../store/combineReducers";

describe("TopNavBar", () => {
  let wrapper: RenderResult;
  let store: any;
  let initialState: AppState;
  const mockStore = configureMockStore(); 

  describe("When is enable button ", () => {

    beforeEach(() => {
      initialState = getInitialState();
      store = mockStore(initialState);
    });
  
    it("renders without crashing", () => {
      wrapper = renderWithStore(<TopNavBar />, store);
      expect(wrapper).toBeDefined();
    });

    it("New Project", () => {
      wrapper = renderWithStore(<TopNavBar />, store);
      const text = wrapper.getByText(intl.formatMessage(messages.welcome))
      expect(text).toHaveClass(stylesTopNavBarLink.pageCursorPointer);

      const number = wrapper.getByText("1")
      expect(number).toHaveClass(stylesTopNavBarLink.pageCursorPointer);
    });

    it("Add Frameworks", () => {
      wrapper = renderWithStore(<TopNavBar />, store);
      const text = wrapper.getByText(intl.formatMessage(messages.frameworks))
      expect(text).toHaveClass(stylesTopNavBarLink.pageCursorPointer);

      const number = wrapper.getByText("2")
      expect(number).toHaveClass(stylesTopNavBarLink.pageCursorPointer);
    });

    it("Add Pages", () => {
      wrapper = renderWithStore(<TopNavBar />, store);
      const text = wrapper.getByText(intl.formatMessage(messages.pages))
      expect(text).toHaveClass(stylesTopNavBarLink.pageCursorPointer);

      const number = wrapper.getByText("3")
      expect(number).toHaveClass(stylesTopNavBarLink.pageCursorPointer);
    });

    it("Add Optional Cloud Service", () => {
      wrapper = renderWithStore(<TopNavBar />, store);
      const text = wrapper.getByText(intl.formatMessage(messages.services))
      expect(text).toHaveClass(stylesTopNavBarLink.pageCursorPointer);

      const number = wrapper.getByText("4")
      expect(number).toHaveClass(stylesTopNavBarLink.pageCursorPointer);
    });

    it("Summary", () => {
      wrapper = renderWithStore(<TopNavBar />, store);
      const text = wrapper.getByText(intl.formatMessage(messages.summary))
      expect(text).toHaveClass(stylesTopNavBarLink.pageCursorPointer);

      const number = wrapper.getByText("5")
      expect(number).toHaveClass(stylesTopNavBarLink.pageCursorPointer);
    });
  });

  describe("When is disabled button ", () => {

    beforeEach(() => {
      initialState = getInitialState();
      initialState.userSelection.projectNameObject.projectName="";
      initialState.userSelection.projectNameObject.validation.isValid=false;
      store = mockStore(initialState);
    });
  
    it("renders without crashing", () => {
      wrapper = renderWithStore(<TopNavBar />, store);
      expect(wrapper).toBeDefined();
    });

    it("New Project", () => {
      wrapper = renderWithStore(<TopNavBar />, store);
      const text = wrapper.getByText(intl.formatMessage(messages.welcome))
      expect(text).not.toHaveClass(stylesTopNavBarLink.pageCursorPointer);

      const number = wrapper.getByText("1")
      expect(number).not.toHaveClass(stylesTopNavBarLink.pageCursorPointer);
    });

    it("Add Frameworks", () => {
      wrapper = renderWithStore(<TopNavBar />, store);
      const text = wrapper.getByText(intl.formatMessage(messages.frameworks))
      expect(text).not.toHaveClass(stylesTopNavBarLink.pageCursorPointer);

      const number = wrapper.getByText("2")
      expect(number).not.toHaveClass(stylesTopNavBarLink.pageCursorPointer);
    });

    it("Add Pages", () => {
      wrapper = renderWithStore(<TopNavBar />, store);
      const text = wrapper.getByText(intl.formatMessage(messages.pages))
      expect(text).not.toHaveClass(stylesTopNavBarLink.pageCursorPointer);

      const number = wrapper.getByText("3")
      expect(number).not.toHaveClass(stylesTopNavBarLink.pageCursorPointer);
    });

    it("Add Optional Cloud Service", () => {
      wrapper = renderWithStore(<TopNavBar />, store);
      const text = wrapper.getByText(intl.formatMessage(messages.services))
      expect(text).not.toHaveClass(stylesTopNavBarLink.pageCursorPointer);

      const number = wrapper.getByText("4")
      expect(number).not.toHaveClass(stylesTopNavBarLink.pageCursorPointer);
    });

    it("Summary", () => {
      wrapper = renderWithStore(<TopNavBar />, store);
      const text = wrapper.getByText(intl.formatMessage(messages.summary))
      expect(text).not.toHaveClass(stylesTopNavBarLink.pageCursorPointer);

      const number = wrapper.getByText("5")
      expect(number).not.toHaveClass(stylesTopNavBarLink.pageCursorPointer);
    });
  });
});
