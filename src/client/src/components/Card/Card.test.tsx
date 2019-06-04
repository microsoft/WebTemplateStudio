import * as React from "react";
import { shallow } from "enzyme";
import { Card } from "./index.tsx";
import { CardBody } from "../CardBody/index.tsx";

describe("Card", () => {
  let props: any;
  let wrapper: Card;

  beforeEach(() => {
    props = {
      option: {
        body: {
          id: "cosmosResourceModule.addResource",
          defaultMessage: "Add Resource"
        },
        title: {
          id: "cosmosResourceModule.addResource",
          defaultMessage: "Add Resource"
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

  it("should have 1 button", () => {
    const buttons = wrapper.find("button");
    expect(buttons.length).toBe(1);
  });
});
