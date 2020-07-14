import * as React from "react";
import configureMockStore from "redux-mock-store";
import '@testing-library/jest-dom';
import SubscriptionSelection from ".";
import { getInitialState, setSubscriptions } from "../../mockData/mockStore";
import { RenderResult, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { renderWithStore } from "../../testUtils";
import { AZURE_LINKS } from "../../utils/constants/constants";
import messages from "./messages";

jest.mock("../Dropdown", () => require('../../testUtils').dropdownMock);

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

  it("renders without crashing", () => {
    wrapper = renderWithStore(<SubscriptionSelection {...props} />, store);
    expect(wrapper).toBeDefined();
  }); 

  it("Has a create new subscription link", () => {
    wrapper = renderWithStore(<SubscriptionSelection {...props} />, store);
    const link = wrapper.getByText(intl.formatMessage(messages.newSubscriptionLink))
    expect(link).toHaveAttribute("href", AZURE_LINKS.CREATE_NEW_SUBSCRIPTION);
  });

  it("If has initial subscription, onSubscriptionChange notify selected subscription", () => {
    props.initialSubscription = "subscription 1";
    wrapper = renderWithStore(<SubscriptionSelection {...props} />, store);
    expect(props.onSubscriptionChange).toHaveBeenCalledTimes(1);
    expect(props.onSubscriptionChange).toHaveBeenCalledWith("subscription 1");
  });

  it("When selected a subscription in a dropdown, onSubscriptionChange notify selected subscription", () => {
    wrapper = renderWithStore(<SubscriptionSelection {...props} />, store);
    const dropdown = wrapper.getByTestId("dropdown");
    fireEvent.change(dropdown, { target: { label:"subscription 1", value:"subscription 1"}});
    expect(props.onSubscriptionChange).toHaveBeenCalledTimes(1);
    expect(props.onSubscriptionChange).toHaveBeenCalledWith("subscription 1");
  });
});
