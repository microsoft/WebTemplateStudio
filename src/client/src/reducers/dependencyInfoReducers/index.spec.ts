import { updateDependencyInfo as dependencyInfo, initialState } from "./index";
import { updateDependencyInfoAction } from "../../actions/wizardInfoActions/updateDependencyInfo";

describe("dependencyInfo reducer", () => {
  it("should handle initial state", () => {
    expect(dependencyInfo(undefined, {})).toEqual(initialState);
  });

  it("should add new dependencies", () => {
    const mockAction = updateDependencyInfoAction({
      dependency: "python",
      installed: true
    });
    const expectedState = {
      python: {
        installed: true
      }
    };
    expect(dependencyInfo(initialState, mockAction)).toEqual(expectedState);
  });

  it("should change installation state", () => {
    const mockAction = updateDependencyInfoAction({
      dependency: "node",
      installed: true
    });
    const expectedState = {
      node: {
        installed: true
      }
    };
    expect(dependencyInfo({ node: { installed: false } }, mockAction)).toEqual(
      expectedState
    );
  });
});
