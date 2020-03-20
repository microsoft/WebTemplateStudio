import * as React from "react";
import configureMockStore from "redux-mock-store";
import { azureMessages } from "../../../mockData/azureServiceOptions";
import RuntimeStackInfo from "./RuntimeStackInfo";
import { WIZARD_CONTENT_INTERNAL_NAMES } from "../../../utils/constants";
import { Provider } from "react-redux";
import { getInitialState, setBackendFramework } from "../../../mockData/mockStore";
import { render, RenderResult } from "@testing-library/react";
import { IntlProvider } from "react-intl";

describe("RuntimeStackInfo", () => {
  let props: any;
  let wrapper: RenderResult;
  let store: any;
  let initialState: any;
  const mockStore = configureMockStore();
  const cases = [
    [WIZARD_CONTENT_INTERNAL_NAMES.NODE, WIZARD_CONTENT_INTERNAL_NAMES.NODE],
    [WIZARD_CONTENT_INTERNAL_NAMES.MOLECULER, WIZARD_CONTENT_INTERNAL_NAMES.NODE],
    [WIZARD_CONTENT_INTERNAL_NAMES.FLASK, WIZARD_CONTENT_INTERNAL_NAMES.PYTHON],
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

      const expectedText = intl.formatMessage(azureMessages.appServiceRuntimeStackSubLabel, {
        runtimeStack: runtimeStackName,
      });

      expect(wrapper.getByText(expectedText)).toBeDefined();
    }
  );
});
