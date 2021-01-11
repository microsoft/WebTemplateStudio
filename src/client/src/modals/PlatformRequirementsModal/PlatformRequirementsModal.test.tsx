import * as React from "react";
import configureMockStore from "redux-mock-store";
import PlatformRequirementsModal from ".";
import { getInitialState, setOpenModal, addPlatformRequirementsOptions } from "../../mockData/mockStore";
import { renderWithStore } from "../../testUtils";
import { NAVIGATION_MODAL_TYPES } from "../../store/navigation/typeKeys";
import { fireEvent } from "@testing-library/react";
import { closeModalAction } from "../../store/navigation/modals/action";
import messages from "./messages";

jest.mock("../../store/navigation/modals/action", () => {
  const closeModalAction = jest.fn(() => ({
    type: "WTS/navigation/modals/CLOSE_MODALS",
  }));
  return { closeModalAction };
});

jest.mock("./RequirementItem", () => {
  return () => {
    return <div data-testid="requirement-item-component"></div>;
  };
});

describe("PlatformRequirementsModal", () => {
  let props: any;
  let store: any;
  let initialState: any;
  let countRequirementInStore: number;
  const mockStore = configureMockStore();

  beforeEach(() => {
    initialState = getInitialState();
    countRequirementInStore = addPlatformRequirementsOptions(initialState);
    setOpenModal(initialState, NAVIGATION_MODAL_TYPES.VIEW_PLATFORM_REQUIREMENTS_MODAL);
    store = mockStore(initialState);
    props = {
      isModalOpen: true,
      closeModal: () => jest.fn(),
    };
  });

  it("renders without crashing", () => {
    const wrapper = renderWithStore(<PlatformRequirementsModal {...props} />, store);
    expect(wrapper).toBeDefined();
  });

  it("On press close button, close modal", () => {
    const { getByLabelText } = renderWithStore(<PlatformRequirementsModal {...props} />, store);
    const buttonLabel = intl.formatMessage(messages.ariaCloseModalLabel);
    const button = getByLabelText(buttonLabel);
    fireEvent.click(button);
    expect(closeModalAction).toBeCalled();
  });

  it("should be the same number of requirements components as requirements in the store", () => {
    const { queryAllByTestId } = renderWithStore(<PlatformRequirementsModal {...props} />, store);
    const requirementComponents = queryAllByTestId("requirement-item-component");
    expect(requirementComponents.length).toBe(countRequirementInStore);
  });
});
