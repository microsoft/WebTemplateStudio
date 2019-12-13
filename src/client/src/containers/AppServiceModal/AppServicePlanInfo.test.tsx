import * as React from "react";
import { azureMessages } from "../../mockData/azureServiceOptions";
import AppServicePlanInfo from "./AppServicePlanInfo";

describe("AppServicePlanInfo", () => {
  let props: any;
  let wrapper: any;

  beforeEach(() => {
    props = {
      subscription: {
        label: "",
        value: "",
        isMicrosoftLearnSubscription: true
      },
      intl: global.intl
    };
    wrapper = mountWithIntl(<AppServicePlanInfo {...props} />);
  });

  it("renders without crashing", () => {
    expect(wrapper).toBeDefined();
  });

  it("should have free subscription message", () => {
    const intl = wrapper.props().intl;
    const message = wrapper.find("#message").text();
    expect(message).toBe(intl.formatMessage(azureMessages.appServiceFreeTierInfo));
  });
});
