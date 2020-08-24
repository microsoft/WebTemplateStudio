import * as React from "react";
import configureMockStore from "redux-mock-store";
import ProjectDetails from "./index";
import messages from "../strings";
import * as ReactRedux from 'react-redux'
import { getInitialState } from "../../../mockData/mockStore";
import { render, RenderResult } from "@testing-library/react";
import { IntlProvider } from "react-intl";

describe("About", () => {
  let wrapper: RenderResult;
  let store: any;
  const mockStore = configureMockStore();

  describe("Tests", () => {
    beforeEach(() => {
      store = mockStore(getInitialState());
      wrapper = render(
        <IntlProvider locale="en">
          <ReactRedux.Provider store={store}>
            <ProjectDetails/>
          </ReactRedux.Provider>
        </IntlProvider>
      );
    });

    it("renders without crashing", () => {
      expect(wrapper).toBeDefined();
    });

    it("should have messages", () => {
      const expectedTextYourProjectDetails = intl.formatMessage(messages.yourProjectDetails);
      const expectedTextProjectName = intl.formatMessage(messages.projectName);
      const expectedTextLocation = intl.formatMessage(messages.location);
      expect(wrapper.getByText(expectedTextYourProjectDetails)).toBeDefined();
      expect(wrapper.getByText(expectedTextProjectName + ':', { exact: false })).toBeDefined();
      expect(wrapper.getByText(expectedTextLocation + ':', { exact: false })).toBeDefined();
    });
  });
});
