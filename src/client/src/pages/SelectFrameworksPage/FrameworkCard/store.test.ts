import { getInitialState } from "../../../mockData/mockStore";
import { IStateProps } from "./interfaces";
import { mapStateToProps } from "./store";

describe("Framework Card", () => {
  it("React", () => {
    const mapStateToPropsInstance: IStateProps = mapStateToProps(getInitialState());
    let counterAttributes = 0;
    for (const key in mapStateToPropsInstance) {
      if (key) counterAttributes++;
    }

    expect(mapStateToPropsInstance.isPreview).toBeFalsy();
    expect(mapStateToPropsInstance.frontEndSelect !== undefined).toBeTruthy();
    expect(mapStateToPropsInstance.backEndSelect !== undefined).toBeTruthy();
    expect(counterAttributes === 3).toBeTruthy();
  });
});
