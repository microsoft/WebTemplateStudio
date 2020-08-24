import * as React from "react";
import configureMockStore from "redux-mock-store";
import RuntimeStackInfo from ".";
import { getInitialState, setBackendFramework, addBackEndFrameworksOptions } from "../../../mockData/mockStore";
import { RenderResult } from "@testing-library/react";
import { renderWithStore } from "../../../testUtils";
import messages from "./messages";

describe("RuntimeStackInfo", () => {
  let props: any;
  let wrapper: RenderResult;
  let store: any;
  let initialState: any;
  const mockStore = configureMockStore();
  const cases = [
    ["Node", "node"],
    ["Moleculer", "node"],
    ["Flask", "python"],
    ["AspNet", "DOTNETCORE"]
  ];

  test.each(cases)(
    "when selected backend framework is %p, runtime stack is %p",
    (backendFramework, runtimeStack) => {
      initialState = getInitialState();
      addBackEndFrameworksOptions(initialState);
      setBackendFramework(initialState, backendFramework);
      store = mockStore(initialState);
      props = {};

      wrapper = renderWithStore(<RuntimeStackInfo {...props} />, store);
      expect(wrapper).toBeDefined();
      const expectedText = intl.formatMessage(messages.runtimeStack, { runtimeStack });
      expect(wrapper.getByText(expectedText)).toBeDefined();
    }
  );
});
