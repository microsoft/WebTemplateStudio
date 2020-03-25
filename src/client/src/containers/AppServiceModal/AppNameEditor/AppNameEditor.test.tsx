import * as React from "react";
import configureMockStore from "redux-mock-store";
import AppNameEditor from ".";
import styles from "./styles.module.css";
import "@testing-library/jest-dom/";
import { getInitialState } from "../../../mockData/mockStore";
import { RenderResult } from "@testing-library/react";
import { renderWithStore } from "../../../testUtils";
import messages from "./messages";

describe("AppNameEditor", () => {
  let props: any;
  let wrapper: RenderResult;
  let store: any;
  let initialState: any;
  const mockStore = configureMockStore();

  beforeEach(() => {
    initialState = getInitialState();
    store = mockStore(initialState);
    props = {
        subscription: "",
        appName: "",
        onAppNameChange: jest.fn(),
        onIsAvailableAppNameChange: jest.fn()
    };
  });  

  it("renders without crashing", () => {
    wrapper = renderWithStore(<AppNameEditor {...props} />, store);
    expect(wrapper).toBeDefined();
  });

  it("If has not subscription, app name editor should be disabled", () => {
    wrapper = renderWithStore(<AppNameEditor {...props} />, store);
    const baseDiv = wrapper.container.firstChild;
    expect(baseDiv).toHaveClass(styles.containerDisabled);
    const input = wrapper.getByLabelText(intl.formatMessage(messages.ariaInputLabel));
    expect(input).toBeDisabled();
  });

  it("If has subscription, app name editor should be enabled", () => {
    props.subscription = "subscription 0";
    wrapper = renderWithStore(<AppNameEditor {...props} />, store);
    const baseDiv = wrapper.container.firstChild;
    expect(baseDiv).not.toHaveClass(styles.containerDisabled);
    const input = wrapper.getByLabelText(intl.formatMessage(messages.ariaInputLabel));
    expect(input).toBeEnabled();
  });
  
  it("If set app name, should be a validation spinner", () => {
    props.subscription = "subscription 0";
    props.appName = "appName";
    wrapper = renderWithStore(<AppNameEditor {...props} />, store);
    const validationSpinner = wrapper.getByTestId("spinner");
    expect(validationSpinner).toBeInTheDocument(); 
    
    //TODO: Investigate to get an element afer delay
    //const greenCheck = wrapper.getByTestId("green-check", undefined, {timeout: 3000 });
    //const greenCheck = await wrapper.findByTestId("green-check", undefined, {timeout: 3000 });    
    //const greenCheck = await wait(() => wrapper.getByTestId("green-check", undefined, {timeout: 3000 }));
    //console.log(greenCheck);
  });
});
