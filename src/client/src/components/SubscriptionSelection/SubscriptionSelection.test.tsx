import * as React from "react";
import configureMockStore from "redux-mock-store";
import SubscriptionSelection from ".";
import { Provider } from "react-redux";
import { getInitialState, setSubscriptions } from "../../mockData/mockStore";
import { render, RenderResult, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { IntlProvider } from "react-intl";
import { IDropdownProps } from "../Dropdown";
jest.mock("../Dropdown", () => ({ options, value, handleChange }: IDropdownProps) => {
  const handleInputChange = (event: any) => {
    if (handleChange) {
      handleChange(event.currentTarget);
    }
  };
  const newValue = value ? value.label : undefined;
  return (
    <select data-testid="dropdown" value={newValue} onChange={handleInputChange}>
      {options.map(({ label, value }: any) => (
        <option key={value} value={value}>
          {label}
        </option>
      ))}
    </select>
  );
});

const renderWithIntl = (component: any) => {
  return render(<IntlProvider locale="en">{component}</IntlProvider>);
};

const renderWithStore = (component: any, store: any) => {
  return renderWithIntl(<Provider store={store}>{component}</Provider>);
};

describe("SubscriptionSelection", () => {
  let props: any;
  let wrapper: RenderResult;
  let store: any;
  let initialState: any;
  const mockStore = configureMockStore();

  beforeEach(() => {
    initialState = getInitialState();
    setSubscriptions(initialState);
    store = mockStore(initialState);
    props = {
      initialSubscription: "",
      onSubscriptionChange: jest.fn(),
    };
  });

  it("renders without crashing", () => {
    wrapper = renderWithStore(<SubscriptionSelection {...props} />, store);
    expect(wrapper).toBeDefined();
  });

  it("If has initial subscription, onSubscriptionChange notify selected subscription", () => {
    props.initialSubscription = "subscription 1";
    wrapper = renderWithStore(<SubscriptionSelection {...props} />, store);
    expect(props.onSubscriptionChange).toHaveBeenCalledTimes(1);
    expect(props.onSubscriptionChange).toHaveBeenCalledWith("subscription 1");
  });

  it("When selected a subscription in a dropdown, onSubscriptionChange notify selected subscription", () => {
    wrapper = renderWithStore(<SubscriptionSelection {...props} />, store);
    const dropdown = wrapper.getByTestId("dropdown");
    fireEvent.change(dropdown, { target: { label:"subscription 1", value:"subscription 1"}});
    expect(props.onSubscriptionChange).toHaveBeenCalledTimes(1);
    expect(props.onSubscriptionChange).toHaveBeenCalledWith("subscription 1");
  });
});
