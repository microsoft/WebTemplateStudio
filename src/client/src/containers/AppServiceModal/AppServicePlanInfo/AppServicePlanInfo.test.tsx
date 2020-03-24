import * as React from "react";
import configureMockStore from "redux-mock-store";
import { azureMessages } from "../../../mockData/azureServiceOptions";
import AppServicePlanInfo from ".";
import { Provider } from "react-redux";
import { getInitialState, setSubscriptions } from "../../../mockData/mockStore";
import { render, RenderResult } from "@testing-library/react";
import { IntlProvider } from "react-intl";

xdescribe("AppServicePlanInfo", () => {
  let props: any;
  let wrapper: RenderResult;
  let store: any;
  let initialState: any;
  const mockStore = configureMockStore();

  beforeEach(() => {
    initialState = getInitialState();
    setSubscriptions(initialState);
    store = mockStore(initialState);
    props = {};
  });

  describe("When subscription is a Microsoft Learn Subscription", () => {
    beforeEach(() => {
      props.subscription = { label: "Microsoft Learn Subscription", value: "Microsoft Learn Subscription" };
      wrapper = render(
        <IntlProvider locale="en">
          <Provider store={store}>
              <AppServicePlanInfo {...props} />
          </Provider>
        </IntlProvider>
      );
    });

    it("renders without crashing", () => {
      expect(wrapper).toBeDefined();
    });

    it("should have a free subscription message", () => {
      const expectedText = intl.formatMessage(azureMessages.appServiceFreeTierInfo);
      expect(wrapper.getByText(expectedText)).toBeDefined();
    });
  });

  describe("When subscription is not a Microsoft Learn Subscription", () => {
    beforeEach(() => {
      props.subscription = { label: "subscription 1 value", value: "subscription 1 value" };
      wrapper = render(
        <IntlProvider locale="en">
          <Provider store={store}>
            <AppServicePlanInfo {...props} />
          </Provider>
        </IntlProvider>
      );
    });

    it("renders without crashing", () => {
      expect(wrapper).toBeDefined();
    });

    it("should have a basic subscription message", () => {
      const expectedText = intl.formatMessage(azureMessages.appServiceBasicTierInfo);
      expect(wrapper.getByText(expectedText)).toBeDefined();
    });
  });
});
