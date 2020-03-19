import * as React from "react";
import configureMockStore from "redux-mock-store";
import About from "./index";
import messages from "./messages";
import * as ReactRedux from 'react-redux'
import { getInitialState } from "../../../mockData/mockStore";
import { render, RenderResult, fireEvent } from "@testing-library/react";
import { IntlProvider } from "react-intl";
import { WEB_TEMPLATE_STUDIO_LINKS } from "../../../utils/constants";

describe("About", () => {
  let wrapper: RenderResult;
  let store: any;
  const mockStore = configureMockStore();

  describe("Tests", () => {
    const mockDispatch = jest.fn()
    beforeEach(() => {
      jest.spyOn(ReactRedux, 'useDispatch').mockReturnValue(mockDispatch)

      store = mockStore(getInitialState());
      wrapper = render(
        <IntlProvider locale="en">
          <ReactRedux.Provider store={store}>
            <About/>
          </ReactRedux.Provider>
        </IntlProvider>
      );
    });

    it("renders without crashing", () => {
      expect(wrapper).toBeDefined();
    });

    it("should have messages", () => {
      const expectedTextVisitRepo = intl.formatMessage(messages.visitRepo);
      const expectedTextReportIssue = intl.formatMessage(messages.reportIssue);
      const expectedTextTemplatesVersion = intl.formatMessage(messages.templatesVersion);
      const expectedTextWizardVersion = intl.formatMessage(messages.wizardVersion);
      expect(wrapper.getByText(expectedTextVisitRepo)).toBeDefined();
      expect(wrapper.getByText(expectedTextReportIssue)).toBeDefined();
      expect(wrapper.getByText(expectedTextTemplatesVersion + " " + store.getState().versions.templatesVersion)).toBeDefined();
      expect(wrapper.getByText(expectedTextWizardVersion + " " + store.getState().versions.wizardVersion)).toBeDefined();
    });
  });
});
