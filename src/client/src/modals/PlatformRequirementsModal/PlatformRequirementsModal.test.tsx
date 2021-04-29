import * as React from "react";
import configureMockStore from "redux-mock-store";

import { addPlatformRequirementsOptions, getInitialState, setOpenModal } from "../../mockData/mockStore";
import { NAVIGATION_MODAL_TYPES } from "../../store/navigation/typeKeys";
import { renderWithStore } from "../../testUtils";
import PlatformRequirementsModal from ".";

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

  it("should be the same number of requirements components as requirements in the store", () => {
    const { queryAllByTestId } = renderWithStore(<PlatformRequirementsModal {...props} />, store);
    const requirementComponents = queryAllByTestId("requirement-item-component");
    expect(requirementComponents.length).toBe(countRequirementInStore);
  });
});
