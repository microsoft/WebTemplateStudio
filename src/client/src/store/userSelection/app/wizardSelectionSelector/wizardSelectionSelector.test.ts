import configureMockStore from "redux-mock-store";
import { isEnableNextPageSelector} from "./wizardSelectionSelector";
import { ROUTE } from "../../../../utils/constants/routes";
import { getInitialState } from "../../../../mockData/mockStore";
import { AppState } from "../../../combineReducers";
import { ISelected } from "../../../../types/selected";


describe("wizardSelectionSelector", () => {
  let mock: AppState;
  beforeEach(()=>{
    mock = getInitialState();
  })

  describe("on home", () => {
    it("isEnableNextPage valid",()=>{
      const mockStore = configureMockStore<AppState>();
      //mock.navigation.routes.selected = ROUTE.NEW_PROJECT;
      mock.navigation.routesNavItems.forEach(route => {route.isSelected=false});
      mock.navigation.routesNavItems.filter(route => route.route === ROUTE.NEW_PROJECT)[0].isSelected=true;
      mock.userSelection.projectNameObject.validation.isValid = true;
      mock.userSelection.outputPathObject.outputPath="c:/sadadasd";
      const store = mockStore(mock);
      expect(isEnableNextPageSelector(store.getState())).toBeTruthy();
    })

    it("isEnableNextPage invalid (project name invalid)",()=>{
      const mockStore = configureMockStore<AppState>();
      //mock.navigation.routes.selected = ROUTE.NEW_PROJECT;
      mock.navigation.routesNavItems.forEach(route => {route.isSelected=false});
      mock.navigation.routesNavItems.filter(route => route.route === ROUTE.NEW_PROJECT)[0].isSelected=true;
      mock.userSelection.projectNameObject.validation.isValid = false;
      mock.userSelection.outputPathObject.outputPath="c:/sadadasd";
      const store = mockStore(mock);
      expect(isEnableNextPageSelector(store.getState())).toBeFalsy();
    })

    it("isEnableNextPage invalid (out path wrong)",()=>{
      const mockStore = configureMockStore<AppState>();
      //mock.navigation.routes.selected = ROUTE.NEW_PROJECT;
      mock.navigation.routesNavItems.forEach(route => {route.isSelected=false});
      mock.navigation.routesNavItems.filter(route => route.route === ROUTE.NEW_PROJECT)[0].isSelected=true;
      mock.userSelection.projectNameObject.validation.isValid = true;
      mock.userSelection.outputPathObject.outputPath="";
      const store = mockStore(mock);
      expect(isEnableNextPageSelector(store.getState())).toBeFalsy();
    })
  });

  describe("on select framework", () => {
    it("isEnableNextPage valid",()=>{
      const mockStore = configureMockStore<AppState>();
      //mock.navigation.routes.selected = ROUTE.SELECT_FRAMEWORKS;
      mock.navigation.routesNavItems.forEach(route => {route.isSelected=false});
      mock.navigation.routesNavItems.filter(route => route.route === ROUTE.SELECT_FRAMEWORKS)[0].isSelected=true;
      mock.userSelection.frontendFramework.title = "sfsdf";
      mock.userSelection.backendFramework.title = "sfsdf";
      const store = mockStore(mock);
      expect(isEnableNextPageSelector(store.getState())).toBeTruthy();
    })

    it("isEnableNextPage invalid (frontendFramework unselected)",()=>{
      const mockStore = configureMockStore<AppState>();
      //mock.navigation.routes.selected = ROUTE.SELECT_FRAMEWORKS;
      mock.navigation.routesNavItems.forEach(route => {route.isSelected=false});
      mock.navigation.routesNavItems.filter(route => route.route === ROUTE.SELECT_FRAMEWORKS)[0].isSelected=true;
      mock.userSelection.frontendFramework.title = "";
      mock.userSelection.backendFramework.title = "sfsdf";
      const store = mockStore(mock);
      expect(isEnableNextPageSelector(store.getState())).toBeFalsy();
    })

    it("isEnableNextPage invalid (backendFramework unselected)",()=>{
      const mockStore = configureMockStore<AppState>();
      //mock.navigation.routes.selected = ROUTE.SELECT_FRAMEWORKS;
      mock.navigation.routesNavItems.forEach(route => {route.isSelected=false});
      mock.navigation.routesNavItems.filter(route => route.route === ROUTE.SELECT_FRAMEWORKS)[0].isSelected=true;
      mock.userSelection.frontendFramework.title = "sdfsdf";
      mock.userSelection.backendFramework.title = "";
      const store = mockStore(mock);
      expect(isEnableNextPageSelector(store.getState())).toBeFalsy();
    })
  });

  describe("on select pages", () => {
    it("isEnableNextPage valid",()=>{
      const mockStore = configureMockStore<AppState>();
      //mock.navigation.routes.selected = ROUTE.ADD_PAGES;
      mock.navigation.routesNavItems.forEach(route => {route.isSelected=false});
      mock.navigation.routesNavItems.filter(route => route.route === ROUTE.ADD_PAGES)[0].isSelected=true;
      const validPage: ISelected = {title:"", isValidTitle:true, internalName:"wts.mock.blank"};
      mock.userSelection.pages.push(validPage);
      const store = mockStore(mock);
      expect(isEnableNextPageSelector(store.getState())).toBeTruthy();
    })
  });

  describe("on azure login", () => {
    it("isEnableNextPage valid always",()=>{
      const mockStore = configureMockStore<AppState>();
      //mock.navigation.routes.selected = ROUTE.ADD_SERVICES;
      mock.navigation.routesNavItems.forEach(route => {route.isSelected=false});
      mock.navigation.routesNavItems.filter(route => route.route === ROUTE.ADD_SERVICES)[0].isSelected=true;
      const store = mockStore(mock);
      expect(isEnableNextPageSelector(store.getState())).toBeTruthy();
    });
  });

  describe("on review and generate", () => {
    it("isEnableNextPage valid always",()=>{
      const mockStore = configureMockStore<AppState>();
      //mock.navigation.routes.selected = ROUTE.REVIEW_AND_GENERATE;
      mock.navigation.routesNavItems.forEach(route => {route.isSelected=false});
      mock.navigation.routesNavItems.filter(route => route.route === ROUTE.REVIEW_AND_GENERATE)[0].isSelected=true;
      const store = mockStore(mock);
      expect(isEnableNextPageSelector(store.getState())).toBeTruthy();
    });
  });
});