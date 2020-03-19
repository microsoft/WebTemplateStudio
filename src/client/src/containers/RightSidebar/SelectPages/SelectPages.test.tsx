import * as React from "react";
import configureMockStore from "redux-mock-store";
import SelectPages from "./index";
import messages from "./messages";
import * as ReactRedux from 'react-redux'
import { getInitialState } from "../../../mockData/mockStore";
import { render, RenderResult, fireEvent } from "@testing-library/react";
import { IntlProvider } from "react-intl";

describe("About", () => {
  let wrapper: RenderResult;
  let store: any;
  const mockStore = configureMockStore();
  const props: any = {pathname:"/"};

  describe("Tests", () => {
    //const mockDispatch = jest.fn()
    
    beforeEach(() => {
      //jest.spyOn(ReactRedux, 'useDispatch').mockReturnValue(mockDispatch);
      store = mockStore(getInitialState());
      wrapper = render(
        <IntlProvider locale="en">
          <ReactRedux.Provider store={store}>
            <SelectPages {...props}/>
          </ReactRedux.Provider>
        </IntlProvider>
      );
    });

    it("renders without crashing", () => {
      expect(wrapper).toBeDefined();
    });

    it("should have messages", () => {
      const expectedTextPages = intl.formatMessage(messages.pages);
      expect(wrapper.getByText(expectedTextPages, { exact: false })).toBeDefined();
    });

    xit(`check link issue`, () => {
      fireEvent.click(wrapper.getByTestId('btnResetPages'));
    });
  });
});
