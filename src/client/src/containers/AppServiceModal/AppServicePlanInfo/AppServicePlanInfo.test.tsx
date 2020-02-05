import * as React from "react";
import { azureMessages } from "../../../mockData/azureServiceOptions";
import AppServicePlanInfo from "./AppServicePlanInfo";

describe("AppServicePlanInfo", () => {
  let props: any;

  beforeEach(() => {
    props = {
      subscription: {
        label: "",
        value: "",
        isMicrosoftLearnSubscription: null
      },
      intl: global.intl
    };
  });

  describe("When isMicrosoftLearnSubscription is true", () => {
    let wrapper: any;

    beforeEach(() => {
      props.subscription.isMicrosoftLearnSubscription = true;
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

  describe("When isMicrosoftLearnSubscription is false", () => {
    let wrapper: any;

    beforeEach(() => {
      props.subscription.isMicrosoftLearnSubscription = false;
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