jest.mock('../../../actions/modalActions/modalActions',()=>{
  return {
    openRedirectModalAction:jest.fn()
  }
});

import * as React from "react";
import configureMockStore from "redux-mock-store";
import About from "./index";
import messages from "./messages";
import * as ReactRedux from 'react-redux'
import { getInitialState } from "../../../mockData/mockStore";
import { render, RenderResult, fireEvent } from "@testing-library/react";
import { IntlProvider } from "react-intl";
import {openRedirectModalAction} from "../../../actions/modalActions/modalActions";
import { IRedirectModalData } from "../../RedirectModal";
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

    it(`check link repo`, () => {
      fireEvent.click(wrapper.getByTestId('linkRepo'));
      expect(mockDispatch).toBeCalled();
      const feedbackLinkData: IRedirectModalData = {
        redirectLink:WEB_TEMPLATE_STUDIO_LINKS.REPO,
        redirectLinkLabel: intl.formatMessage(
          messages.feedbackRedirectLinkLabel
        ),
        privacyStatementLink: "",
        isThirdPartyLink: false
      }
      expect(openRedirectModalAction).toBeCalledWith(feedbackLinkData);
    });

    it(`check link issue`, () => {
      fireEvent.click(wrapper.getByTestId('linkIssues'));
      expect(mockDispatch).toBeCalled();
      const feedbackLinkData: IRedirectModalData = {
        redirectLink:WEB_TEMPLATE_STUDIO_LINKS.ISSUES,
        redirectLinkLabel: intl.formatMessage(
          messages.feedbackRedirectLinkLabel
        ),
        privacyStatementLink: "",
        isThirdPartyLink: false
      }
      expect(openRedirectModalAction).toBeCalledWith(feedbackLinkData);
    });
  });
});
