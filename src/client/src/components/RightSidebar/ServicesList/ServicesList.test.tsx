import * as React from "react";
import configureMockStore from "redux-mock-store";

import { getInitialState } from "../../../mockData/mockStore";
import { renderWithStore } from "../../../testUtils";
import appServiceMessages from "./AppServiceSelection/messages";
import cosmosDBMessages from "./CosmosDBSelection/messages";
import ServicesList from "./index";

const emptyCosmosDB = null;
const emptyAppService = null;

const mockVsCode = {
  vscodeObject: {
    postMessage: jest.fn(),
  },
};

describe("ServicesList", () => {
  let props: any;
  let store: any;
  let wrapper: any;
  let initialState: any;

  const mockStore = configureMockStore();

  describe("When has not selected AppService in store", () => {
    beforeEach(() => {
      initialState = getInitialState();
      store = mockStore(initialState);
      initialState.userSelection.services = {
        appService: emptyAppService,
      };
      initialState.vscode = mockVsCode;

      wrapper = renderWithStore(<ServicesList {...props} />, store);
    });

    it("renders without crashing", () => {
      expect(wrapper).toBeDefined();
    });

    it("Should not have a rendered AppServiceSelection component", () => {
      expect(wrapper.queryByText(intl.formatMessage(appServiceMessages.title))).not.toBeInTheDocument();
    });
  });

  describe("When has selected AppService in store", () => {
    beforeEach(() => {
      store = mockStore(initialState);
      const appService = { ...emptyAppService, selection: {} };
      initialState = getInitialState();
      initialState.userSelection.services = {
        appService: appService,
      };
      initialState.vscode = mockVsCode;

      wrapper = renderWithStore(<ServicesList {...props} />, store);
    });

    it("renders without crashing", () => {
      expect(wrapper).toBeDefined();
    });

    it("Should have a rendered AppServiceSelection component", () => {
      const appServiceComponent = wrapper.getByText(intl.formatMessage(appServiceMessages.title));
      expect(appServiceComponent).toBeDefined();
    });
  });

  describe("When has not selected CosmosDB service in store", () => {
    beforeEach(() => {
      initialState = getInitialState();
      store = mockStore(initialState);
      initialState.userSelection.services = {
        cosmosDB: emptyCosmosDB,
      };
      initialState.vscode = mockVsCode;

      wrapper = renderWithStore(<ServicesList {...props} />, store);
    });

    it("renders without crashing", () => {
      expect(wrapper).toBeDefined();
    });

    it("Should not have a rendered CosmosDBSelection component", () => {
      expect(wrapper.queryByText(intl.formatMessage(cosmosDBMessages.title))).not.toBeInTheDocument();
    });
  });

  describe("When has selected CosmosDB service in store", () => {
    beforeEach(() => {
      const cosmosDB = { ...emptyCosmosDB, selection: ["any"] };

      initialState = getInitialState();
      store = mockStore(initialState);
      initialState.userSelection.services = { cosmosDB };
      initialState.vscode = mockVsCode;

      wrapper = renderWithStore(<ServicesList {...props} />, store);
    });

    it("renders without crashing", () => {
      expect(wrapper).toBeDefined();
    });

    it("Should have a rendered CosmosDBSelection component", () => {
      const cosmosDBComponent = wrapper.getByText(intl.formatMessage(cosmosDBMessages.title));
      expect(cosmosDBComponent).toBeDefined();
    });
  });
});
