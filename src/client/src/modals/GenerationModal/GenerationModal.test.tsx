import * as React from "react";
import configureMockStore from "redux-mock-store";
import { getInitialState, setOpenModal, setGenerationData } from "../../mockData/mockStore";
import { waitFor, fireEvent } from "@testing-library/react";
import buttonStyles from "../../css/buttonStyles.module.css";
import "@testing-library/jest-dom";
import "@testing-library/jest-dom/extend-expect";
import { renderWithStore } from "../../testUtils";
import GenerationModal from ".";
import { Subject } from "rxjs/internal/Subject";
import { NAVIGATION_MODAL_TYPES } from "../../store/navigation/typeKeys";
import * as extensionService from "../../utils/extensionService/extensionService";
import { WEB_TEMPLATE_STUDIO_LINKS } from "../../utils/constants/constants";
import { messages } from "./messages";
import { resetWizardAction } from "../../store/config/config/action";

const spyGenerateProject = jest.spyOn(extensionService, "generateProject");
const spySendTelemetry = jest.spyOn(extensionService, "sendTelemetry");
const spyOpenProjectInVSCode = jest.spyOn(extensionService, "openProjectInVSCode");

jest.mock("../../store/config/config/action", () => {
  const resetWizardAction = jest.fn(() => ({
    type: "WTS/config/RESET_WIZARD",
  }));
  return { resetWizardAction };
});

jest.mock("./GenerationItem", () => {
  return (props: any) => {
    const observable = props.item.message as Subject<string>;

    return (
      <div data-testid="generation-item-component">
        <button data-testid="mock-send-message" onClick={() => observable.next("new message")}></button>
        <button data-testid="mock-finish-generation" onClick={() => observable.complete()}></button>
        <button data-testid="mock-failed-generation" onClick={() => observable.error("error message")}></button>
      </div>
    );
  };
});

