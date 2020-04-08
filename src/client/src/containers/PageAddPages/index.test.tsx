import * as React from "react";
import configureMockStore from "redux-mock-store";
import PageAddPages from "./index";
import { Provider } from "react-redux";
import { getInitialState, loadMasters } from "../../mockData/mockStore";
import { render } from "@testing-library/react";
import {IntlProvider} from 'react-intl';
import messages from "./messages";
import { AppState } from "../../store/combineReducers";


describe("PageAddPages", () => {
  let props: any;
  let wrapper: any;
  let store: any;
  let initialState: AppState;
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

  xit("check card components", ()=>{
    const buttonLength = wrapper.queryAllByRole("button").length;
    expect(buttonLength).toBe(initialState.templates.backendOptions.length + initialState.templates.frontendOptions.length);
  });

  it("check title", ()=>{
    expect(wrapper.getByText(intl.formatMessage(messages.pagesTitleQuestion))).toBeDefined();
  });

 
});
