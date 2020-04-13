import * as React from "react";
import "@testing-library/jest-dom";
import LocationSelection from ".";
import { RenderResult, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { renderWithIntl } from "../../testUtils";
import {locations as mockLocations} from "../../mockData/extensionModules/mockAzureModuleData";

jest.mock("../../components/Dropdown", () => require("../../testUtils").dropdownMock);

describe("LocationSelection", () => {
  let props: any;
  let wrapper: RenderResult;

  beforeEach(() => {
    props = {
      location: "",
      locations: mockLocations,
      onLocationChange: jest.fn(),
    };
  });

  it("renders without crashing", () => {
    wrapper = renderWithIntl(<LocationSelection {...props} />);
    expect(wrapper).toBeDefined();
  });

  it("If has initial Location, onLocationChange notify selected location", async () => {
    props.location = "Central US";
    wrapper = renderWithIntl(<LocationSelection {...props} />);
    await waitFor(() => {
      expect(props.onLocationChange).toHaveBeenCalledTimes(1);
      expect(props.onLocationChange).toHaveBeenCalledWith("Central US");
    });
  });

  it("When selected an Api in a dropdown, onLocationChange notify selected Api", () => {
    const selectedLocation = "Central US";
    wrapper = renderWithIntl(<LocationSelection {...props} />);
    const dropdown = wrapper.getByTestId("dropdown");
    fireEvent.change(dropdown, { target: { label: selectedLocation, value: selectedLocation } });
    expect(props.onLocationChange).toHaveBeenCalledTimes(1);
    expect(props.onLocationChange).toHaveBeenCalledWith(selectedLocation);
  });
});
