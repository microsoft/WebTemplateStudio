import { configure, shallow, mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { IntlProvider, intlShape } from "react-intl";
import React from "react";

/**
 * This setup file configures the Enzyme Adapter and is executed before running the tests
 * https://facebook.github.io/create-react-app/docs/running-tests#initializing-test-environment
 */
configure({ adapter: new Adapter() });

const intlProvider = new IntlProvider({ locale: "en" }, {});
const { intl } = intlProvider.getChildContext();
global.intl = intl;

//https://medium.com/@sapegin/testing-react-intl-components-with-jest-and-enzyme-f9d43d9c923e
// `intl` prop is required when using injectIntl HOC
const nodeWithIntlProp = node => React.cloneElement(node, { intl });

// shallow() with React Intl context
global.shallowWithIntl = (node, { context, ...options } = {}) => {
  return shallow(nodeWithIntlProp(node), {
    ...options,
    context: {
      ...context,
      intl
    }
  });
};

// mount() with React Intl context
global.mountWithIntl = (
    node,
    { context, childContextTypes, ...options } = {}
  ) => {
    return mount(nodeWithIntlProp(node), {
      ...options,
      context: {
        ...context,
        intl
      },
      childContextTypes: {
        intl: intlShape,
        ...childContextTypes
      }
    });
  };