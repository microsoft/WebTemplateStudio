

import * as React from "react";
import configureMockStore from "redux-mock-store";
import PageAddPages from "./index";
import { Provider } from "react-redux";
import { getInitialState, loadMasters } from "../../mockData/mockStore";
import { render } from "@testing-library/react";
import {IntlProvider} from 'react-intl';
import messages from "./messages";


describe("PageAddPages", () => {
  let props: any;
  let wrapper: any;
  let store: any;
  let initialState: any;
  const mockStore = configureMockStore();

  beforeEach(()=>{
    initialState = getInitialState();
    loadMasters(initialState);
    store = mockStore(initialState);

    props = {
      isModal:true,
      intl: global.intl
    };

   wrapper = render(<IntlProvider locale="en"><Provider store={store}>
      <PageAddPages {...props} />
    </Provider></IntlProvider>);
  });

  it("check card components", ()=>{
    const buttonLength = wrapper.queryAllByRole("button").length;
    expect(buttonLength).toBe(initialState.wizardContent.pageOptions.length);
  });

  it("check title", ()=>{
    expect(wrapper.getByText(intl.formatMessage(messages.pagesTitleQuestion))).toBeDefined();
  });

 
});
