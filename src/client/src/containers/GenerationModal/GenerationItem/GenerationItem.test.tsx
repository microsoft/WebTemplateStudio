import * as React from "react";
import { waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import "@testing-library/jest-dom/extend-expect";
import { renderWithIntl } from "../../../testUtils";
import GenerationItem from ".";
import { Subject } from "rxjs/internal/Subject";
import { GenerationItemData, GenerationItemStatus } from "../../../types/generationStatus";
import messages from "./messages";
import { EXTENSION_COMMANDS } from "../../../utils/constants/commands";

describe("GenerationItem", () => {
  let props: any;
  const mockName = "mockName";
  const mockTitle = "mockTitle";
  const mockLink = "mockLink";
  const mockItem: GenerationItemData = {
    name: mockName,
    title: mockTitle,
    link: mockLink,
    message: new Subject(),
  };

  const sendGenerationStatus = (name: string, status: GenerationItemStatus, message?: string) => {
    window.postMessage(
      {
        command: EXTENSION_COMMANDS.GEN_STATUS,
        payload: {
          name,
          status,
          message,
        },
      },
      "*"
    );
  };

  beforeEach(() => {
    props = {
      item: mockItem,
    };
  });

  it("renders without crashing", () => {
    const wrapper = renderWithIntl(<GenerationItem {...props} />);
    expect(wrapper).toBeDefined();
  });

  it("item title should be render", () => {
    const { getByText } = renderWithIntl(<GenerationItem {...props} />);
    const title = getByText(props.item.title);
    expect(title).toBeDefined();
  });

  describe("status is generating", () => {
    it("item link and show log links not should be render ", () => {
      const { queryByText } = renderWithIntl(<GenerationItem {...props} />);

      const link = queryByText(intl.formatMessage(messages.view));
      const showLog = queryByText(intl.formatMessage(messages.showLog));

      expect(link).not.toBeInTheDocument();
      expect(showLog).not.toBeInTheDocument();
    });

    it("only spinner icon should be render ", () => {
      const { getByTestId, queryByTestId } = renderWithIntl(<GenerationItem {...props} />);

      const spinnerIcon = getByTestId("spinner-icon");
      const checkmarkIcon = queryByTestId("checkmark-icon");
      const errorIcon = queryByTestId("error-icon");

      expect(spinnerIcon).toBeInTheDocument();
      expect(checkmarkIcon).not.toBeInTheDocument();
      expect(errorIcon).not.toBeInTheDocument();
    });
  });

  describe("status is success", () => {
    it("item link should be render ", async () => {
      const { getByText } = renderWithIntl(<GenerationItem {...props} />);
      sendGenerationStatus(mockName, GenerationItemStatus.Success);

      await waitFor(() => {
        const link = getByText(intl.formatMessage(messages.view));
        expect(link).toBeDefined();
      });
    });

    it("show log link not should be render ", async () => {
      const { queryByText } = renderWithIntl(<GenerationItem {...props} />);
      sendGenerationStatus(mockName, GenerationItemStatus.Success);

      await waitFor(() => {
        const showLog = queryByText(intl.formatMessage(messages.showLog));
        expect(showLog).not.toBeInTheDocument();
      });
    });

    it("only success icon should be render ", async () => {
      const { getByTestId, queryByTestId } = renderWithIntl(<GenerationItem {...props} />);
      sendGenerationStatus(mockName, GenerationItemStatus.Success);

      await waitFor(() => {
        const spinnerIcon = queryByTestId("spinner-icon");
        const checkmarkIcon = getByTestId("checkmark-icon");
        const errorIcon = queryByTestId("error-icon");

        expect(spinnerIcon).not.toBeInTheDocument();
        expect(checkmarkIcon).toBeInTheDocument();
        expect(errorIcon).not.toBeInTheDocument();
      });
    });
  });

  describe("status is failed", () => {
    it("item link not should be render ", async () => {
      const { queryByText } = renderWithIntl(<GenerationItem {...props} />);
      sendGenerationStatus(mockName, GenerationItemStatus.Failed);

      await waitFor(() => {
        const link = queryByText(intl.formatMessage(messages.view));
        expect(link).not.toBeInTheDocument();
      });
    });

    it("show log link should be render ", async () => {
      const { getByText } = renderWithIntl(<GenerationItem {...props} />);
      sendGenerationStatus(mockName, GenerationItemStatus.Failed);

      await waitFor(() => {
        const showLog = getByText(intl.formatMessage(messages.showLog));
        expect(showLog).toBeDefined();
      });
    });

    it("only failed icon should be render ", async () => {
      const { getByTestId, queryByTestId } = renderWithIntl(<GenerationItem {...props} />);
      sendGenerationStatus(mockName, GenerationItemStatus.Failed);

      await waitFor(() => {
        const spinnerIcon = queryByTestId("spinner-icon");
        const checkmarkIcon = queryByTestId("checkmark-icon");
        const errorIcon = getByTestId("error-icon");

        expect(spinnerIcon).not.toBeInTheDocument();
        expect(checkmarkIcon).not.toBeInTheDocument();
        expect(errorIcon).toBeInTheDocument();
      });
    });
  });
});
