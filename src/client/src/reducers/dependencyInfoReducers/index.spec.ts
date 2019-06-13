import { updateDependencyInfo as dependencyInfo, initialState } from "./index";
import { updateDependencyInfoAction } from "../../actions/wizardInfoActions/updateDependencyInfo";

describe("dependencyInfo reducer", () => {
  it("should handle initial state", () => {
    expect(dependencyInfo(undefined, {})).toEqual(initialState);
  });

  it("should add new dependencies", () => {
    const mockAction = updateDependencyInfoAction({
      dependency: "python",
      installationState: -1
    });
    const expectedState = {
      python: {
        installationState: -1
      }
    };
    expect(dependencyInfo(initialState, mockAction)).toEqual(expectedState);

    const mockAction2 = updateDependencyInfoAction({
      dependency: "node",
      installationState: 1
    });
    const expectedState2 = {
      node: {
        installationState: 1
      },
      python: {
        installationState: -1
      }
    };
    expect(dependencyInfo(expectedState, mockAction2)).toEqual(expectedState2);
  });

  it("should change installation state", () => {
    const mockAction = updateDependencyInfoAction({
      dependency: "node",
      installationState: 0
    });
    const expectedState = {
      node: {
        installationState: 0
      }
    };
    expect(
      dependencyInfo({ node: { installationState: 1 } }, mockAction)
    ).toEqual(expectedState);
  });
});
