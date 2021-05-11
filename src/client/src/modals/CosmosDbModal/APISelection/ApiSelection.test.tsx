import "@testing-library/jest-dom";
import "@testing-library/jest-dom/extend-expect";

import { fireEvent, RenderResult } from "@testing-library/react";
import * as React from "react";

import { renderWithIntl } from "../../../testUtils";
import { AZURE } from "../../../utils/constants/azure";
import ApiSelection from ".";

jest.mock("../../../components/Dropdown", () => require("../../../testUtils").dropdownMock);

describe("ApiSelection", () => {
  let props: any;
  let wrapper: RenderResult;

  beforeEach(() => {
    props = {
      initialApi: "",
      onApiChange: jest.fn(),
    };
  });

  it("renders without crashing", () => {
    wrapper = renderWithIntl(<ApiSelection {...props} />);
    expect(wrapper).toBeDefined();
  });

  it("If has initial Api, onApiChange notify selected Api", () => {
    props.initialApi = AZURE.COSMOS_APIS.MONGO;
    wrapper = renderWithIntl(<ApiSelection {...props} />);
    expect(props.onApiChange).toHaveBeenCalledTimes(1);
    expect(props.onApiChange).toHaveBeenCalledWith(AZURE.COSMOS_APIS.MONGO);
  });

  it("When selected an Api in a dropdown, onApiChange notify selected Api", () => {
    const selectedApi = AZURE.COSMOS_APIS.SQL;
    wrapper = renderWithIntl(<ApiSelection {...props} />);
    const dropdown = wrapper.getByTestId("dropdown");
    fireEvent.change(dropdown, { target: { label: selectedApi, value: selectedApi } });
    expect(props.onApiChange).toHaveBeenCalledTimes(1);
    expect(props.onApiChange).toHaveBeenCalledWith(selectedApi);
  });
});
