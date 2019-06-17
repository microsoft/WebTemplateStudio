import { updateDependencyInfo as dependencyInfo, initialState } from "./index";
import { updateDependencyInfoAction } from "../../actions/wizardInfoActions/updateDependencyInfo";

describe("dependencyInfo reducer", () => {
  it("should handle initial state", () => {
    expect(dependencyInfo(undefined, {})).toEqual(initialState);
  });

  it("should add new dependencies", () => {
    const mockAction = updateDependencyInfoAction({
      dependency: "python",
      installationState: true
    });
    const expectedState = {
      python: {
        installationState: true
      }
    };
    expect(dependencyInfo(initialState, mockAction)).toEqual(expectedState);
  });

  it("should change installation state", () => {
    const mockAction = updateDependencyInfoAction({
      dependency: "node",
      installationState: true
    });
    const expectedState = {
      node: {
        installationState: true
      }
    };
    expect(
      dependencyInfo({ node: { installationState: false } }, mockAction)
    ).toEqual(expectedState);
  });
});
