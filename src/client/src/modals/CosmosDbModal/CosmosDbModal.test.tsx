import * as React from "react";
import configureMockStore from "redux-mock-store";
import "@testing-library/jest-dom";
import CosmosDbModal from ".";
import { getInitialState, setOpenModal } from "../../mockData/mockStore";
import buttonStyles from "../../css/buttonStyles.module.css";
import "@testing-library/jest-dom/extend-expect";
import { renderWithStore } from "../../testUtils";
import messages from "./messages";
import { NAVIGATION_MODAL_TYPES } from "../../store/navigation/typeKeys";
import { waitFor, fireEvent, act } from "@testing-library/react";
import { closeModalAction } from "../../store/navigation/modals/action";
import { saveCosmosDbAction } from "../../store/userSelection/services/cosmosDb/action";
import { ICosmosDB } from "../../store/userSelection/services/cosmosDb/model";

jest.mock("../../components/SubscriptionSelection", () => {
  return (props: any) => {
    return (
      <button data-testid="subscriptions-mock-button" onClick={() => props.onSubscriptionChange("subscription 0")} />
    );
  };
});

jest.mock("./AccountNameEditor", () => {
  return (props: any) => {
    return (
      <div>
        <button
          data-testid="accountname-mock-button"
          onClick={() => {
            props.onIsAvailableAccountNameChange(true);
            props.onAccountNameChange("ValidAccountName");
          }}
        />

        <button
          data-testid="invalid-accountname-mock-button"
          onClick={() => {
            props.onIsAvailableAccountNameChange(false);
            props.onAccountNameChange("Invalid account name");
          }}
        />
      </div>
    );
  };
});

jest.mock("./APISelection", () => {
  return (props: any) => {
    return <button data-testid="api-mock-button" onClick={() => props.onApiChange("SQL")} />;
  };
});

jest.mock("../../store/navigation/modals/action", () => {
  const closeModalAction = jest.fn(() => ({
    type: "WTS/navigation/modals/CLOSE_MODALS",
  }));
  return { closeModalAction };
});

jest.mock("../../store/userSelection/services/cosmosDb/action", () => {
  const saveCosmosDbAction = jest.fn((cosmosDbSettings: ICosmosDB) => ({
    type: "WTS/azure/SAVE_COSMOS_DB",
    payload: cosmosDbSettings,
  }));
  return { saveCosmosDbAction };
});

describe("CosmosDbModal", () => {
  let props: any;
  let store: any;
  let initialState: any;
  const mockStore = configureMockStore();

  beforeEach(() => {
    initialState = getInitialState();
    setOpenModal(initialState, NAVIGATION_MODAL_TYPES.COSMOS_DB_MODAL);
    store = mockStore(initialState);
    props = {
      isModalOpen: true,
      closeModal: () => jest.fn(),
    };
  });

  it("renders without crashing", () => {
    const wrapper = renderWithStore(<CosmosDbModal {...props} />, store);
    act(()=>{
      expect(wrapper).toBeDefined();
    })
  });

  it("If has not cosmos selection in store, save button shold be disabled", () => {
    const { getByText } = renderWithStore(<CosmosDbModal {...props} />, store);
    act(()=>{
      const saveButton = getByText(intl.formatMessage(messages.save));
      expect(saveButton).toBeDisabled();
      expect(saveButton).toHaveClass(buttonStyles.buttonDark);
    })
  });

  it("If has valid subscription, account name and api, save button shold be enabled", async () => {
    const { getByText, getByTestId } = renderWithStore(<CosmosDbModal {...props} />, store);
    act(()=>{
      fireEvent.click(getByTestId("subscriptions-mock-button"));
      fireEvent.click(getByTestId("accountname-mock-button"));
      fireEvent.click(getByTestId("api-mock-button"));
    });

    await waitFor(() => {
      const saveButton = getByText(intl.formatMessage(messages.save));
      expect(saveButton).toBeEnabled();
      expect(saveButton).toHaveClass(buttonStyles.buttonHighlighted);
    });
  });

  it("If has valid subscription and api, and invalid account name, save button shold be disabled", async () => {
    const { getByText, getByTestId } = renderWithStore(<CosmosDbModal {...props} />, store);
    act(()=>{
      fireEvent.click(getByTestId("subscriptions-mock-button"));
      fireEvent.click(getByTestId("invalid-accountname-mock-button"));
      fireEvent.click(getByTestId("api-mock-button"));
    });

    await waitFor(() => {
      const saveButton = getByText(intl.formatMessage(messages.save));
      expect(saveButton).toBeDisabled();
      expect(saveButton).toHaveClass(buttonStyles.buttonDark);
    });
  });

  it("If has valid subscription and account name, and invalid api, save button shold be disabled", async () => {
    const { getByText, getByTestId } = renderWithStore(<CosmosDbModal {...props} />, store);
    act(()=>{
      fireEvent.click(getByTestId("subscriptions-mock-button"));
      fireEvent.click(getByTestId("invalid-accountname-mock-button"));
    });

    await waitFor(() => {
      const saveButton = getByText(intl.formatMessage(messages.save));
      expect(saveButton).toBeDisabled();
      expect(saveButton).toHaveClass(buttonStyles.buttonDark);
    });
  });

  it("If has valid subscription, account name and api and click on save button, save action should be called", async () => {
    const { getByText, getByTestId } = renderWithStore(<CosmosDbModal {...props} />, store);
    act(()=>{
      fireEvent.click(getByTestId("subscriptions-mock-button"));
      fireEvent.click(getByTestId("accountname-mock-button"));
      fireEvent.click(getByTestId("api-mock-button"));
    });

    await waitFor(() => {
      const saveButton = getByText(intl.formatMessage(messages.save));
      expect(saveButton).toBeEnabled();
      fireEvent.click(saveButton);
      expect(saveCosmosDbAction).toBeCalled();
    });
  });

  it("On press close button, close modal", () => {
    const { getByTestId } = renderWithStore(<CosmosDbModal {...props} />, store);
    act(()=>{
      fireEvent.click(getByTestId("close-button"));
      expect(closeModalAction).toBeCalled();
    });
  }); 
});