import * as React from "react";
import configureMockStore from "redux-mock-store";
import "@testing-library/jest-dom";
import ViewPlatformRequirementsModal from ".";
import { getInitialState, setOpenModal, addPlatformRequirementsOptions } from "../../mockData/mockStore";
import "@testing-library/jest-dom/extend-expect";
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

describe("ViewPlatformRequirementsModal", () => {
  let props: any;
  let store: any;
  let initialState: any;
  const mockStore = configureMockStore();

  beforeEach(() => {
    initialState = getInitialState();
    addPlatformRequirementsOptions(initialState);
    setOpenModal(initialState, NAVIGATION_MODAL_TYPES.VIEW_PLATFORM_REQUIREMENTS_MODAL);
    store = mockStore(initialState);
    props = {
      isModalOpen: true,
      closeModal: () => jest.fn(),
    };
  });

  it("renders without crashing", () => {
    const wrapper = renderWithStore(<ViewPlatformRequirementsModal {...props} />, store);
    expect(wrapper).toBeDefined();
  });

  it("On press close button, close modal", () => {
    const { getByLabelText } = renderWithStore(<ViewPlatformRequirementsModal {...props} />, store);
    const buttonLabel = intl.formatMessage(messages.ariaCloseModalLabel);
    const button = getByLabelText(buttonLabel);
    fireEvent.click(button);
    expect(closeModalAction).toBeCalled();
  });
});
