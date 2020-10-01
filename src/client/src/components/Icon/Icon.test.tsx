import * as React from "react";
import { render, RenderResult } from "@testing-library/react";

import styles from "./styles.module.css";
import Icon from ".";

describe("Icon", () => {
  let props: any;
  let wrapper: RenderResult;

  it("renders without crashing", () => {
    wrapper = render(<Icon {...props} />);

    expect(wrapper).toBeDefined();
  });

  describe("has base64", () => {
    beforeEach(() => {
      props = {
        name: "THIS NAME",
        svgBase64: "SOMETHING",
        small: false,
      };

      wrapper = render(<Icon {...props} />);
    });

    it("Should have alt text", () => {
      const expectedName = props.name;
      expect(wrapper.getAllByAltText(expectedName)).toBeDefined();
    });

    it("Should have icon class", () => {
      expect(wrapper.getAllByRole("img")[0]).toBeDefined();
      expect(wrapper.getAllByRole("img")[0]).toHaveClass(styles.icon);
    });

    it("Should show image", () => {
      const expectedName = props.name;
      expect(wrapper.getAllByAltText(expectedName)[0]).toHaveAttribute("src");
    });
  });

  describe("does not have base64", () => {
    beforeEach(() => {
      props = {
        name: "THIS NAME",
        svgBase64: undefined,
        small: false,
      };

      wrapper = render(<Icon {...props} />);
    });
    it("Should not have alt text", () => {
      expect(wrapper.getAllByRole("img")[0]).not.toHaveAttribute("alt");
      expect(wrapper.getAllByRole("img")[0]).toHaveClass(styles.icon);
    });

    it("Should not show any image", () => {
      expect(wrapper.getAllByRole("img")[0]).not.toHaveAttribute("src");
    });
  });

  describe("When small style set", () => {
    beforeEach(() => {
      props = {
        name: "THIS NAME",
        svgBase64: "SOMETHING",
        small: true,
      };

      wrapper = render(<Icon {...props} />);
    });

    it("Should have small class", () => {
      expect(wrapper.getAllByRole("img")[0]).toBeDefined();
      expect(wrapper.getAllByRole("img")[0]).toHaveClass(styles.small);
    });
  });
});
