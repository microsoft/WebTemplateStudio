import { configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { IntlProvider, FormattedRelative } from "react-intl";

/**
 * This setup file configures the Enzyme Adapter and is executed before running the tests
 * https://facebook.github.io/create-react-app/docs/running-tests#initializing-test-environment
 */
configure({ adapter: new Adapter() });

const intlProvider = new IntlProvider({ locale: "en" }, {});
const { intl } = intlProvider.getChildContext();
global.intl = intl;
