import { ISelected } from "../../types/selected";
import { inferItemName } from "./itemName";

describe("validate infer name", () => {
  it("is not same", () => {
    const selected: ISelected = { title: "t1", internalName: "Blank" };

    const newName: string = inferItemName("t2", [selected]);
    expect(newName !== "").toBeTruthy();
  });

  it("is same", () => {
    const selected: ISelected = { title: "t1", internalName: "Blank" };

    const newName: string = inferItemName("t1", [selected]);
    expect(newName !== "").toBeTruthy();
  });
});
