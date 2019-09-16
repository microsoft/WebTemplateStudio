import { updateDependencyInfoAction } from "./updateDependencyInfo";
import { WIZARD_INFO_TYPEKEYS } from "./typeKeys";

describe("updateDependencyInfo actions", () => {
  it("should create an action", () => {
    const dependencyInfo = { dependency: "node" };
    expect(updateDependencyInfoAction(dependencyInfo)).toEqual({
      type: WIZARD_INFO_TYPEKEYS.UPDATE_DEPENDENCY_INFO,
      payload: dependencyInfo
    });
  });
});
