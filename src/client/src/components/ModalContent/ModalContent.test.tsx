import { fireEvent } from "@testing-library/react";
import * as React from "react";
import configureMockStore from "redux-mock-store";

import { getInitialState } from "../../mockData/mockStore";
import { closeModalAction } from "../../store/navigation/modals/action";
import { renderWithStore } from "../../testUtils";
import ModalContent from ".";
import messages from "./messages";

jest.mock("../../store/navigation/modals/action", () => {
  const closeModalAction = jest.fn(() => ({
    type: "WTS/navigation/modals/CLOSE_MODALS",
  }));
  return { closeModalAction };
});

describe("ModalContent", () => {
  let props: any;
  let store: any;
  let initialState: any;
  const mockStore = configureMockStore();

  beforeEach(() => {
    initialState = getInitialState();
    store = mockStore(initialState);
    props = {
      isModalOpen: true,
      closeModal: () => jest.fn(),
    };
  });

  it("renders without crashing", () => {
    const wrapper = renderWithStore(<ModalContent {...props} />, store);
    expect(wrapper).toBeDefined();
  });

  it("On press close button, close modal", () => {
    const { getByLabelText } = renderWithStore(<ModalContent {...props} />, store);
    const buttonLabel = intl.formatMessage(messages.ariaCloseModalLabel);
    const button = getByLabelText(buttonLabel);
    fireEvent.click(button);
    expect(closeModalAction).toBeCalled();
  });
});
