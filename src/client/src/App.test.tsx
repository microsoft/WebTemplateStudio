import * as React from "react";
import { shallow } from "enzyme";

import App from "./App";

describe("App", () => {
  let props: any;
  let wrapper: any;

  beforeEach(() => {
    props = {};
    wrapper = shallow(<App {...props} />);
  });

  it("renders without crashing", () => {
    expect(wrapper).toBeDefined();
  });
});
