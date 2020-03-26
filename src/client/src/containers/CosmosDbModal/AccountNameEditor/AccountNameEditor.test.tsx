import * as React from "react";
import configureMockStore from "redux-mock-store";
import AccountNameEditor from ".";
import styles from "./styles.module.css";
import "@testing-library/jest-dom/";
import { getInitialState } from "../../../mockData/mockStore";
import { waitForElementToBeRemoved } from "@testing-library/react";
import { renderWithStore } from "../../../testUtils";
import messages from "./messages";

describe("AccountNameEditor", () => {
  let props: any;
  let store: any;
  let initialState: any;
  const mockStore = configureMockStore();

  beforeEach(() => {
    initialState = getInitialState();
    store = mockStore(initialState);
    props = {
      subscription: "",
      accountName: "",
      onAccountNameChange: jest.fn(),
      onIsAvailableAccountNameChange: jest.fn(),
    };
  });

  it("renders without crashing", () => {
    const wrapper = renderWithStore(<AccountNameEditor {...props} />, store);
    expect(wrapper).toBeDefined();
  });

  it("If has not subscription, account name editor should be disabled", () => {
    const { container, getByLabelText } = renderWithStore(<AccountNameEditor {...props} />, store);
    const baseDiv = container.firstChild;
    expect(baseDiv).toHaveClass(styles.containerDisabled);
    const input = getByLabelText(intl.formatMessage(messages.ariaInputLabel));
    expect(input).toBeDisabled();
  });

  it("If has subscription, account name editor should be enabled", () => {
    props.subscription = "subscription 0";
    const { container, getByLabelText } = renderWithStore(<AccountNameEditor {...props} />, store);
    const baseDiv = container.firstChild;
    expect(baseDiv).not.toHaveClass(styles.containerDisabled);
    const input = getByLabelText(intl.formatMessage(messages.ariaInputLabel));
    expect(input).toBeEnabled();
  });

  it("If set account name, should be a validation spinner and when validation finished, show green check", async () => {
    props.subscription = "subscription 0";
    props.accountName = "accountName";
    const { queryByTestId } = renderWithStore(<AccountNameEditor {...props} />, store);

    expect(queryByTestId("spinner")).toBeInTheDocument();
    expect(queryByTestId("green-check")).not.toBeInTheDocument();
    expect(queryByTestId("error-message")).not.toBeInTheDocument();

    await waitForElementToBeRemoved(() => queryByTestId("spinner"));

    expect(queryByTestId("spinner")).not.toBeInTheDocument();
    expect(queryByTestId("green-check")).toBeInTheDocument();
    expect(queryByTestId("error-message")).not.toBeInTheDocument();
  });

  it("If set invalid account name, should be a validation spinner and when validation finished, show error message", async () => {
    props.subscription = "subscription 0";
    props.accountName = "name with spaces has invalid name";
    const { queryByTestId } = renderWithStore(<AccountNameEditor {...props} />, store);

    expect(queryByTestId("spinner")).toBeInTheDocument();
    expect(queryByTestId("green-check")).not.toBeInTheDocument();
    expect(queryByTestId("error-message")).not.toBeInTheDocument();

    await waitForElementToBeRemoved(() => queryByTestId("spinner"));

    expect(queryByTestId("spinner")).not.toBeInTheDocument();
    expect(queryByTestId("green-check")).not.toBeInTheDocument();
    expect(queryByTestId("error-message")).toBeInTheDocument();
  });
});
