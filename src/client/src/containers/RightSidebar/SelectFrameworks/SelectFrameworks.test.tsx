import * as React from "react";
import configureMockStore from "redux-mock-store";
import SelectFrameworks from "./index";
import messages from "../strings";
import * as ReactRedux from 'react-redux'
import { getInitialState, addFrontEndFrameworksOptions, addBackEndFrameworksOptions, setFrontendFramework, setBackendFramework } from "../../../mockData/mockStore";
import { render, RenderResult } from "@testing-library/react";
import { IntlProvider } from "react-intl";
import { AppState } from "../../../reducers";
import { setSelectedBackendFrameworkAction } from "../../../actions/wizardSelectionActions/selectedBackEndFramework";

describe("SelectFrameworks", () => {
  let wrapper: RenderResult;
  let store: any;
  const mockStore = configureMockStore();

  describe("Tests", () => {
    beforeEach(() => {
      let initialState: AppState = getInitialState();
      addFrontEndFrameworksOptions(initialState);
      addBackEndFrameworksOptions(initialState);
      setBackendFramework(initialState,"React");
      setFrontendFramework(initialState,"Node");

      store = mockStore(initialState);
      wrapper = render(
        <IntlProvider locale="en">
          <ReactRedux.Provider store={store}>
            <SelectFrameworks/>
          </ReactRedux.Provider>
        </IntlProvider>
      );
    });

    it("renders without crashing", () => {
      expect(wrapper).toBeDefined();
    });

    it("should have messages", () => {
      const expectedTextFrontendFramework = intl.formatMessage(messages.frontendFramework);
      const expectedTextBackendFramework = intl.formatMessage(messages.backendFramework);
      expect(wrapper.getByText(expectedTextFrontendFramework)).toBeDefined();
      expect(wrapper.getByText(expectedTextBackendFramework)).toBeDefined();
    });

    xit("when change frontEnd framework", ()=>{
      const { title, internalName, version, author, licenses } = store.getState().wizardContent.frontendOptions[1];
      const newFrontEndFramework = { title: title as string, internalName, version, author, licenses };
      store.dispatch(setSelectedBackendFrameworkAction(newFrontEndFramework));
    })
  });
});
