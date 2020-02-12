import * as React from "react";
import configureMockStore from "redux-mock-store";
import { azureMessages } from "../../../mockData/azureServiceOptions";
import PageCard from "./index";
import { Provider } from "react-redux";
import { getInitialState, loadMasters } from "../../../mockData/mockStore";

xdescribe("PageCard Index", () => {
  let props: any;
  let wrapper: any;
  let store: any;
  let svgUrl: string;
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
    svgUrl = props.page.internalName;
    svgUrl = svgUrl.substring(svgUrl.indexOf('React'));
    svgUrl = svgUrl.substring(svgUrl.indexOf('.')+1).toLowerCase() + 'page.svg';

    wrapper = mountWithIntl(
      <Provider store={store}>
        <PageCard {...props} />
      </Provider>
    ).children();
  });

  it("test instance", ()=>{
    expect(wrapper).toBeDefined();
  });

  it("test DOM", ()=>{
    const svgUrlWrapper = wrapper.find("svg").text();
    expect(svgUrlWrapper).toBe(svgUrl);
  });

  it("dont show add button", ()=>{
    expect(wrapper.find('#btnAddPage')).toHaveLength(0);
  });

  it("show add button", ()=>{
    console.log("qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq")
    console.log("qq..->" + wrapper.instance().addPage);
    wrapper.find('div[role="button"]').simulate('mouseOver');
    expect(wrapper.find('#btnAddPage')).toHaveLength(1);
    //expect(spy).toHaveBeenCalled();
  });
});
