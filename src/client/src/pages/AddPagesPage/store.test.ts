import { getInitialState } from "../../mockData/mockStore";
import { IStoreProps } from "./interfaces";
import { mapStateToProps } from "./store";

describe("AddPagesPage", () => {
  it("react", () => {
    const mapStateToPropsInstance: IStoreProps = mapStateToProps(getInitialState());
    let counterAttributes = 0;
    for (const key in mapStateToPropsInstance) {
      if (key) counterAttributes++;
    }

    expect(mapStateToPropsInstance.options !== undefined).toBeTruthy();
    expect(mapStateToPropsInstance.pageOutOfBounds).toBeFalsy();
    expect(counterAttributes === 2).toBeTruthy();
  });
});
