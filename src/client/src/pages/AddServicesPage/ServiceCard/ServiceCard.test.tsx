jest.mock("../../../store/config/detailsPage/action", () => {
  const setDetailPageAction = jest.fn((detailPageInfo: IOption, isIntlFormatted = false, originRoute: string) => ({
    type: "WTS/navigation/routes/SET_DETAILS_PAGE_INFO",
    payload: {
      data: detailPageInfo,
      isIntlFormatted,
      originRoute,
    },
  }));

  return {
    setDetailPageAction,
  };
});

jest.mock("../../../store/navigation/modals/action", () => {
  const openAzureServicesModalAction = jest.fn((serviceInternalName: string) => ({
    type: "AZURE_LOGIN_MODAL",
    payload: serviceInternalName,
  }));
  return {
    openAzureServicesModalAction,
  };
});

import { fireEvent } from "@testing-library/react";
import * as React from "react";
import configureMockStore from "redux-mock-store";

import { getInitialState, setAzureEmail } from "../../../mockData/mockStore";
import { AppState } from "../../../store/combineReducers";
import { setDetailPageAction } from "../../../store/config/detailsPage/action";
import { openAzureServicesModalAction } from "../../../store/navigation/modals/action";

import { renderWithStore } from "../../../testUtils";
import { IOption } from "../../../types/option";
import { ServiceCard } from "./index";
import messages from "./messages";

describe("ServiceCard", () => {
  let props: any;
  let store: any;
  let initialState: AppState;
  let wrapper: any;

  const mockStore = configureMockStore<AppState>();

  const mockService: IService = {
    body: "Quickly build, deploy, and scale your web apps with confidence.",
    internalName: "wts.Feature.Azure.AppService",
    templateGroupIdentity: "wts.Feature.Azure.AppService",
    licenses: [],
    longDescription:
      "Quickly build, deploy, and scale web apps with confidence. Meet rigorous, enterprise-grade performance, security, and compliance requirements by using the fully managed platform for your operational and monitoring tasks.",
    selected: false,
    icon: "",
    title: "App Service",
    defaultName: "App Service",
    isValidTitle: true,
    author: "Microsoft",
    group: "CloudHosting",
    openModalAction: jest.fn(),
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
    wrapper = renderWithStore(<ServiceCard {...props} />, store);
  });

  it("renders without crashing", () => {
    expect(wrapper).toBeDefined();
  });

  it("renders service title, body, expected price and expected time", () => {
    expect(wrapper.getByText(mockService.title)).toBeDefined();
    expect(wrapper.getByText(mockService.body)).toBeDefined();
    expect(wrapper.getByText(intl.formatMessage(mockService.expectedPrice))).toBeDefined();
    expect(wrapper.getByText(intl.formatMessage(mockService.expectedTime))).toBeDefined();
  });

  it("when learn more button clicked, setDetailPageAction should be called", () => {
    const learnMoreButton = wrapper.getByText(intl.formatMessage(messages.learnMore));
    fireEvent.click(learnMoreButton);
    expect(setDetailPageAction).toHaveBeenCalled();
  });

  it("when press enter key on learn more button, setDetailPageAction should be called", () => {
    const learnMoreButton = wrapper.getByText(intl.formatMessage(messages.learnMore));
    fireEvent.keyDown(learnMoreButton, { key: "Enter", code: "Enter" });
    expect(setDetailPageAction).toBeCalled();
  });

  xit("If user is not Logged in and click on open modal button, openAzureServicesModalAction should be called  ", () => {
    const openModalButton = wrapper.getByText(intl.formatMessage(messages.addToProject));
    fireEvent.click(openModalButton);
    expect(openAzureServicesModalAction).toBeCalled();
  });

  xit("If user is Logged in and click on open modal button, serviceOpenModalAction should be called", () => {
    initialState = getInitialState();
    setAzureEmail(initialState);
    store = mockStore(initialState);
    wrapper = renderWithStore(<ServiceCard {...props} />, store);
    expect(wrapper).toBeDefined();

    const openModalButton = wrapper.getByText(intl.formatMessage(messages.addToProject));
    fireEvent.click(openModalButton);
    expect(openAzureServicesModalAction).toBeCalled();
  });

  it("dont show button add to project", () => {
    expect(wrapper.getAllByRole("figure")).toHaveLength(2);
  });

  xit("on mouse over should show button add page", () => {
    fireEvent.mouseOver(wrapper.getByText(intl.formatMessage(messages.addToProject)));
    expect(wrapper.queryAllByRole("figure")).toHaveLength(3);
  });

  xit("add service", () => {
    fireEvent.click(wrapper.getByText(intl.formatMessage(messages.addToProject)));
    expect(setDetailPageAction).toBeCalled();
  });
});
