import * as React from "react";
import "@testing-library/jest-dom";
import LocationSelection from ".";
import { RenderResult, fireEvent, waitFor, act } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { renderWithIntl } from "../../testUtils";
import { AzureResourceType } from "../../utils/constants/azure";
import * as extensionService from "../../utils/extensionService/extensionService";

jest.mock("../../components/Dropdown", () => require("../../testUtils").dropdownMock);
const spyGetLocations = jest.spyOn(extensionService, "getLocations");

describe("LocationSelection", () => {
  let props: any;
  let wrapper: RenderResult;

  beforeEach(() => {
    props = {
      location: "",
      subscription: "subscription 1",
      azureServiceType: AzureResourceType.AppService,
      onLocationChange: jest.fn(),
    };
  });

  it("renders without crashing", () => {
    act(() => {
      wrapper = renderWithIntl(<LocationSelection {...props} />);
      expect(wrapper).toBeDefined();
    });
  });

  xit("If has not subscription, dropdown should be disabled", () => {
    props.subscription = "";
    wrapper = renderWithIntl(<LocationSelection {...props} />);
    const dropdown = wrapper.getByTestId("dropdown");
    expect(dropdown).toBeDisabled();
  });

  it("If has subscription, dropdown should be enabled", () => {
    act(() => {
      props.subscription = "subscription 1";
      wrapper = renderWithIntl(<LocationSelection {...props} />);
      const dropdown = wrapper.getByTestId("dropdown");
      expect(dropdown).toBeEnabled();
    });
  });

  it("If has subscription, , getLoations should be called", async () => {
    act(() => {
      props.subscription = "subscription 1";
      wrapper = renderWithIntl(<LocationSelection {...props} />);
    });
    await waitFor(() => {
      expect(spyGetLocations).toHaveBeenCalled();
    });
  });

  it("If has initial Location, onLocationChange notify selected location", async () => {
    act(() => {
      props.location = "Central US";
      wrapper = renderWithIntl(<LocationSelection {...props} />);
    });
    await waitFor(() => {
      expect(props.onLocationChange).toHaveBeenCalledTimes(1);
      expect(props.onLocationChange).toHaveBeenCalledWith("Central US");
    });
  });

  xit("Wen selected an location in a dropdown, onLocationChange notify selected location", () => {
    const selectedLocation = "Central US";
    wrapper = renderWithIntl(<LocationSelection {...props} />);
    const dropdown = wrapper.getByTestId("dropdown");
    fireEvent.change(dropdown, { target: { label: selectedLocation, value: selectedLocation } });
    expect(props.onLocationChange).toHaveBeenCalledTimes(1);
    expect(props.onLocationChange).toHaveBeenCalledWith(selectedLocation);
  });
});
