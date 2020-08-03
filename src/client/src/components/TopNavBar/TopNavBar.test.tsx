import * as React from "react";
import configureMockStore from "redux-mock-store";
import '@testing-library/jest-dom';
import TopNavBar from ".";
import { getInitialState } from "../../mockData/mockStore";
import { RenderResult, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { renderWithStore } from "../../testUtils";
import messages from "./messages";
import stylesTopNavBarLink from "../TopNavBarLink/styles.module.css";
import { AppState } from "../../store/combineReducers";
import * as routesActions from "../../store/navigation/routes/action";
const spySetPageWizardPageAction = jest.spyOn(routesActions, 'setPageWizardPageAction');

describe("TopNavBar", () => {
  let wrapper: RenderResult;
  let store: any;
  let initialState: AppState;
  const mockStore = configureMockStore();

  describe("When is enable button ", () => {

    beforeEach(() => {
      initialState = getInitialState();
      store = mockStore(initialState);
      spySetPageWizardPageAction.mockClear();
    });

    it("renders without crashing", () => {
      wrapper = renderWithStore(<TopNavBar />, store);
      expect(wrapper).toBeDefined();
    });

    it("New Project text", () => {
      wrapper = renderWithStore(<TopNavBar />, store);
      const text = wrapper.getByText(intl.formatMessage(messages.welcome))
      expect(text).toHaveClass(stylesTopNavBarLink.pageCursorPointer);

      fireEvent.click(text);
      expect(spySetPageWizardPageAction).toHaveBeenCalled();
    });

    it("New Project number", () => {
      wrapper = renderWithStore(<TopNavBar />, store);
      const number = wrapper.getByText("1")
      expect(number).toHaveClass(stylesTopNavBarLink.pageCursorPointer);

      fireEvent.click(number);
      expect(spySetPageWizardPageAction).toHaveBeenCalled();
    });

    it("Add Frameworks text", () => {
      wrapper = renderWithStore(<TopNavBar />, store);
      const text = wrapper.getByText(intl.formatMessage(messages.frameworks))
      expect(text).toHaveClass(stylesTopNavBarLink.pageCursorPointer);

      fireEvent.click(text);
      expect(spySetPageWizardPageAction).toHaveBeenCalled();
    });

    it("Add Frameworks number", () => {
      wrapper = renderWithStore(<TopNavBar />, store);
      const number = wrapper.getByText("2")
      expect(number).toHaveClass(stylesTopNavBarLink.pageCursorPointer);

      fireEvent.click(number);
      expect(spySetPageWizardPageAction).toHaveBeenCalled();
    });

    it("Add Pages Text", () => {
      wrapper = renderWithStore(<TopNavBar />, store);
      const text = wrapper.getByText(intl.formatMessage(messages.pages))
      expect(text).toHaveClass(stylesTopNavBarLink.pageCursorPointer);

      fireEvent.click(text);
      expect(spySetPageWizardPageAction).toHaveBeenCalled();
    });

    it("Add Pages Number", () => {
      wrapper = renderWithStore(<TopNavBar />, store);
      const number = wrapper.getByText("3")
      expect(number).toHaveClass(stylesTopNavBarLink.pageCursorPointer);

      fireEvent.click(number);
      expect(spySetPageWizardPageAction).toHaveBeenCalled();
    });

    it("Add Optional Cloud Service text", () => {
      wrapper = renderWithStore(<TopNavBar />, store);
      const text = wrapper.getByText(intl.formatMessage(messages.services))
      expect(text).toHaveClass(stylesTopNavBarLink.pageCursorPointer);

      fireEvent.click(text);
      expect(spySetPageWizardPageAction).toHaveBeenCalled();
    });

    it("Add Optional Cloud Service number", () => {
      wrapper = renderWithStore(<TopNavBar />, store);
      const number = wrapper.getByText("4")
      expect(number).toHaveClass(stylesTopNavBarLink.pageCursorPointer);

      fireEvent.click(number);
      expect(spySetPageWizardPageAction).toHaveBeenCalled();
    });

    it("Summary text", () => {
      wrapper = renderWithStore(<TopNavBar />, store);
      const text = wrapper.getByText(intl.formatMessage(messages.summary))
      expect(text).toHaveClass(stylesTopNavBarLink.pageCursorPointer);

      fireEvent.click(text);
      expect(spySetPageWizardPageAction).toHaveBeenCalled();
    });

    it("Summary number", () => {
      wrapper = renderWithStore(<TopNavBar />, store);
      const number = wrapper.getByText("5")
      expect(number).toHaveClass(stylesTopNavBarLink.pageCursorPointer);

      fireEvent.click(number);
      expect(spySetPageWizardPageAction).toHaveBeenCalled();
    });
  });

  describe("When is disabled button ", () => {

    beforeEach(() => {
      initialState = getInitialState();
      initialState.userSelection.projectNameObject.projectName="";
      initialState.userSelection.projectNameObject.validation.isValid=false;
      store = mockStore(initialState);
      spySetPageWizardPageAction.mockClear();
    });

    it("renders without crashing", () => {
      wrapper = renderWithStore(<TopNavBar />, store);
      expect(wrapper).toBeDefined();
    });

    it("New Project text", () => {
      wrapper = renderWithStore(<TopNavBar />, store);
      const text = wrapper.getByText(intl.formatMessage(messages.welcome))
      expect(text).not.toHaveClass(stylesTopNavBarLink.pageCursorPointer);

      fireEvent.click(text);
      expect(spySetPageWizardPageAction).not.toHaveBeenCalled();
    });

    it("New Project number", () => {
      wrapper = renderWithStore(<TopNavBar />, store);
      const number = wrapper.getByText("1")
      expect(number).not.toHaveClass(stylesTopNavBarLink.pageCursorPointer);

      fireEvent.click(number);
      expect(spySetPageWizardPageAction).not.toHaveBeenCalled();
    });

    it("Add Frameworks text", () => {
      wrapper = renderWithStore(<TopNavBar />, store);
      const text = wrapper.getByText(intl.formatMessage(messages.frameworks))
      expect(text).not.toHaveClass(stylesTopNavBarLink.pageCursorPointer);

      fireEvent.click(text);
      expect(spySetPageWizardPageAction).not.toHaveBeenCalled();
    });

    it("Add Frameworks number", () => {
      wrapper = renderWithStore(<TopNavBar />, store);
      const number = wrapper.getByText("2")
      expect(number).not.toHaveClass(stylesTopNavBarLink.pageCursorPointer);

      fireEvent.click(number);
      expect(spySetPageWizardPageAction).not.toHaveBeenCalled();
    });

    it("Add Pages Text", () => {
      wrapper = renderWithStore(<TopNavBar />, store);
      const text = wrapper.getByText(intl.formatMessage(messages.pages))
      expect(text).not.toHaveClass(stylesTopNavBarLink.pageCursorPointer);

      fireEvent.click(text);
      expect(spySetPageWizardPageAction).not.toHaveBeenCalled();
    });

    it("Add Pages Number", () => {
      wrapper = renderWithStore(<TopNavBar />, store);
      const number = wrapper.getByText("3")
      expect(number).not.toHaveClass(stylesTopNavBarLink.pageCursorPointer);

      fireEvent.click(number);
      expect(spySetPageWizardPageAction).not.toHaveBeenCalled();
    });

    it("Add Optional Cloud Service text", () => {
      wrapper = renderWithStore(<TopNavBar />, store);
      const text = wrapper.getByText(intl.formatMessage(messages.services))
      expect(text).not.toHaveClass(stylesTopNavBarLink.pageCursorPointer);

      fireEvent.click(text);
      expect(spySetPageWizardPageAction).not.toHaveBeenCalled();
    });

    it("Add Optional Cloud Service number", () => {
      wrapper = renderWithStore(<TopNavBar />, store);
      const number = wrapper.getByText("4")
      expect(number).not.toHaveClass(stylesTopNavBarLink.pageCursorPointer);

      fireEvent.click(number);
      expect(spySetPageWizardPageAction).not.toHaveBeenCalled();
    });

    it("Summary text", () => {
      wrapper = renderWithStore(<TopNavBar />, store);
      const text = wrapper.getByText(intl.formatMessage(messages.summary))
      expect(text).not.toHaveClass(stylesTopNavBarLink.pageCursorPointer);

      fireEvent.click(text);
      expect(spySetPageWizardPageAction).not.toHaveBeenCalled();
    });

    it("Summary number", () => {
      wrapper = renderWithStore(<TopNavBar />, store);
      const number = wrapper.getByText("5")
      expect(number).not.toHaveClass(stylesTopNavBarLink.pageCursorPointer);

      fireEvent.click(number);
      expect(spySetPageWizardPageAction).not.toHaveBeenCalled();
    });
  });
});
