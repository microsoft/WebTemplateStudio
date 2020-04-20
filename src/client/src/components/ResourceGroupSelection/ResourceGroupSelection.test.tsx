import * as React from "react";
import "@testing-library/jest-dom";
import configureMockStore from "redux-mock-store";
import ResourceGroupSelection from ".";
import { RenderResult, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { renderWithStore } from "../../testUtils";
import messages from "./messages";
import { AZURE_LINKS } from "../../utils/constants";
import { getInitialState, setSubscriptions } from "../../mockData/mockStore";
import * as extensionService from '../../utils/extensionService/extensionService';

jest.mock("../Dropdown", () => require('../../testUtils').dropdownMock);
const spyGetResourceGroups = jest.spyOn(extensionService, 'getResourceGroups');

describe("ResourceGroupSelection", () => {
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
      subscription: "subscription 1",
      resourceGroup: "",
      onResourceGroupChange: jest.fn()
    };
  });

  it("renders without crashing", () => {
    wrapper = renderWithStore(<ResourceGroupSelection {...props} />, store);
    expect(wrapper).toBeDefined();
  });

  it("If has not subscription, dropdown and refresh button should be disabled", () => {
    props.subscription = "";
    wrapper = renderWithStore(<ResourceGroupSelection {...props} />, store);
    //const dropdown = wrapper.getByTestId("dropdown");
    //expect(dropdown).toBeDisabled();
      const refreshButton = wrapper.getByTestId("refresh-button");
      expect(refreshButton).toBeDisabled();
  });

  it("If has subscription, dropdown and refresh button should be enabled", () => {
    props.subscription = "subscription 1";
    wrapper = renderWithStore(<ResourceGroupSelection {...props} />, store);
    //const dropdown = wrapper.getByTestId("dropdown");
    //expect(dropdown).toBeEnabled();
      const refreshButton = wrapper.getByTestId("refresh-button");
      expect(refreshButton).toBeEnabled();
  });  

  it("If has subscription, , getResourceGroups should be called", async () => {
    props.subscription = "subscription 1";
    wrapper = renderWithStore(<ResourceGroupSelection {...props} />, store);
    await waitFor(() => {
      expect(spyGetResourceGroups).toHaveBeenCalled();
    });
  });

  it("If has initial resource group, onResourceGroupChange notify selected resource group", async () => {
    props.resourceGroup = "resourceGroupMock 1";
    wrapper = renderWithStore(<ResourceGroupSelection {...props} />, store);
    await waitFor(() => {
      expect(props.onResourceGroupChange).toHaveBeenCalledWith("resourceGroupMock 1");
    });
  });

  xit("When selected an resource group in a dropdown, onResourceGroupChange notify selected resource group", () => {
    const selectedResourceGroup = "resourceGroupMock 1";
    wrapper = renderWithStore(<ResourceGroupSelection {...props} />, store);
    const dropdown = wrapper.getByTestId("dropdown");
    fireEvent.change(dropdown, { target: { label: selectedResourceGroup, value: selectedResourceGroup } });
    expect(props.onResourceGroupChange).toHaveBeenCalledWith(selectedResourceGroup);
  });

  it("Has a create new resource group link", () => {
    wrapper = renderWithStore(<ResourceGroupSelection {...props} />, store);
    const link = wrapper.getByText(intl.formatMessage(messages.newResourceGroupLink))
    expect(link).toHaveAttribute("href", AZURE_LINKS.CREATE_NEW_RESOURCE_GROUP);
  });  

  it("When click on refresh button, getResourceGroups should be called", async () => {
    wrapper = renderWithStore(<ResourceGroupSelection {...props} />, store);
    const refreshButton = wrapper.getByTestId("refresh-button");
    fireEvent.click(refreshButton);
    await waitFor(() => {
      expect(spyGetResourceGroups).toHaveBeenCalled();
    });
  });
});
