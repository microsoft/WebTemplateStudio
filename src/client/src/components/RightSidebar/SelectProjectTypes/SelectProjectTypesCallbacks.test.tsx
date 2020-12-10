//TODO: review and add proper testing
import * as React from "react";
import configureMockStore from "redux-mock-store";
import SelectProjectTypes from "./index";
import * as ReactRedux from "react-redux";
import { addProjectTypeOptions, getInitialState, setSelectedProjectTypeAction } from "../../../mockData/mockStore";
import { RenderResult } from "@testing-library/react";
import { AppState } from "../../../store/combineReducers";
import { IDropdownProps } from "../../../components/Dropdown";
import { renderWithStore } from "../../../testUtils";
jest.mock("../../../components/Dropdown", () => {
  return {
    __esModule: true,
    default: (props: IDropdownProps) => {
      const drop: IDropDownOptionType = { label: "Angular", value: "Angular" };
      if (props.handleChange) props.handleChange(drop);
      return <div></div>;
    },
    convertOptionToDropdownItem: () => {
      return "";
    },
    convertOptionsToDropdownItems: () => {
      return "";
    },
  };
});

describe("SelectProjectTypes", () => {
  let wrapper: RenderResult;
  let store: any;
  const mockStore = configureMockStore();

  describe("Tests", () => {
    const mockDispatch = jest.fn();
    beforeEach(() => {
      jest.spyOn(ReactRedux, "useDispatch").mockReturnValue(mockDispatch);

      const initialState: AppState = getInitialState();
      addProjectTypeOptions(initialState);
      setSelectedProjectTypeAction(initialState, "");

      store = mockStore(initialState);
      wrapper = renderWithStore(<SelectProjectTypes />, store);
    });

    it("renders without crashing", () => {
      expect(wrapper).toBeDefined();
    });

    xit("should change project type", () => {
      expect(mockDispatch).toBeCalled();
    });
  });
});
