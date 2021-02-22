import * as React from "react";

import { IPlatformRequirement } from "../../../store/config/platform/model";
import { renderWithIntl } from "../../../testUtils";
import RequirementItem from ".";
import messages from "./messages";

describe("RequirementItem", () => {
  let props: { item: IPlatformRequirement };

  beforeEach(() => {
    props = {
      item: {
        name: "requirement item",
        isInstalled: true,
      },
    };
  });

  describe("When requirement is installed", () => {
    beforeEach(() => {
      props.item.isInstalled = true;
    });

    it("renders without crashing", () => {
      const wrapper = renderWithIntl(<RequirementItem {...props} />);
      expect(wrapper).toBeDefined();
    });

    it("requirement name should be in the document", () => {
      const { getByText } = renderWithIntl(<RequirementItem {...props} />);
      const requirementName = getByText(props.item.name);
      expect(requirementName).toBeInTheDocument();
    });

    it("green check icon should be in the document", () => {
      const { queryByLabelText } = renderWithIntl(<RequirementItem {...props} />);
      const greenCheckMarkComponent = queryByLabelText(intl.formatMessage(messages.requirementInstalled));
      expect(greenCheckMarkComponent).toBeInTheDocument();
    });

    it("error red icon should not be in the document", () => {
      const { queryByLabelText } = renderWithIntl(<RequirementItem {...props} />);
      const errorRedComponent = queryByLabelText(intl.formatMessage(messages.requirementNotInstalled));
      expect(errorRedComponent).not.toBeInTheDocument();
    });
  });

  describe("When requirement is not installed", () => {
    beforeEach(() => {
      props.item.isInstalled = false;
    });

    it("renders without crashing", () => {
      const wrapper = renderWithIntl(<RequirementItem {...props} />);
      expect(wrapper).toBeDefined();
    });

    it("requirement name should be in the document", () => {
      const { getByText } = renderWithIntl(<RequirementItem {...props} />);
      const requirementName = getByText(props.item.name);
      expect(requirementName).toBeInTheDocument();
    });

    it("green check icon should not be in the document", () => {
      const { queryByLabelText } = renderWithIntl(<RequirementItem {...props} />);
      const greenCheckMarkComponent = queryByLabelText(intl.formatMessage(messages.requirementInstalled));
      expect(greenCheckMarkComponent).not.toBeInTheDocument();
    });

    it("error red icon should be in the document", () => {
      const { queryByLabelText } = renderWithIntl(<RequirementItem {...props} />);
      const errorRedComponent = queryByLabelText(intl.formatMessage(messages.requirementNotInstalled));
      expect(errorRedComponent).toBeInTheDocument();
    });
  });
});
