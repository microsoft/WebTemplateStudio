import * as React from "react";
import SubscriptionSelection from "./SubscriptionSelection";

describe("SubscriptionSelection", () => {
  let props: any;

  beforeEach(() => {
    props = {
      intl: global.intl,
      subscription: "",
      subscriptions: [
        {
          label: "subscription 1 label",
          value: "subscription 1 value",
          isMicrosoftLearnSubscription: false
        },
        {
          label: "subscription 2 label",
          value: "subscription 2 value",
          isMicrosoftLearnSubscription: false
        },
        {
          label: "subscription 3 label",
          value: "subscription 3 value",
          isMicrosoftLearnSubscription: false
        }
      ],
      onSubscriptionChange: jest.fn()
    };
  });

  const subscriptionCases = [
    [null, "Select..."],
    [undefined, "Select..."],
    ["invalid subscription", "Select..."],
    ["subscription 2 value", "subscription 2 value"]
  ];

  test.each(subscriptionCases)(
    `when subscription is %p, should have %p value in a dropdown selected value`,
    (subscription, result) => {
      props.subscription = subscription;
      const wrapper = mountWithIntl(
        <SubscriptionSelection {...props} />
      ).children();

      expect(wrapper).toBeDefined();
      const dropdown = wrapper.find("Dropdown");
      const dropdownValue = dropdown.prop("value").value;
      expect(dropdownValue).toEqual(result);
    }
  );

  describe("When selected a subscription in a dropdown", () => {
    let wrapper: any;
    beforeEach(() => {
      wrapper = mountWithIntl(<SubscriptionSelection {...props} />).children();
    });

    it("renders without crashing", () => {
      expect(wrapper).toBeDefined();
    });

    it(`should launch subscription change event function`, () => {
      const event = {
        label: "subscription 3 label",
        value: "subscription 3 value",
        isMicrosoftLearnSubscription: false
      };
      const select = wrapper.find("Select").at(0);
      select.props().onChange(event);
      expect(props.onSubscriptionChange).toHaveBeenCalledWith(event.value);
    });
  });
});
