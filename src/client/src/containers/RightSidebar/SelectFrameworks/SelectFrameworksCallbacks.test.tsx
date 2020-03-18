import * as React from "react";
import configureMockStore from "redux-mock-store";
import SelectFrameworks from "./index";
import * as ReactRedux from 'react-redux'
import { getInitialState, addFrontEndFrameworksOptions, addBackEndFrameworksOptions, setFrontendFramework, setBackendFramework } from "../../../mockData/mockStore";
import { render, RenderResult } from "@testing-library/react";
import { IntlProvider } from "react-intl";
import { AppState } from "../../../reducers";
import { IDropdownProps } from "../../../components/Dropdown";
jest.mock('../../../components/Dropdown',()=>{
  return {
    __esModule: true,
    default: (props: IDropdownProps) => {
      const drop: IDropDownOptionType = {label: "Angular", value: "Angular"};
      if (props.handleChange) props.handleChange(drop);
      return <div></div>;
    },
  };
});

describe("SelectFrameworks", () => {
  let wrapper: RenderResult;
  let store: any;
  const mockStore = configureMockStore();

  describe("Tests", () => {
    const mockDispatch = jest.fn()
    beforeEach(() => {
      jest.spyOn(ReactRedux, 'useDispatch').mockReturnValue(mockDispatch)

      const initialState: AppState = getInitialState();
      addFrontEndFrameworksOptions(initialState);
      addBackEndFrameworksOptions(initialState);
      setBackendFramework(initialState,"React");
      setFrontendFramework(initialState,"Node");

      store = mockStore(initialState);
      wrapper = render(
        <IntlProvider locale="en">
          <ReactRedux.Provider store={store}>
            <SelectFrameworks/>
          </ReactRedux.Provider>
        </IntlProvider>
      );
    });

    it("renders without crashing", () => {
      expect(wrapper).toBeDefined();
    });

    it("should change front end framework", () => {
      expect(mockDispatch).toBeCalled();
    });
  });
});
