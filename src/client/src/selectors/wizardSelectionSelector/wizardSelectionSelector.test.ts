import configureMockStore from "redux-mock-store";
import { isEnableNextPage} from "./wizardSelectionSelector";
import { ROUTES } from "../../utils/constants";


describe("wizardSelectionSelector", () => {
  let mock: {};
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
        },
        frontendFramework:{
          title:""
        },
        backendFramework:{
          title:""
        },
        pages:[]
      }
    };
  })

  describe("on home", () => {
    it("isEnableNextPage valid",()=>{
      const mockStore = configureMockStore();
      mock.wizardRoutes.selected = ROUTES.NEW_PROJECT;
      mock.selection.projectNameObject.validation.isValid = true;
      mock.selection.outputPathObject.outputPath="c:/sadadasd";
      const store = mockStore(mock);
      expect(isEnableNextPage(store.getState())).toBeTruthy();
    })

    it("isEnableNextPage invalid (project name invalid)",()=>{
      const mockStore = configureMockStore();
      mock.wizardRoutes.selected = ROUTES.NEW_PROJECT;
      mock.selection.projectNameObject.validation.isValid = false;
      mock.selection.outputPathObject.outputPath="c:/sadadasd";
      const store = mockStore(mock);
      expect(isEnableNextPage(store.getState())).toBeFalsy();
    })

    it("isEnableNextPage invalid (out path wrong)",()=>{
      const mockStore = configureMockStore();
      mock.wizardRoutes.selected = ROUTES.NEW_PROJECT;
      mock.selection.projectNameObject.validation.isValid = true;
      mock.selection.outputPathObject.outputPath="";
      const store = mockStore(mock);
      expect(isEnableNextPage(store.getState())).toBeFalsy();
    })
  });

  describe("on select framework", () => {
    it("isEnableNextPage valid",()=>{
      const mockStore = configureMockStore();
      mock.wizardRoutes.selected = ROUTES.SELECT_FRAMEWORKS;
      mock.selection.frontendFramework.title = "sfsdf";
      mock.selection.backendFramework.title = "sfsdf";
      const store = mockStore(mock);
      expect(isEnableNextPage(store.getState())).toBeTruthy();
    })

    it("isEnableNextPage invalid (frontendFramework unselected)",()=>{
      const mockStore = configureMockStore();
      mock.wizardRoutes.selected = ROUTES.SELECT_FRAMEWORKS;
      mock.selection.frontendFramework.title = "";
      mock.selection.backendFramework.title = "sfsdf";
      const store = mockStore(mock);
      expect(isEnableNextPage(store.getState())).toBeFalsy();
    })

    it("isEnableNextPage invalid (backendFramework unselected)",()=>{
      const mockStore = configureMockStore();
      mock.wizardRoutes.selected = ROUTES.SELECT_FRAMEWORKS;
      mock.selection.frontendFramework.title = "sdfsdf";
      mock.selection.backendFramework.title = "";
      const store = mockStore(mock);
      expect(isEnableNextPage(store.getState())).toBeFalsy();
    })
  });

  describe("on select pages", () => {
    it("isEnableNextPage valid",()=>{
      const mockStore = configureMockStore();
      mock.wizardRoutes.selected = ROUTES.SELECT_PAGES;
      mock.selection.pages.push({isValidTitle:true});
      const store = mockStore(mock);
      expect(isEnableNextPage(store.getState())).toBeTruthy();
    })

    it("isEnableNextPage invalid (frontendFramework unselected)",()=>{
      const mockStore = configureMockStore();
      mock.wizardRoutes.selected = ROUTES.SELECT_PAGES;
      const store = mockStore(mock);
      expect(isEnableNextPage(store.getState())).toBeFalsy();
    })
  });

  describe("on azure login", () => {
    it("isEnableNextPage valid always",()=>{
      const mockStore = configureMockStore();
      mock.wizardRoutes.selected = ROUTES.AZURE_LOGIN;
      const store = mockStore(mock);
      expect(isEnableNextPage(store.getState())).toBeTruthy();
    });
  });

  describe("on review and generate", () => {
    it("isEnableNextPage valid always",()=>{
      const mockStore = configureMockStore();
      mock.wizardRoutes.selected = ROUTES.REVIEW_AND_GENERATE;
      const store = mockStore(mock);
      expect(isEnableNextPage(store.getState())).toBeTruthy();
    });
  });
});