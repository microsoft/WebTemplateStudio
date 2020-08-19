import * as React from "react";
import configureMockStore from "redux-mock-store";
import '@testing-library/jest-dom';
import TopNavBar from ".";
import { getInitialState } from "../../mockData/mockStore";
import { RenderResult, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { renderWithStore } from "../../testUtils";
import {messages} from "../../utils/constants/routes";
import stylesTopNavBarLink from "../TopNavBarLink/styles.module.css";
import { AppState } from "../../store/combineReducers";
import * as routesNavsAction from "../../store/navigation/routesNavItems/actions";
const spySetRoutesAction = jest.spyOn(routesNavsAction, 'setRoutesAction');

describe("TopNavBar", () => {
  let wrapper: RenderResult;
  let store: any;
  let initialState: AppState;
  const mockStore = configureMockStore();

  describe("When is enable button ", () => {

    beforeEach(() => {
      initialState = getInitialState();
      store = mockStore(initialState);
      spySetRoutesAction.mockClear();
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
      expect(spySetRoutesAction).toHaveBeenCalled();
    });

    xit("New Project number", () => {
      wrapper = renderWithStore(<TopNavBar />, store);
      const number = wrapper.getByText("1")
      expect(number).toHaveClass(stylesTopNavBarLink.pageCursorPointer);

      fireEvent.click(number);
      expect(spySetRoutesAction).toHaveBeenCalled();
    });

    xit("Add Frameworks text", () => {
      wrapper = renderWithStore(<TopNavBar />, store);
      const text = wrapper.getByText(intl.formatMessage(messages.frameworks))
      expect(text).toHaveClass(stylesTopNavBarLink.pageCursorPointer);

      fireEvent.click(text);
      expect(spySetRoutesAction).toHaveBeenCalled();
    });

    xit("Add Frameworks number", () => {
      wrapper = renderWithStore(<TopNavBar />, store);
      const number = wrapper.getByText("2")
      expect(number).toHaveClass(stylesTopNavBarLink.pageCursorPointer);

      fireEvent.click(number);
      expect(spySetRoutesAction).toHaveBeenCalled();
    });

    xit("Add Pages Text", () => {
      wrapper = renderWithStore(<TopNavBar />, store);
      const text = wrapper.getByText(intl.formatMessage(messages.pages))
      expect(text).toHaveClass(stylesTopNavBarLink.pageCursorPointer);

      fireEvent.click(text);
      expect(spySetRoutesAction).toHaveBeenCalled();
    });

    xit("Add Pages Number", () => {
      wrapper = renderWithStore(<TopNavBar />, store);
      const number = wrapper.getByText("3")
      expect(number).toHaveClass(stylesTopNavBarLink.pageCursorPointer);

      fireEvent.click(number);
      expect(spySetRoutesAction).toHaveBeenCalled();
    });

    xit("Add Optional Cloud Service text", () => {
      wrapper = renderWithStore(<TopNavBar />, store);
      const text = wrapper.getByText(intl.formatMessage(messages.services))
      expect(text).toHaveClass(stylesTopNavBarLink.pageCursorPointer);

      fireEvent.click(text);
      expect(spySetRoutesAction).toHaveBeenCalled();
    });

    xit("Add Optional Cloud Service number", () => {
      wrapper = renderWithStore(<TopNavBar />, store);
      const number = wrapper.getByText("4")
      expect(number).toHaveClass(stylesTopNavBarLink.pageCursorPointer);

      fireEvent.click(number);
      expect(spySetRoutesAction).toHaveBeenCalled();
    });

    xit("Summary text", () => {
      wrapper = renderWithStore(<TopNavBar />, store);
      const text = wrapper.getByText(intl.formatMessage(messages.summary))
      expect(text).toHaveClass(stylesTopNavBarLink.pageCursorPointer);

      fireEvent.click(text);
      expect(spySetRoutesAction).toHaveBeenCalled();
    });

    xit("Summary number", () => {
      wrapper = renderWithStore(<TopNavBar />, store);
      const number = wrapper.getByText("5")
      expect(number).toHaveClass(stylesTopNavBarLink.pageCursorPointer);

      fireEvent.click(number);
      expect(spySetRoutesAction).toHaveBeenCalled();
    });
  });
});
