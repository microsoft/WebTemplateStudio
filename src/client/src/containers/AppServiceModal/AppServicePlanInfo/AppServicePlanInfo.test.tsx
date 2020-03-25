import * as React from "react";
import configureMockStore from "redux-mock-store";
import AppServicePlanInfo from ".";
import { getInitialState, setSubscriptions } from "../../../mockData/mockStore";
import { RenderResult } from "@testing-library/react";
import { renderWithStore } from "../../../testUtils";
import messages from "./messages";

describe("AppServicePlanInfo", () => {
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

  it("renders without crashing", () => {
    wrapper = renderWithStore(<AppServicePlanInfo {...props} />, store);
    expect(wrapper).toBeDefined();
  });

  it("When subscription is a Microsoft Learn Subscription, should have a free subscription message", () => {
    props.subscription = "Microsoft Learn Subscription";
    wrapper = renderWithStore(<AppServicePlanInfo {...props} />, store);
    const expectedText = intl.formatMessage(messages.freeTierMessage);
    expect(wrapper.getByText(expectedText)).toBeDefined();
  });

  it("When subscription is not a Microsoft Learn Subscription, should have a basic subscription message", () => {
    props.subscription = "Subscription 0";
    wrapper = renderWithStore(<AppServicePlanInfo {...props} />, store);
    const expectedText = intl.formatMessage(messages.basicTierMessage);
    expect(wrapper.getByText(expectedText)).toBeDefined();
  });
});
