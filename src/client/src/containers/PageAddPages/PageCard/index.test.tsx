jest.mock('../../../actions/wizardSelectionActions/selectPages',()=>{
 
  const fn1 = (pages: ISelected[]) => ({
    type: "WIZARD_SELECTION_TYPEKEYS.SELECT_PAGES",
    payload: pages
  });
  const fn2 = () => ({
    type: "WIZARD_SELECTION_TYPEKEYS.RESET_PAGES"
  });
  return {
    selectPagesAction: jest.fn(fn1),
    resetPagesAction: jest.fn(fn2)
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

describe("PageCard Index", () => {
  let props: any;
  let wrapper: any;
  let wrapper2: any;
  let store: any;
  const mockStore = configureMockStore();

  beforeEach(()=>{
    let initialState = getInitialState();
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
    const pageCard = wrapper.getByTestId("pageCard");
    expect(pageCard.children.length).toBe(1);
  });

  it("dont show button add page", ()=>{
    expect(wrapper.queryByTestId("addPage")).toBe(null);
  });

  it("check img svg", ()=>{
    let svgUrl = props.page.internalName;
    svgUrl = svgUrl.substring(svgUrl.indexOf('React'));
    svgUrl = svgUrl.substring(svgUrl.indexOf('.')+1).toLowerCase() + 'page.svg';
    const svgUrlWrapper = wrapper.getByText(svgUrl);
    expect(svgUrlWrapper).toBeDefined();
  });

  it("on mouse over show button add page", ()=>{
    fireEvent.mouseOver(wrapper.getByTestId("pageCard"));
    const addPage = wrapper.getByTestId("addPage");
    expect(addPage.children.length).toBe(1);
  });

  it("add page", ()=>{
    fireEvent.click(wrapper.getByTestId("pageCard"));
    expect(selectPagesAction).toBeCalled();
    console.log(wrapper.getByTestId("pageCard").children[0].innerHTML);
  });
});
