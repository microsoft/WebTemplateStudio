import * as React from "react";
import configureMockStore from "redux-mock-store";
import SubscriptionSelection from "./SubscriptionSelection";
import { Provider } from "react-redux";
import { getInitialState, setSubscriptions } from "../../../mockData/mockStore";
import { render, RenderResult } from "@testing-library/react";
import { IntlProvider } from "react-intl";

describe("SubscriptionSelection", () => {
  let props: any;
  let wrapper: RenderResult;
  let store: any;
  let initialState: any;
  const mockStore = configureMockStore();

  beforeEach(() => {
    initialState = getInitialState();
    setSubscriptions(initialState);
    store = mockStore(initialState);
    props = {
      onSubscriptionChange: jest.fn(),
    };
  });

  /*
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
      wrapper = render(
        <IntlProvider locale="en">
          <Provider store={store}>
            <SubscriptionSelection {...props} />
          </Provider>
        </IntlProvider>

      expect(wrapper).toBeDefined();
      const dropdown = wrapper.find("Dropdown");
      const dropdownValue = dropdown.prop("value").value;
      expect(dropdownValue).toEqual(result);
    }
  );*/

  describe("When selected a subscription in a dropdown", () => {
    beforeEach(() => {
      wrapper = render(
        <IntlProvider locale="en">
          <Provider store={store}>
            <SubscriptionSelection {...props} />
          </Provider>
        </IntlProvider>
      );
    });

    it("renders without crashing", () => {
      expect(wrapper).toBeDefined();
    });

    //TODO: Fix this test
    xit("Contais all subscription", () => {
      const select = wrapper.getAllByRole("option");
      expect(select).toEqual(props.subscriptions);
    });

    //TODO: Fix this test
    xit(`should launch subscription change event function`, () => {
      const event = {
        label: "subscription 3 label",
        value: "subscription 3 value",
        isMicrosoftLearnSubscription: false,
      };
      const select = wrapper.getByRole("Select");
      select.props().onChange(event);
      expect(props.onSubscriptionChange).toHaveBeenCalledWith(event.value);
    });
  });
});
