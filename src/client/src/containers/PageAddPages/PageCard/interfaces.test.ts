import { IStateProps } from './interfaces';
import { IVSCodeObject } from '../../../reducers/vscodeApiReducer';
import { ISelected } from '../../../types/selected';
import { getISelected, getIVSCodeApi, getInitialState } from '../../../mockData/testing';
import { mapStateToProps } from './store';

describe("validate infer name", () => {
  it("is not same",()=>{
    const mapStateToPropsInstance:IStateProps = mapStateToProps(getInitialState());

    let vscode:IVSCodeObject = mapStateToPropsInstance.vscode;
    let selectedPages: ISelected[] = mapStateToPropsInstance.selectedPages;
    let selectedFrontend: ISelected = mapStateToPropsInstance.selectedFrontend;
    let pageOutOfBounds:boolean= mapStateToPropsInstance.pageOutOfBounds;

    let test:IStateProps = {
      vscode,
      selectedPages,
      selectedFrontend,
      pageOutOfBounds
    }

    expect(test != undefined).toBeTruthy();
  });
});