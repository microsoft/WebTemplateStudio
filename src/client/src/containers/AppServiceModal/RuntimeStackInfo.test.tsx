import * as React from "react";
import configureMockStore from "redux-mock-store";
import { azureMessages } from "../../mockData/azureServiceOptions";
import RuntimeStackInfo from "./RuntimeStackInfo";
import { WIZARD_CONTENT_INTERNAL_NAMES } from "../../utils/constants";
import { Provider } from "react-redux";

const mockStore = configureMockStore();

const cases = [
  [WIZARD_CONTENT_INTERNAL_NAMES.NODE, WIZARD_CONTENT_INTERNAL_NAMES.NODE],
  [WIZARD_CONTENT_INTERNAL_NAMES.MOLECULER, WIZARD_CONTENT_INTERNAL_NAMES.NODE],
  [WIZARD_CONTENT_INTERNAL_NAMES.FLASK, WIZARD_CONTENT_INTERNAL_NAMES.PYTHON]
];

describe("RuntimeStackInfo", () => {
  let props: any;
  let wrapper: any;
  let store: any;

  test.each(cases)(
    "when selected framework is %p, runtime stack is %p",
    (selectedFrameworkName, runtimeStackName) => {
      props = {
        selectedBackend: {
          internalName: ""
        },
        intl: global.intl
      };

      store = mockStore({
        selection: {
          backendFramework: {
            internalName: selectedFrameworkName
          }
        }
      });

      wrapper = mountWithIntl(
        <Provider store={store}>
          <RuntimeStackInfo {...props} />
        </Provider>
      ).children();

      //renders without crashing
      expect(wrapper).toBeDefined();

      const intl = wrapper.props().intl;
      const message = wrapper.find("#message").text();
      expect(message).toBe(
        intl.formatMessage(azureMessages.runtimeStackSubLabel, {
          runtimeStack: runtimeStackName
        })
      );
    }
  );
});
