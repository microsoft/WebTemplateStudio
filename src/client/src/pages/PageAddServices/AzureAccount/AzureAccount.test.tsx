import * as React from "react";
import configureMockStore from "redux-mock-store";
import { renderWithStore } from "../../../testUtils";
import { getInitialState, setAzureEmail } from "../../../mockData/mockStore";
import messages from "./messages";
import { fireEvent, waitFor } from "@testing-library/react";
import { azureLogout } from "../../../utils/extensionService/extensionService";
import { logOutAzureAction } from "../../../store/config/azure/action";
import { AppState } from "../../../store/combineReducers";

import AzureAccount from ".";

jest.mock("../../../store/config/azure/action", () => {
  const logOutAzureAction = jest.fn(() => ({
    type: "WTS/azure/LOG_OUT_OF_AZURE",
  }));
  return {
    logOutAzureAction,
  };
});

jest.mock("../../../utils/extensionService/extensionService", () => {
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

describe("AzureAccount", () => {
  let props: any;
  let store: any;
  let initialState: AppState;
  const mockStore = configureMockStore<AppState>();

  beforeEach(() => {
    initialState = getInitialState();
    store = mockStore(initialState);
    props = {};
  });

  describe("When user is logged out", () => {
    beforeEach(() => {
      initialState = getInitialState();
      store = mockStore(initialState);
      props = {};
    });

    it("Sign in button should be render", () => {
      const wrapper = renderWithStore(<AzureAccount {...props} />, store);
      const signInButton = wrapper.queryByText(intl.formatMessage(messages.signIn));

      expect(signInButton).toBeInTheDocument();
    });

    it("Create new account should be render", () => {
      const wrapper = renderWithStore(<AzureAccount {...props} />, store);
      const createNewAccountButton = wrapper.queryByText(intl.formatMessage(messages.createAccount));

      expect(createNewAccountButton).toBeInTheDocument();
    });

    it("Email detail and sign out button should not be render", () => {
      const wrapper = renderWithStore(<AzureAccount {...props} />, store);

      const loggedInContainer = wrapper.queryByTestId("loggedInContainer");
      expect(loggedInContainer).not.toBeInTheDocument();
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

    it("Sign out button should be render", () => {
      const wrapper = renderWithStore(<AzureAccount {...props} />, store);
      const signOutButton = wrapper.queryByText(intl.formatMessage(messages.signOut));

      expect(signOutButton).toBeInTheDocument();
    });

    it("Email detail should be render", () => {
      const wrapper = renderWithStore(<AzureAccount {...props} />, store);

      expect(wrapper.queryByTestId(mockEmail)).toBeDefined();
    });

    it("If click on sign out button, logOutAzureAction should be called", async () => {
      const wrapper = renderWithStore(<AzureAccount {...props} />, store);
      const signOutButton = wrapper.getByText(intl.formatMessage(messages.signOut));
      fireEvent.click(signOutButton);

      await waitFor(() => {
        expect(azureLogout).toBeCalled();
        expect(logOutAzureAction).toHaveBeenCalled();
      });
    });

    //sign in and create new account test
  });
});
