import * as React from "react";
import configureMockStore from "redux-mock-store";
import { ServiceCard } from "./index";
import { renderWithStore } from "../../../testUtils";
import { getInitialState, setAzureEmail } from "../../../mockData/mockStore";
import messages from "./messages";
import { fireEvent } from "@testing-library/react";
import { setDetailPageAction } from "../../../store/config/detailsPage/action";
import { openAzureLoginModalAction } from "../../../store/navigation/modals/action";
import { IOption } from "../../../types/option";
import { AppState } from "../../../store/combineReducers";

jest.mock("../../../store/config/detailsPage/action", () => {
  jest.fn((detailPageInfo: IOption, isIntlFormatted = false, originRoute: string) => ({
    type: "WTS/navigation/routes/SET_DETAILS_PAGE_INFO",
    payload: {
      data: detailPageInfo,
      isIntlFormatted,
      originRoute,
    },
  }));

  const setPageWizardPageAction = jest.fn((route: string) => ({
    type: "WTS/navigation/routes/SET_PAGE_WIZARD_PAGE",
    payload: route,
  }));
  return {
    setPageWizardPageAction,
  };
});

jest.mock("../../../store/navigation/modals/action", () => {
  const openAzureLoginModalAction = jest.fn((serviceInternalName: string) => ({
    type: "AZURE_LOGIN_MODAL",
    payload: serviceInternalName,
  }));
  return {
    openAzureLoginModalAction,
  };
});

xdescribe("ServiceCard", () => {
  let props: any;
  let store: any;
  let initialState: AppState;
  const mockStore = configureMockStore<AppState>();

  const serviceOpenModalAction = jest.fn(() => ({
    type: "WTS/navigation/modals/OPEN_MODAL",
    payload: {
      modalType: "APP_SERVICE_MODAL",
      modalData: null,
    },
  }));

  const mockService: IService = {
    body: "Quickly build, deploy, and scale your web apps with confidence.",
    internalName: "wts.Feature.Azure.AppService",
    templateGroupIdentity: "wts.Feature.Azure.AppService",
    licenses: [],
    longDescription:
      "Quickly build, deploy, and scale web apps with confidence. Meet rigorous, enterprise-grade performance, security, and compliance requirements by using the fully managed platform for your operational and monitoring tasks.",
    selected: false,
    svgUrl: "",
    title: "App Service",
    defaultName: "App Service",
    isValidTitle: true,
    author: "Microsoft",
    group: "CloudHosting",
    openModalAction: serviceOpenModalAction(),
    expectedPrice: {
      id: "servicesSelector.appServiceExpectedPrice",
      defaultMessage: "Free 30 Day Trial",
    },
    expectedTime: {
      id: "servicesSelector.appServiceExpectedTime",
      defaultMessage: "3 - 5 minute set-up time",
    },
  };

  beforeEach(() => {
    initialState = getInitialState();
    store = mockStore(initialState);
    props = {
      service: mockService,
      intl,
    };
  });

  it("renders without crashing", () => {
    const wrapper = renderWithStore(<ServiceCard {...props} />, store);
    expect(wrapper).toBeDefined();
  });

  it("renders service title, body, expected price and expected time", () => {
    const wrapper = renderWithStore(<ServiceCard {...props} />, store);

    expect(wrapper.getByText(mockService.title)).toBeDefined();
    expect(wrapper.getByText(mockService.body)).toBeDefined();
    expect(wrapper.getByText(intl.formatMessage(mockService.expectedPrice))).toBeDefined();
    expect(wrapper.getByText(intl.formatMessage(mockService.expectedTime))).toBeDefined();
  });

  it("when learn more button clicked, setPageWizardPageAction and setDetailPageAction should be called", () => {
    const wrapper = renderWithStore(<ServiceCard {...props} />, store);

    const learnMoreButton = wrapper.getByText(intl.formatMessage(messages.learnMore));
    fireEvent.click(learnMoreButton);
    //expect(setPageWizardPageAction).toHaveBeenCalled();
    expect(setDetailPageAction).toHaveBeenCalled();
  });

  it("when press enter key on learn more button, setPageWizardPageAction and setDetailPageAction should be called", () => {
    const wrapper = renderWithStore(<ServiceCard {...props} />, store);

    const learnMoreButton = wrapper.getByText(intl.formatMessage(messages.learnMore));
    fireEvent.keyDown(learnMoreButton, { key: "Enter", code: "Enter" });
    //expect(setPageWizardPageAction).toBeCalled();
    expect(setDetailPageAction).toBeCalled();
  });

  it("If user is not Logged in and click on open modal button, openAzureLoginModalAction should be called  ", () => {
    const wrapper = renderWithStore(<ServiceCard {...props} />, store);
    expect(wrapper).toBeDefined();

    const openModalButton = wrapper.getByText(intl.formatMessage(messages.addToProject));
    fireEvent.click(openModalButton);
    expect(openAzureLoginModalAction).toBeCalled();
  });

  it("If user is Logged in and click on open modal button, serviceOpenModalAction should be called", () => {
    initialState = getInitialState();
    setAzureEmail(initialState);
    store = mockStore(initialState);
    const wrapper = renderWithStore(<ServiceCard {...props} />, store);
    expect(wrapper).toBeDefined();

    const openModalButton = wrapper.getByText(intl.formatMessage(messages.addToProject));
    fireEvent.click(openModalButton);
    expect(serviceOpenModalAction).toBeCalled();
  });
});
