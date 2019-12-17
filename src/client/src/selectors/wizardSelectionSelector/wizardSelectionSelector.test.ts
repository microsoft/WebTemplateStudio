import * as React from "react";
import configureMockStore from "redux-mock-store";
import { isEnableNextPage} from "./wizardSelectionSelector";
import { Provider } from "react-redux";
import { ROUTES } from "../../utils/constants";


describe("wizardSelectionSelector", () => {
  let mock:Object;
  beforeEach(()=>{
    mock={
      wizardRoutes: {
        selected: ""
      },
      selection:{
        projectNameObject:{
          validation:{
            isValid:true
          }
        },
        outputPathObject:{
          outputPath:""
        }
      }
    };
  })

  describe("on home", () => {
    it("isEnableNextPage valid",()=>{
      const mockStore = configureMockStore();
      mock.wizardRoutes.selected = ROUTES.NEW_PROJECT;
      mock.selection.projectNameObject.validation.isValid = true;
      mock.selection.outputPathObject.outputPath="c:/sadadasd";
      let store = mockStore(mock);
      expect(isEnableNextPage(store.getState())).toBeTruthy();
    })

    it("isEnableNextPage invalid (route wrong)",()=>{
      const mockStore = configureMockStore();
      mock.wizardRoutes.selected = "/wrong";
      mock.selection.projectNameObject.validation.isValid = true;
      mock.selection.outputPathObject.outputPath="c:/sadadasd";
      let store = mockStore(mock);
      expect(isEnableNextPage(store.getState())).toBeFalsy();
    })

    it("isEnableNextPage invalid (project name invalid)",()=>{
      const mockStore = configureMockStore();
      mock.wizardRoutes.selected = ROUTES.NEW_PROJECT;
      mock.selection.projectNameObject.validation.isValid = false;
      mock.selection.outputPathObject.outputPath="c:/sadadasd";
      let store = mockStore(mock);
      expect(isEnableNextPage(store.getState())).toBeFalsy();
    })

    it("isEnableNextPage invalid (out path wrong)",()=>{
      const mockStore = configureMockStore();
      mock.wizardRoutes.selected = ROUTES.NEW_PROJECT;
      mock.selection.projectNameObject.validation.isValid = true;
      mock.selection.outputPathObject.outputPath="";
      let store = mockStore(mock);
      expect(isEnableNextPage(store.getState())).toBeFalsy();
    })
  });
});