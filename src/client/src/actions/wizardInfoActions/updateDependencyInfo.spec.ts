import { updateDependencyInfoAction } from "./updateDependencyInfo";
import { WIZARD_INFO_TYPEKEYS } from "./typeKeys";

describe("updateDependencyInfo actions", () => {
  it("should create an action", () => {
    expect(updateDependencyInfoAction({ a: 1 })).toEqual({
      type: WIZARD_INFO_TYPEKEYS.UPDATE_DEPENDENCY_INFO,
      payload: { a: 1 }
    });
  });
});
