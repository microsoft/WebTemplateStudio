import * as React from "react";
import configureMockStore from "redux-mock-store";
import ServicesList from "./index";
import { Provider } from "react-redux";
import AppServiceSelection from "./AppServiceSelection";
import CosmosDBSelection from "./CosmosDBSelection";
import { getInitialState } from "../../../mockData/mockStore";

const mockStore = configureMockStore();

const emptyCosmosDB = null;
const emptyAppService = null;

const mockVsCode = {
  vscodeObject:{
    postMessage: jest.fn()
  }
}

describe("ServicesList", () => {
  let props: any;
  let wrapper: any;
  let initialState: any;

  describe("When has not selected AppService in store", () => {
    beforeEach(() => {
      initialState = getInitialState();
      initialState.userSelection.services = {
        appService: emptyAppService
      };
      initialState.vscode= mockVsCode

      wrapper = mountWithIntl(
        <Provider store={mockStore(initialState)}>
          <ServicesList {...props} />
        </Provider>
      ).children();
    });

    it("renders without crashing", () => {
      expect(wrapper).toBeDefined();
    });

    it("Should not have a rendered AppServiceSelection component", () => {
      const appServiceComponent = wrapper.find(AppServiceSelection);
      expect(appServiceComponent).toHaveLength(0);
    });
  });

  describe("When has selected AppService in store", () => {
    beforeEach(() => {
      const appService = { ...emptyAppService, selection: {} };
      initialState = getInitialState();
      initialState.userSelection.services = {
        appService: appService
      };
      initialState.vscode = mockVsCode;

      wrapper = mountWithIntl(
        <Provider store={mockStore(initialState)}>
          <ServicesList {...props} />
        </Provider>
      ).children();
    });

    it("renders without crashing", () => {
      expect(wrapper).toBeDefined();
    });

    it("Should have a rendered AppServiceSelection component", () => {
    const appServiceComponent = wrapper.find(AppServiceSelection);
      expect(appServiceComponent).toHaveLength(1);
    });
  });

  describe("When hasn not selected CosmosDB service in store", () => {
    beforeEach(() => {
      initialState = getInitialState();
      initialState.userSelection.services = {
        cosmosDB: emptyCosmosDB
      };
      initialState.vscode = mockVsCode;

      wrapper = mountWithIntl(
        <Provider store={mockStore(initialState)}>
          <ServicesList {...props} />
        </Provider>
      ).children();
    });

    it("renders without crashing", () => {
      expect(wrapper).toBeDefined();
    });

    it("Should not have a rendered CosmosDBSelection component", () => {
      const cosmosDBComponent = wrapper.find(CosmosDBSelection);
      expect(cosmosDBComponent).toHaveLength(0);
    });
  });

  describe("When has selected CosmosDB service in store", () => {
    beforeEach(() => {
      const cosmosDB = { ...emptyCosmosDB, selection: ["any"] };

      initialState = getInitialState();
      initialState.userSelection.services = { cosmosDB };
      initialState.vscode = mockVsCode;

      wrapper = mountWithIntl(
        <Provider store={mockStore(initialState)}>
          <ServicesList {...props} />
        </Provider>
      ).children();
    });

    it("renders without crashing", () => {
      expect(wrapper).toBeDefined();
    });

    it("Should have a rendered CosmosDBSelection component", () => {
      const cosmosDBComponent = wrapper.find(CosmosDBSelection);
      expect(cosmosDBComponent).toHaveLength(1);
    });
  });
});
