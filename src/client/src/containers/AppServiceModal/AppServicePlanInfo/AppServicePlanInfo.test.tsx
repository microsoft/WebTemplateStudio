import * as React from "react";
import { azureMessages } from "../../../mockData/azureServiceOptions";
import AppServicePlanInfo from "./AppServicePlanInfo";

describe("AppServicePlanInfo", () => {
  let props: any;

  beforeEach(() => {
    props = {
      subscription: "",
      subscriptions: [
        {
          label: "subscription 1 label",
          value: "subscription 1 value",
          isMicrosoftLearnSubscription: true
        },
        {
          label: "subscription 2 label",
          value: "subscription 2 value",
          isMicrosoftLearnSubscription: false
        }
      ],
      intl: global.intl
    };
  });

  describe("When subscription is a Microsoft Learn Subscription", () => {
    let wrapper: any;

    beforeEach(() => {
      props.subscription = "subscription 1 value";
      wrapper = mountWithIntl(<AppServicePlanInfo {...props} />);
    });

    it("renders without crashing", () => {
      expect(wrapper).toBeDefined();
    });

    it("should have a free subscription message", () => {
      const intl = wrapper.props().intl;
      const message = wrapper.find("#message").text();
      expect(message).toBe(intl.formatMessage(azureMessages.appServiceFreeTierInfo));
    });
  });

  describe("When subscription is not a Microsoft Learn Subscription", () => {
    let wrapper: any;

    beforeEach(() => {      
      props.subscription = "subscription 2 value";
      wrapper = mountWithIntl(<AppServicePlanInfo {...props} />);
    });

    it("renders without crashing", () => {
      expect(wrapper).toBeDefined();
    });

    it("should have a basic subscription message", () => {
      const intl = wrapper.props().intl;
      const message = wrapper.find("#message").text();
      expect(message).toBe(intl.formatMessage(azureMessages.appServiceBasicTierInfo));
    });
  });
});