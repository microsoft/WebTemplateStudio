import { shallow } from "enzyme";
import * as React from "react";

import App from "./App";

xdescribe("App", () => {
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
