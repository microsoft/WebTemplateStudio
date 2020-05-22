import * as React from "react";
import configureMockStore from "redux-mock-store";
import { renderWithStore } from "../../testUtils";
import { getInitialState, addFeaturesOptions, setAzureEmail, getServicesGroups } from "../../mockData/mockStore";
import messages from "./messages";
import { fireEvent, waitFor } from "@testing-library/react";
import { azureLogout } from "../../utils/extensionService/extensionService";
import { logOutAzureAction } from "../../store/config/azure/action";
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

  it("renders title and optional box message", () => {
    const wrapper = renderWithStore(<PageAddServices {...props} />, store);
    expect(wrapper.getByText(intl.formatMessage(messages.optionalBoxMessage))).toBeDefined();
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

    it("Sign out button should not be render", () => {
      const wrapper = renderWithStore(<PageAddServices {...props} />, store);
      const signOutButton = wrapper.queryByText(intl.formatMessage(messages.signOut));
      expect(signOutButton).not.toBeInTheDocument();
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

    it("Email detail and sign out button should be render", () => {
      const wrapper = renderWithStore(<PageAddServices {...props} />, store);

      expect(wrapper.queryByTestId(mockEmail)).toBeDefined();
      const signOutButton = wrapper.getByText(intl.formatMessage(messages.signOut));
      expect(signOutButton).toBeDefined();
    });

    it("If click on sign out button, logOutAzureAction should be called", async () => {
      const wrapper = renderWithStore(<PageAddServices {...props} />, store);
      const signOutButton = wrapper.getByText(intl.formatMessage(messages.signOut));
      fireEvent.click(signOutButton);

      await waitFor(() => {
        expect(azureLogout).toBeCalled();
        expect(logOutAzureAction).toHaveBeenCalled();
      });
    });
  });
});
