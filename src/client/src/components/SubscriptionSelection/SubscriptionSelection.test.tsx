import * as React from "react";
import configureMockStore from "redux-mock-store";
import SubscriptionSelection from ".";
import messages from "./messages";
import { Provider } from "react-redux";
import { getInitialState, setSubscriptions } from "../../mockData/mockStore";
import { render, RenderResult } from "@testing-library/react";
import { IntlProvider } from "react-intl";
import { AZURE_LINKS } from "../../utils/constants";

const renderWithIntl = (component: any) => {
  return render(<IntlProvider locale="en">{component}</IntlProvider>)
}

const renderWithStore = (component: any, store: any) => {
  return renderWithIntl(<Provider store={store}>{component}</Provider>)
}

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
      initialSubscription: "",
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

  it("Has a create new subscription link", () => {
    const {getByText} = renderWithStore(<SubscriptionSelection {...props} />, store);
    const linkText = intl.formatMessage(messages.newSubscriptionLink);
      const newSubscriptionLink = getByText(linkText);
      expect(newSubscriptionLink).toBeInTheDocument();
      expect(newSubscriptionLink).toHaveAttribute('href', AZURE_LINKS.CREATE_NEW_SUBSCRIPTION);
  });




  describe("When selected a subscription in a dropdown", () => {
    beforeEach(() => {      
      wrapper = renderWithStore(<SubscriptionSelection {...props} />, store);
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
        isMicrosoftLearn: false,
      };
      const select = wrapper.getByRole("Select");
      select.props().onChange(event);
      expect(props.onSubscriptionChange).toHaveBeenCalledWith(event.value);
    });
  });
});
