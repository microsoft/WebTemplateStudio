import * as React from "react";
import configureMockStore from "redux-mock-store";
import "@testing-library/jest-dom";
import AppServiceModal from ".";
import { getInitialState, setOpenModal } from "../../mockData/mockStore";
import buttonStyles from "../../css/buttonStyles.module.css";
import "@testing-library/jest-dom/extend-expect";
import { renderWithStore } from "../../testUtils";
import messages from "./messages";
import { NAVIGATION_MODAL_TYPES } from "../../store/navigation/typeKeys";
import { waitFor, fireEvent } from "@testing-library/react";
import { closeModalAction } from "../../store/navigation/modals/action";
import { saveAppServiceAction } from "../../store/userSelection/services/appService/action";
import { IAppService } from "../../store/userSelection/services/appService/model";

jest.mock("../../components/SubscriptionSelection", () => {
  return (props: any) => {
    return (
      <button data-testid="subscriptions-mock-button" onClick={() => props.onSubscriptionChange("subscription 0")} />
    );
  };
});

jest.mock("./AppNameEditor", () => {
  return (props: any) => {
    return (
      <div>
        <button
          data-testid="appname-mock-button"
          onClick={() => {
            props.onIsAvailableAppNameChange(true);
            props.onAppNameChange("ValidAppName");
          }}
        />

        <button
          data-testid="invalid-appname-mock-button"
          onClick={() => {
            props.onIsAvailableAppNameChange(false);
            props.onAppNameChange("Invalid app name");
          }}
        />
      </div>
    );
  };
});

jest.mock("../../store/navigation/modals/action", () => {
  const closeModalAction = jest.fn(() => ({
    type: "WTS/navigation/modals/CLOSE_MODALS",
  }));
  return { closeModalAction };
});

jest.mock("../../store/userSelection/services/appService/action", () => {
  const saveAppServiceAction = jest.fn((appService: IAppService) => ({
    type: "WTS/navigation/modals/CLOSE_MODALS",
    payload: appService,
  }));
  return { saveAppServiceAction };
});

describe("AppServiceModal", () => {
  let props: any;
  let store: any;
  let initialState: any;
  const mockStore = configureMockStore();

  beforeEach(() => {
    initialState = getInitialState();
    setOpenModal(initialState, NAVIGATION_MODAL_TYPES.APP_SERVICE_MODAL);
    store = mockStore(initialState);
    props = {
      isModalOpen: true,
      closeModal: () => jest.fn(),
    };
  });

  it("renders without crashing", () => {
    const wrapper = renderWithStore(<AppServiceModal {...props} />, store);
    expect(wrapper).toBeDefined();
  });

  it("If has not appService selection in store, save button shold be disabled", () => {
    const { getByText } = renderWithStore(<AppServiceModal {...props} />, store);
    const saveButton = getByText(intl.formatMessage(messages.save));
    expect(saveButton).toBeDisabled();
    expect(saveButton).toHaveClass(buttonStyles.buttonDark);
  });

  it("If has valid app name, save button shold be enabled", async () => {
    const { getByText, getByTestId } = renderWithStore(<AppServiceModal {...props} />, store);

    fireEvent.click(getByTestId("subscriptions-mock-button"));
    fireEvent.click(getByTestId("appname-mock-button"));

    await waitFor(() => {
      const saveButton = getByText(intl.formatMessage(messages.save));
      expect(saveButton).toBeEnabled();
      expect(saveButton).toHaveClass(buttonStyles.buttonHighlighted);
    });
  });

  it("If has invalid app name, save button shold be disabled", async () => {
    const { getByText, getByTestId } = renderWithStore(<AppServiceModal {...props} />, store);

    fireEvent.click(getByTestId("subscriptions-mock-button"));
    fireEvent.click(getByTestId("invalid-appname-mock-button"));

    await waitFor(() => {
      const saveButton = getByText(intl.formatMessage(messages.save));
      expect(saveButton).toBeDisabled();
      expect(saveButton).toHaveClass(buttonStyles.buttonDark);
    });
  });

  it("If has valid app name and click on save button, save action should be called", async () => {
    const { getByText, getByTestId } = renderWithStore(<AppServiceModal {...props} />, store);
    fireEvent.click(getByTestId("subscriptions-mock-button"));
    fireEvent.click(getByTestId("appname-mock-button"));

    await waitFor(() => {
      const saveButton = getByText(intl.formatMessage(messages.save));
      expect(saveButton).toBeEnabled();
      fireEvent.click(saveButton);
      expect(saveAppServiceAction).toBeCalled();
    });
  });

  it("On press close button, close modal", () => {
    const { getByTestId } = renderWithStore(<AppServiceModal {...props} />, store);
    fireEvent.click(getByTestId("close-button"));
    expect(closeModalAction).toBeCalled();
  });
});