describe("GenerationModal", () => {
  let props: any;
  let store: any;
  let initialState: any;
  let countGenerationItems: number;
  const mockStore = configureMockStore();

  beforeEach(() => {
    initialState = getInitialState();
    setOpenModal(initialState, NAVIGATION_MODAL_TYPES.GEN_MODAL);
    countGenerationItems = setGenerationData(initialState);
    store = mockStore(initialState);
    props = {
      isModalOpen: true,
      closeModal: () => jest.fn(),
    };
  });

  it("renders without crashing", () => {
    const wrapper = renderWithStore(<GenerationModal {...props} />, store);
    expect(wrapper).toBeDefined();
  });

  it("generateProject should be called", async () => {
    renderWithStore(<GenerationModal {...props} />, store);
    await waitFor(() => {
      expect(spyGenerateProject).toHaveBeenCalled();
    });
  });

  it("should be the same number of generation item components as user selection templates and services in the store", () => {
    const wrapper = renderWithStore(<GenerationModal {...props} />, store);
    const generationItemComponents = wrapper.queryAllByTestId("generation-item-component");
    expect(generationItemComponents.length).toBe(countGenerationItems);
  });

  describe("when generation is in progress", () => {
    it("close button should not be visible", () => {
      const { queryByTestId } = renderWithStore(<GenerationModal {...props} />, store);
      const closeButton = queryByTestId("close-button");
      expect(closeButton).not.toBeInTheDocument();
    });

    it("report an issue link should not be visible", () => {
      const { queryByText } = renderWithStore(<GenerationModal {...props} />, store);
      const reportIssueLink = queryByText(intl.formatMessage(messages.reportAndIssue));
      expect(reportIssueLink).not.toBeInTheDocument();
    });

    it("create new project button should not be visible", () => {
      const { queryByText } = renderWithStore(<GenerationModal {...props} />, store);
      const createNewProjectButton = queryByText(intl.formatMessage(messages.createNewProject));
      expect(createNewProjectButton).not.toBeInTheDocument();
    });

    it("open project button should be visible and disabled", () => {
      const { getByText } = renderWithStore(<GenerationModal {...props} />, store);
      const openProjectButton = getByText(intl.formatMessage(messages.openProject));
      expect(openProjectButton).toBeInTheDocument();
      expect(openProjectButton).toBeDisabled();
      expect(openProjectButton).toHaveClass(buttonStyles.buttonDark);
    });

    it("when received item message, message should be visible", async () => {
      const { getByText, getAllByTestId } = renderWithStore(<GenerationModal {...props} />, store);
      const sendMessageButton = getAllByTestId("mock-send-message")[0];
      fireEvent.click(sendMessageButton);

      await waitFor(() => {
        const receivedMessage = getByText("new message");
        expect(receivedMessage).toBeInTheDocument();
      });
    });
  });

  describe("when generation is successful", () => {
    it("close button should be visible", async () => {
      const { queryByTestId, getAllByTestId } = renderWithStore(<GenerationModal {...props} />, store);
      const finishGenerationMockButtons = getAllByTestId("mock-finish-generation");
      finishGenerationMockButtons.forEach((b) => fireEvent.click(b));
      await waitFor(() => {
        const closeButton = queryByTestId("close-button");
        expect(closeButton).toBeInTheDocument();
      });
    });

    it("On press close button, resetWizardAction should be called", async () => {
      const { getByTestId, getAllByTestId } = renderWithStore(<GenerationModal {...props} />, store);
      const finishGenerationMockButtons = getAllByTestId("mock-finish-generation");
      finishGenerationMockButtons.forEach((b) => fireEvent.click(b));
      await waitFor(() => {
        const closeButton = getByTestId("close-button");
        fireEvent.click(closeButton);
        expect(resetWizardAction).toBeCalled();
      });
    });

    it("report an issue link should not be visible", async () => {
      const { queryByText, getAllByTestId } = renderWithStore(<GenerationModal {...props} />, store);
      const finishGenerationMockButtons = getAllByTestId("mock-finish-generation");
      finishGenerationMockButtons.forEach((b) => fireEvent.click(b));
      await waitFor(() => {
        const reportIssueLink = queryByText(intl.formatMessage(messages.reportAndIssue));
        expect(reportIssueLink).not.toBeInTheDocument();
      });
    });

    it("create new project button should be visible", async () => {
      const { queryByText, getAllByTestId } = renderWithStore(<GenerationModal {...props} />, store);
      const finishGenerationMockButtons = getAllByTestId("mock-finish-generation");
      finishGenerationMockButtons.forEach((b) => fireEvent.click(b));
      await waitFor(() => {
        const createNewProjectButton = queryByText(intl.formatMessage(messages.createNewProject));
        expect(createNewProjectButton).toBeInTheDocument();
      });
    });

    it("On press create new project button, resetWizardAction should be called", async () => {
      const { getByText, getAllByTestId } = renderWithStore(<GenerationModal {...props} />, store);
      const finishGenerationMockButtons = getAllByTestId("mock-finish-generation");
      finishGenerationMockButtons.forEach((b) => fireEvent.click(b));
      await waitFor(() => {
        const createNewProjectButton = getByText(intl.formatMessage(messages.createNewProject));
        fireEvent.click(createNewProjectButton);
        expect(resetWizardAction).toBeCalled();
      });
    });

    it("open project button should be visible and enabled", async () => {
      const { getByText, getAllByTestId } = renderWithStore(<GenerationModal {...props} />, store);
      const finishGenerationMockButtons = getAllByTestId("mock-finish-generation");
      finishGenerationMockButtons.forEach((b) => fireEvent.click(b));
      await waitFor(() => {
        const openProjectButton = getByText(intl.formatMessage(messages.openProject));
        expect(openProjectButton).toBeInTheDocument();
        expect(openProjectButton).toBeEnabled();
        expect(openProjectButton).toHaveClass(buttonStyles.buttonHighlighted);
      });
    });

    it("On press open project button, OpenProjectInVSCode function should be called", async () => {
      const { getByText, getAllByTestId } = renderWithStore(<GenerationModal {...props} />, store);
      const finishGenerationMockButtons = getAllByTestId("mock-finish-generation");
      finishGenerationMockButtons.forEach((b) => fireEvent.click(b));
      await waitFor(() => {
        const openProjectButton = getByText(intl.formatMessage(messages.openProject));
        fireEvent.click(openProjectButton);
        expect(spyOpenProjectInVSCode).toBeCalled();
      });
    });
  });

  describe("when generation is failed", () => {
    it("close button should be visible", async () => {
      const { queryByTestId, getAllByTestId } = renderWithStore(<GenerationModal {...props} />, store);
      const failedGenerationMockButtons = getAllByTestId("mock-failed-generation");
      failedGenerationMockButtons.forEach((b) => fireEvent.click(b));
      await waitFor(() => {
        const closeButton = queryByTestId("close-button");
        expect(closeButton).toBeInTheDocument();
      });
    });

    it("On press close button, resetWizardAction should be called", async () => {
      const { getByTestId, getAllByTestId } = renderWithStore(<GenerationModal {...props} />, store);
      const finishGenerationMockButtons = getAllByTestId("mock-failed-generation");
      finishGenerationMockButtons.forEach((b) => fireEvent.click(b));
      await waitFor(() => {
        const closeButton = getByTestId("close-button");
        fireEvent.click(closeButton);

        expect(spySendTelemetry).toHaveBeenCalled();
        expect(resetWizardAction).toBeCalled();
      });
    });

    it("report an issue link should be visible", async () => {
      const { queryByText, getAllByTestId } = renderWithStore(<GenerationModal {...props} />, store);
      const failedGenerationMockButtons = getAllByTestId("mock-failed-generation");
      failedGenerationMockButtons.forEach((b) => fireEvent.click(b));
      await waitFor(() => {
        const reportIssueLink = queryByText(intl.formatMessage(messages.reportAndIssue));
        expect(reportIssueLink).toBeInTheDocument();
        expect(reportIssueLink).toHaveAttribute("href", WEB_TEMPLATE_STUDIO_LINKS.ISSUES);
      });
    });

    it("create new project button should be visible", async () => {
      const { queryByText, getAllByTestId } = renderWithStore(<GenerationModal {...props} />, store);
      const failedGenerationMockButtons = getAllByTestId("mock-failed-generation");
      failedGenerationMockButtons.forEach((b) => fireEvent.click(b));
      await waitFor(() => {
        const createNewProjectButton = queryByText(intl.formatMessage(messages.createNewProject));
        expect(createNewProjectButton).toBeInTheDocument();
      });
    });

    it("On press create new project button, resetWizardAction should be called", async () => {
      const { getByText, getAllByTestId } = renderWithStore(<GenerationModal {...props} />, store);
      const finishGenerationMockButtons = getAllByTestId("mock-failed-generation");
      finishGenerationMockButtons.forEach((b) => fireEvent.click(b));
      await waitFor(() => {
        const createNewProjectButton = getByText(intl.formatMessage(messages.createNewProject));
        fireEvent.click(createNewProjectButton);
        expect(resetWizardAction).toBeCalled();
      });
    });

    it("open project button should not be visible", async () => {
      const { queryByText, getAllByTestId } = renderWithStore(<GenerationModal {...props} />, store);
      const failedGenerationMockButtons = getAllByTestId("mock-failed-generation");
      failedGenerationMockButtons.forEach((b) => fireEvent.click(b));
      await waitFor(() => {
        const openProjectButton = queryByText(intl.formatMessage(messages.openProject));
        expect(openProjectButton).not.toBeInTheDocument();
      });
    });

    it("when received error message, error message should be visible", async () => {
      const { getByText, getAllByTestId } = renderWithStore(<GenerationModal {...props} />, store);
      const sendErrorMessageButton = getAllByTestId("mock-failed-generation")[0];
      fireEvent.click(sendErrorMessageButton);

      await waitFor(() => {
        const receivedMessage = getByText("error message");
        expect(receivedMessage).toBeInTheDocument();
      });
    });
  });
});
