import "@testing-library/jest-dom";
import "@testing-library/jest-dom/extend-expect";

import { fireEvent, RenderResult } from "@testing-library/react";
import * as React from "react";
import configureMockStore from "redux-mock-store";

import { getInitialState } from "../../mockData/mockStore";
import { AppState } from "../../store/combineReducers";
import * as routesNavsAction from "../../store/navigation/routesNavItems/actions";
import { renderWithStore } from "../../testUtils";
import messages from "../../utils/routes/messages";
import stylesTopNavBarLink from "../TopNavBarLink/styles.module.css";
import TopNavBar from ".";
const spySetRoutesAction = jest.spyOn(routesNavsAction, "setRoutesAction");

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
      const text = wrapper.getByText(intl.formatMessage(messages.welcome));
      expect(text).toHaveClass(stylesTopNavBarLink.pageCursorPointer);

      fireEvent.click(text);
      expect(spySetRoutesAction).toHaveBeenCalled();
    });
  });
});
