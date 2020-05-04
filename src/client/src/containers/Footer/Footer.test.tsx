import * as React from "react";
import configureMockStore from "redux-mock-store";
import Footer from ".";
import { getInitialState, setSelectedRoute } from "../../mockData/mockStore";
import { RenderResult } from "@testing-library/react";
import { renderWithStore } from "../../testUtils";
import styles from "./styles.module.css";
import { ROUTES } from "../../utils/constants";

describe("Footer", () => {
  let props: any;
  let wrapper: RenderResult;
  let store: any;
  let initialState: any;
  const mockStore = configureMockStore();


  beforeEach(() => {
    initialState = getInitialState();
    store = mockStore(initialState);
    props = {};
  });

  it("renders without crashing", () => {
    wrapper = renderWithStore(<Footer {...props} />, store);
    expect(wrapper).toBeDefined();
  });

  it("When page is new project next button should be shown", () => {
    wrapper = renderWithStore(<Footer {...props} />, store);
    const nextButton = wrapper.getByText('Next');
    expect(nextButton).toBeDefined();
    expect(nextButton).toHaveClass(styles.buttonHighlighted);
  });

  it("When page is SELECT_FRAMEWORKS next and back button should be shown", () => {
    setSelectedRoute(initialState, ROUTES.SELECT_FRAMEWORKS);
    wrapper = renderWithStore(<Footer {...props} />, store);
    const nextButton = wrapper.getByText('Next');
    expect(nextButton).toBeDefined();
    expect(nextButton).toHaveClass(styles.buttonHighlighted);

    const backButton = wrapper.getByText('Back');
    expect(backButton).toBeDefined();
    expect(backButton).toHaveClass(styles.buttonBack);
  });

  it("When page is REVIEW_AND_GENERATE back and generate button should be shown", () => {
    setSelectedRoute(initialState, ROUTES.REVIEW_AND_GENERATE);
    wrapper = renderWithStore(<Footer {...props} />, store);

    const backButton = wrapper.getByText('Back');
    expect(backButton).toBeDefined();
    expect(backButton).toHaveClass(styles.buttonBack);

    const createButton = wrapper.getByText('Create Project');
    expect(createButton).toBeDefined();
    expect(createButton).toHaveClass(styles.buttonHighlighted);
  });
});
