import * as React from "react";
import * as ReactDOM from "react-dom";
import { shallow } from "enzyme";

import App from "./App";

describe("App", () => {
  let props;
  let wrapper;

  beforeEach(() => {
    props = {};
    wrapper = shallow(<App {...props} />);
  });

  it("renders App without crashing", () => {
    expect(wrapper).toBeDefined();
  });
});
