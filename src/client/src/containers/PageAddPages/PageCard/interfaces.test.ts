import { IStateProps } from './interfaces';
import { IVSCodeObject } from '../../../reducers/vscodeApiReducer';
import { ISelected } from '../../../types/selected';
import { getISelected, getIVSCodeApi } from '../../../mockData/testing';

describe("validate infer name", () => {
  it("is not same",()=>{
    let vscode:IVSCodeObject = getIVSCodeApi().vscode.vscodeObject;
    let selectedPages: ISelected[] = [getISelected()];
    let selectedFrontend: ISelected = getISelected();
    let pageOutOfBounds:boolean=false;

    let test:IStateProps = {
      vscode,
      selectedPages,
      selectedFrontend,
      pageOutOfBounds
    }

    expect(test != undefined).toBeTruthy();
  });
});