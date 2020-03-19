import * as React from "react";
import configureMockStore from "redux-mock-store";
import ServicesList from "./index";
import { Provider } from "react-redux";
import AppServiceSelection from "./AppServiceSelection";
import CosmosDBSelection from "./CosmosDBSelection";

const mockStore = configureMockStore();

const emptyCosmosDB = {
  accountNameAvailability: {
    isAccountNameAvailable: false,
    message: ""
  },
  selection: [],
  wizardContent: {
    serviceType: {
      defaultMessage: "CosmosDB",
      id: "cosmosDb.originalTitle"
    }
  }
};

const emptyAppService = {
  siteNameAvailability: {
    isSiteNameAvailable: false,
    message: ""
  },
  selection: null,
  wizardContent: {
    serviceType: {
      defaultMessage: "App Service",
      id: "appService.originalTitle"
    }
  }
};

const mockVsCode = {
  vscodeObject:{
    postMessage: jest.fn()
  }
}

describe("ServicesList", () => {
  let props: any;
  let wrapper: any;
  let store: any;

  describe("When has not selected AppService in store", () => {
    beforeEach(() => {
      store = mockStore({
        selection: {
          services: {
            appService: emptyAppService
          }
        },
        vscode: mockVsCode
      });

      wrapper = mountWithIntl(
        <Provider store={store}>
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

      store = mockStore({
        selection: {
          services: {
            appService: appService
          }
        },
        vscode: mockVsCode
      });

      wrapper = mountWithIntl(
        <Provider store={store}>
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
      store = mockStore({
        selection: {
          services: {
            cosmosDB: emptyCosmosDB
          }
        },
        vscode: mockVsCode
      });

      wrapper = mountWithIntl(
        <Provider store={store}>
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

      store = mockStore({
        selection: {
          services: {
            cosmosDB: cosmosDB
          }
        },
        vscode: mockVsCode
      });

      wrapper = mountWithIntl(
        <Provider store={store}>
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
