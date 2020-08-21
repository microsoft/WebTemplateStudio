import * as React from "react";
import configureMockStore from "redux-mock-store";
import { renderWithStore } from "../../../testUtils";
import ServiceGroup from ".";
import { AppState } from "../../../store/combineReducers";
import { getInitialState } from "../../../mockData/mockStore";

jest.mock("../ServiceCard", () => {
  return () => {
    return <div data-testid="service-card-component"></div>;
  };
});

describe("ServiceGroup", () => {
  let props: any;
  let store: any;
  let initialState: AppState;
  const mockStore = configureMockStore<AppState>();

  const mockServiceGroup: IServiceGroup = {
    name: {
      id: "servicesSelector.serviceGroupHostingName",
      defaultMessage: "Cloud Hosting",
    },
    description: {
      id: "servicesSelector.serviceGroupHostingDescription",
      defaultMessage: "Publish your project to the web",
    },
    services: [],
  };

  beforeEach(() => {
    initialState = getInitialState();
    store = mockStore(initialState);
    props = {
      group: mockServiceGroup,
    };
  });

  it("renders without crashing", () => {
    const wrapper = renderWithStore(<ServiceGroup {...props} />, store);
    expect(wrapper).toBeDefined();
  });

  it("renders service group name and description", () => {
    const wrapper = renderWithStore(<ServiceGroup {...props} />, store);

    expect(wrapper.getByText(intl.formatMessage(mockServiceGroup.name))).toBeDefined();
    expect(wrapper.getByText(intl.formatMessage(mockServiceGroup.description))).toBeDefined();
  });

  it("should be the same number of service cards components as service", () => {
    const wrapper = renderWithStore(<ServiceGroup {...props} />, store);
    const servicesGroupsComponent = wrapper.queryAllByTestId("service-card-component");
    expect(servicesGroupsComponent.length).toBe(mockServiceGroup.services.length);
  });
});
