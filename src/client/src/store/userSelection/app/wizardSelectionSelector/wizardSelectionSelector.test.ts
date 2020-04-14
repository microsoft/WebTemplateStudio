import configureMockStore from "redux-mock-store";
import { isEnableNextPageSelector} from "./wizardSelectionSelector";
import { ROUTES } from "../../../../utils/constants";
import { getInitialState } from "../../../../mockData/mockStore";
import { AppState } from "../../../combineReducers";
import { ISelected } from "../../../../types/selected";


describe("wizardSelectionSelector", () => {
  let mock: AppState;
  beforeEach(()=>{
    mock = getInitialState();
    /*mock = {
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
        },
        frontendFramework:{
          title:""
        },
        backendFramework:{
          title:""
        },
        pages:[]
      }
    };*/
  })

  describe("on home", () => {
    it("isEnableNextPage valid",()=>{
      const mockStore = configureMockStore<AppState>();
      mock.navigation.routes.selected = ROUTES.NEW_PROJECT;
      mock.userSelection.projectNameObject.validation.isValid = true;
      mock.userSelection.outputPathObject.outputPath="c:/sadadasd";
      const store = mockStore(mock);
      expect(isEnableNextPageSelector(store.getState())).toBeTruthy();
    })

    it("isEnableNextPage invalid (project name invalid)",()=>{
      const mockStore = configureMockStore<AppState>();
      mock.navigation.routes.selected = ROUTES.NEW_PROJECT;
      mock.userSelection.projectNameObject.validation.isValid = false;
      mock.userSelection.outputPathObject.outputPath="c:/sadadasd";
      const store = mockStore(mock);
      expect(isEnableNextPageSelector(store.getState())).toBeFalsy();
    })

    it("isEnableNextPage invalid (out path wrong)",()=>{
      const mockStore = configureMockStore<AppState>();
      mock.navigation.routes.selected = ROUTES.NEW_PROJECT;
      mock.userSelection.projectNameObject.validation.isValid = true;
      mock.userSelection.outputPathObject.outputPath="";
      const store = mockStore(mock);
      expect(isEnableNextPageSelector(store.getState())).toBeFalsy();
    })
  });

  describe("on select framework", () => {
    it("isEnableNextPage valid",()=>{
      const mockStore = configureMockStore<AppState>();
      mock.navigation.routes.selected = ROUTES.SELECT_FRAMEWORKS;
      mock.userSelection.frontendFramework.title = "sfsdf";
      mock.userSelection.backendFramework.title = "sfsdf";
      const store = mockStore(mock);
      expect(isEnableNextPageSelector(store.getState())).toBeTruthy();
    })

    it("isEnableNextPage invalid (frontendFramework unselected)",()=>{
      const mockStore = configureMockStore<AppState>();
      mock.navigation.routes.selected = ROUTES.SELECT_FRAMEWORKS;
      mock.userSelection.frontendFramework.title = "";
      mock.userSelection.backendFramework.title = "sfsdf";
      const store = mockStore(mock);
      expect(isEnableNextPageSelector(store.getState())).toBeFalsy();
    })

    it("isEnableNextPage invalid (backendFramework unselected)",()=>{
      const mockStore = configureMockStore<AppState>();
      mock.navigation.routes.selected = ROUTES.SELECT_FRAMEWORKS;
      mock.userSelection.frontendFramework.title = "sdfsdf";
      mock.userSelection.backendFramework.title = "";
      const store = mockStore(mock);
      expect(isEnableNextPageSelector(store.getState())).toBeFalsy();
    })
  });

  describe("on select pages", () => {
    it("isEnableNextPage valid",()=>{
      const mockStore = configureMockStore<AppState>();
      mock.navigation.routes.selected = ROUTES.SELECT_PAGES;
      const validPage: ISelected = {title:"", isValidTitle:true, internalName:"wts.mock.blank"};
      mock.userSelection.pages.push(validPage);
      const store = mockStore(mock);
      expect(isEnableNextPageSelector(store.getState())).toBeTruthy();
    })

    it("isEnableNextPage invalid (frontendFramework unselected)",()=>{
      const mockStore = configureMockStore<AppState>();
      mock.navigation.routes.selected = ROUTES.SELECT_PAGES;
      const store = mockStore(mock);
      expect(isEnableNextPageSelector(store.getState())).toBeFalsy();
    })
  });

  describe("on azure login", () => {
    it("isEnableNextPage valid always",()=>{
      const mockStore = configureMockStore<AppState>();
      mock.navigation.routes.selected = ROUTES.AZURE_LOGIN;
      const store = mockStore(mock);
      expect(isEnableNextPageSelector(store.getState())).toBeTruthy();
    });
  });

  describe("on review and generate", () => {
    it("isEnableNextPage valid always",()=>{
      const mockStore = configureMockStore<AppState>();
      mock.navigation.routes.selected = ROUTES.REVIEW_AND_GENERATE;
      const store = mockStore(mock);
      expect(isEnableNextPageSelector(store.getState())).toBeTruthy();
    });
  });
});