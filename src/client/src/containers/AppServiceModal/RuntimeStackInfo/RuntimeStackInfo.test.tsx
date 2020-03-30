import * as React from "react";
import configureMockStore from "redux-mock-store";
import messages from "./messages";
import RuntimeStackInfo from ".";
import { Provider } from "react-redux";
import { getInitialState, setBackendFramework } from "../../../mockData/mockStore";
import { render, RenderResult } from "@testing-library/react";
import { IntlProvider } from "react-intl";

xdescribe("RuntimeStackInfo", () => {
  let props: any;
  let wrapper: RenderResult;
  let store: any;
  let initialState: any;
  const mockStore = configureMockStore();
  const cases = [
    ["Node", "node"],
    ["Moleculer", "node"],
    ["Flask", "python"],
  ];

  test.each(cases)(
    "when selected backend framework is %p, runtime stack is %p",
    (selectedFrameworkName, runtimeStackName) => {
      initialState = getInitialState();
      setBackendFramework(initialState, selectedFrameworkName);
      store = mockStore(initialState);

      props = {
        intl: global.intl,
      };

      wrapper = render(
        <IntlProvider locale="en">
          <Provider store={store}>
            <RuntimeStackInfo {...props} />
          </Provider>
        </IntlProvider>
      );

      //renders without crashing
      expect(wrapper).toBeDefined();

      const expectedText = intl.formatMessage(messages.runtimeStack, {
        runtimeStack: runtimeStackName,
      });

      expect(wrapper.getByText(expectedText)).toBeDefined();
    }
  );
});
