import * as React from "react";
import "@testing-library/jest-dom";
import ResourceGroupSelection from ".";
import { RenderResult, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { renderWithIntl } from "../../testUtils";
import {resourceGroups as mockResourceGroups} from "../../mockData/extensionModules/mockAzureModuleData";
import messages from "./messages";
import { AZURE_LINKS } from "../../utils/constants";

jest.mock("../../components/Dropdown", () => require("../../testUtils").dropdownMock);

describe("ResourceGroupSelection", () => {
  let props: any;
  let wrapper: RenderResult;

  beforeEach(() => {
    props = {
      isEnabled: true,
      resourceGroup: "",
      resourceGroups: mockResourceGroups,
      onResourceGroupChange: jest.fn(),
      onRefreshResourceGroup: jest.fn()
    };
  });

  it("renders without crashing", () => {
    wrapper = renderWithIntl(<ResourceGroupSelection {...props} />);
    expect(wrapper).toBeDefined();
  });

  it("If has initial resource group, onResourceGroupChange notify selected resource group", async () => {
    props.resourceGroup = "resourceGroupMock 1";
    wrapper = renderWithIntl(<ResourceGroupSelection {...props} />);
    await waitFor(() => {
      expect(props.onResourceGroupChange).toHaveBeenCalledTimes(1);
      expect(props.onResourceGroupChange).toHaveBeenCalledWith("resourceGroupMock 1");
    });
  });

  it("When selected an resource group in a dropdown, onResourceGroupChange notify selected resource group", () => {
    const selectedResourceGroup = "resourceGroupMock 1";
    wrapper = renderWithIntl(<ResourceGroupSelection {...props} />);
    const dropdown = wrapper.getByTestId("dropdown");
    fireEvent.change(dropdown, { target: { label: selectedResourceGroup, value: selectedResourceGroup } });
    expect(props.onResourceGroupChange).toHaveBeenCalledTimes(2);
    expect(props.onResourceGroupChange).toHaveBeenCalledWith(selectedResourceGroup);
  });

  it("Has a create new resource group link", () => {
    wrapper = renderWithIntl(<ResourceGroupSelection {...props} />);
    const link = wrapper.getByText(intl.formatMessage(messages.newResourceGroupLink))
    expect(link).toHaveAttribute("href", AZURE_LINKS.CREATE_NEW_RESOURCE_GROUP);
  });  

  it("When click on refresh button, onRefreshResourceGroup should be called", () => {
    wrapper = renderWithIntl(<ResourceGroupSelection {...props} />);
    const link = wrapper.getByText(intl.formatMessage(messages.refresh))
    fireEvent.click(link);
    expect(props.onRefreshResourceGroup).toHaveBeenCalledTimes(1);
  });
});
