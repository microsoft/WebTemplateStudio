import * as React from "react";
import SubscriptionSelection from "./SubscriptionSelection";
import configureMockStore from "redux-mock-store";
import { Provider } from "react-redux";

const mockStore = configureMockStore();

describe("SubscriptionSelection", () => {
  let props: any;
  let store: any;

  beforeEach(() => {
    props = {
      intl: global.intl,
      subscription: "",
      subscriptions: [],
      onSubscriptionChange: jest.fn()
    };
    store = mockStore({
      azureProfileData: {
        profileData: {
          subscriptions: [
            {
              label: "subscription 1",
              value: "subscription 1",
              isMicrosoftLearnSubscription: false
            },
            {
              label: "subscription 2",
              value: "subscription 2",
              isMicrosoftLearnSubscription: false
            },
            {
              label: "subscription 3",
              value: "subscription 3",
              isMicrosoftLearnSubscription: false
            }
          ]
        }
      }
    });
  });

  const subscriptionCases = [
    [null, "Select..."],
    [undefined, "Select..."],
    ["invalid subscription", "Select..."],
    ["subscription 2", "subscription 2"]
  ];

  test.each(subscriptionCases)(
    `when subscription is %p, should have %p value in a dropdown selected value`,
    (subscription, result) => {
      props.subscription = subscription;
      let wrapper = mountWithIntl(
        <Provider store={store}>
          <SubscriptionSelection {...props} />
        </Provider>
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
      wrapper = mountWithIntl(
        <Provider store={store}>
          <SubscriptionSelection {...props} />
        </Provider>
      ).children();
    });

    it("renders without crashing", () => {
      expect(wrapper).toBeDefined();
    });

    it(`should launch subscription change event function`, () => {
      const event = {
        label: "subscription 3",
        value: "subscription 3",
        isMicrosoftLearnSubscription: false
      };
      const select = wrapper.find("Select").at(0);
      select.props().onChange(event);
      expect(props.onSubscriptionChange).toHaveBeenCalledWith(event);
    });
  });
});
