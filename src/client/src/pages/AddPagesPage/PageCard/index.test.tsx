jest.mock("../../../store/userSelection/pages/action", () => {
  const setPagesAction = jest.fn((pages: ISelected[]) => ({
    type: "USERSELECTION_TYPEKEYS.SELECT_PAGES",
    payload: pages,
  }));

  return {
    setPagesAction,
  };
});

import { fireEvent, render } from "@testing-library/react";
import * as React from "react";
import { IntlProvider } from "react-intl";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";

import { getInitialState, loadMasters } from "../../../mockData/mockStore";
import { AppState } from "../../../store/combineReducers";
import { setPagesAction } from "../../../store/userSelection/pages/action";
import { ISelected } from "../../../types/selected";
import PageCard from "./index";

describe("PageCard", () => {
  let props: any;
  let wrapper: any;
  let store: any;
  const mockStore = configureMockStore();

  beforeEach(() => {
    const initialState: AppState = getInitialState();
    loadMasters(initialState);
    store = mockStore(initialState);
    props = {
      page: initialState.templates.pageOptions[0],
      isModal: true,
      intl: global.intl,
    };

    wrapper = render(
      <IntlProvider locale="en">
        <Provider store={store}>
          <PageCard {...props} />
        </Provider>
      </IntlProvider>
    );
  });

  it("dont show button add page", () => {
    expect(wrapper.queryByRole("figure")).toBe(null);
  });

  it("on mouse over show button add page", () => {
    fireEvent.mouseOver(wrapper.getByRole("button"));
    const addPage = wrapper.getByRole("figure");
    expect(addPage).toBeDefined();
  });

  it("add page", () => {
    fireEvent.click(wrapper.getByRole("button"));
    expect(setPagesAction).toBeCalled();
  });
});
