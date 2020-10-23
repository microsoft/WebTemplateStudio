import * as React from "react";
import configureMockStore from "redux-mock-store";
import { renderWithStore } from "../../testUtils";
import { getInitialState, addFeaturesOptions, setAzureEmail, getServicesGroups } from "../../mockData/mockStore";
import messages from "./messages";
import { AppState } from "../../store/combineReducers";
import PageAddServices from ".";

jest.mock("./ServiceGroup", () => {
  return () => {
    return <div data-testid="service-group-component"></div>;
  };
});

jest.mock("../../store/config/azure/action", () => {
  const logOutAzureAction = jest.fn(() => ({
    type: "WTS/azure/LOG_OUT_OF_AZURE",
  }));
  return {
    logOutAzureAction,
  };
});

jest.mock("../../utils/extensionService/extensionService", () => {
  const azureLogout = jest.fn(() => ({
    data: {
      payload: {
        success: true,
      },
    },
  }));
  return {
    azureLogout,
  };
});

describe("PageAddServices", () => {
  let props: any;
  let store: any;
  let servicesGroups: string[];
  let initialState: AppState;
  const mockStore = configureMockStore<AppState>();

  beforeEach(() => {
    initialState = getInitialState();
    addFeaturesOptions(initialState);
    servicesGroups = getServicesGroups(initialState);
    store = mockStore(initialState);
    props = {};
  });

  it("renders without crashing", () => {
    const wrapper = renderWithStore(<PageAddServices {...props} />, store);
    expect(wrapper).toBeDefined();
  });

  it("renders title", () => {
    const wrapper = renderWithStore(<PageAddServices {...props} />, store);
    expect(wrapper.getByText(intl.formatMessage(messages.title))).toBeDefined();
  });

  it("should be the same number of service groups components as service groups in the store", () => {
    const wrapper = renderWithStore(<PageAddServices {...props} />, store);
    const servicesGroupsComponent = wrapper.queryAllByTestId("service-group-component");
    expect(servicesGroupsComponent.length).toBe(servicesGroups.length);
  });

  describe("When user is not logged in", () => {
    it("AzureStudent component should be render", () => {
      const wrapper = renderWithStore(<PageAddServices {...props} />, store);
      const AzureStudentComponent = wrapper.queryByTestId("azure-student-component");
      expect(AzureStudentComponent).toBeInTheDocument();
    });
  });

  describe("When user is logged in", () => {
    const mockEmail = "test@test.com";

    beforeEach(() => {
      initialState = getInitialState();
      setAzureEmail(initialState, mockEmail);
      store = mockStore(initialState);
      props = {};
    });

    it("AzureStudent component should not be render", () => {
      const wrapper = renderWithStore(<PageAddServices {...props} />, store);
      const AzureStudentComponent = wrapper.queryByTestId("azure-student-component");
      expect(AzureStudentComponent).not.toBeInTheDocument();
    });
  });
});
