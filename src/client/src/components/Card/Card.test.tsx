import * as React from "react";
import { shallow } from "enzyme";
import { Card } from "./index.tsx";

describe("Card", () => {
  let props;
  let wrapper;

  beforeEach(() => {
    props = {
      option: {
        body: {
          id: "cosmosResourceModule.addResource",
          defaultMessage: "cosmosResourceModule.addResource"
        },
        title: {
          id: "cosmosResourceModule.addResource",
          defaultMessage: "cosmosResourceModule.addResource"
        }
      },
      buttonText: "Test",
      disabled: true,
      handleButtonClick: () => {},
      handleDetailsClick: () => {},
      useNormalButtons: true,
      intl: global.intl
    };
    wrapper = shallow(<Card {...props} />);
  });

  it("renders Card without crashing", () => {
    expect(wrapper).toBeDefined();
  });

  it("Card has a button", () => {
    expect(wrapper).contains;
  });
});
