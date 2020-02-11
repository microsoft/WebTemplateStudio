import * as React from "react";
import configureMockStore from "redux-mock-store";
import { azureMessages } from "../../../mockData/azureServiceOptions";
import PageCard from "./index";
import { Provider } from "react-redux";
import { getInitialState } from "../../../mockData/testing";

xdescribe("PageCard Index", () => {
  let props: any;
  let wrapper: any;
  let store: any;
  const mockStore = configureMockStore();

  beforeEach(()=>{
    let initialState = getInitialState('React');
    store = mockStore(initialState);
    props = {
      page: initialState.wizardContent.pageOptions[0],
      isModal:false,
      intl: global.intl
    };
    wrapper = mountWithIntl(
      <Provider store={store}>
        <PageCard {...props} />
      </Provider>
    ).children();
  });

  it("test instance", ()=>{
    

    //renders without crashing
    expect(wrapper).toBeDefined();
  });
});
