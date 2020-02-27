jest.mock('../../../actions/wizardSelectionActions/selectPages',()=>{
  const selectPagesAction = jest.fn((pages: ISelected[]) => ({
    type: "WIZARD_SELECTION_TYPEKEYS.SELECT_PAGES",
    payload: pages
  }));
  const resetPagesAction = jest.fn(() => ({
    type: "WIZARD_SELECTION_TYPEKEYS.RESET_PAGES"
  }));

  return {
    selectPagesAction,
    resetPagesAction
  }
});

import * as React from "react";
import configureMockStore from "redux-mock-store";
import PageCard from "./index";
import { Provider } from "react-redux";
import { getInitialState, loadMasters } from "../../../mockData/mockStore";
import { render, fireEvent } from "@testing-library/react";
import {IntlProvider} from 'react-intl';
import { ISelected } from "../../../types/selected";
import { selectPagesAction} from "../../../actions/wizardSelectionActions/selectPages";

describe("PageCard", () => {
  let props: any;
  let wrapper: any;
  let store: any;
  const mockStore = configureMockStore();

  beforeEach(()=>{
    const initialState = getInitialState();
    loadMasters(initialState);
    store = mockStore(initialState);
    props = {
      page: initialState.wizardContent.pageOptions[0],
      isModal:true,
      intl: global.intl
    };

   wrapper = render(<IntlProvider locale="en"><Provider store={store}>
      <PageCard {...props} />
    </Provider></IntlProvider>);
  });

  it("test instance", ()=>{
    const pageCard = wrapper.getByRole("button");
    expect(pageCard.children.length).toBe(1);
  });

  it("dont show button add page", ()=>{
    expect(wrapper.queryByRole("figure")).toBe(null);
  });

  it("check img svg", ()=>{
    let svgUrl = props.page.internalName;
    svgUrl = svgUrl.substring(svgUrl.indexOf('.')+1);
    svgUrl = svgUrl.substring(svgUrl.indexOf('.')+1);
    svgUrl = svgUrl.substring(svgUrl.indexOf('.')+1).toLowerCase() + 'page.svg';
    const svgUrlWrapper = wrapper.getByText(svgUrl);
    expect(svgUrlWrapper).toBeDefined();
  });

  it("on mouse over show button add page", ()=>{
    fireEvent.mouseOver(wrapper.getByRole("button"));
    const addPage = wrapper.getByRole("figure");
    expect(addPage).toBeDefined();
  });

  it("add page", ()=>{
    fireEvent.click(wrapper.getByRole("button"));
    expect(selectPagesAction).toBeCalled();
  });
});
