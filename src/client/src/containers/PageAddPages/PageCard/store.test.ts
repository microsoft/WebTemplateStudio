import { mapStateToProps } from './store';
import { IStateProps } from './interfaces';
import { getInitialState } from '../../../mockData/testing';

describe("Page Card", () => {
  it("React",()=>{
    const mapStateToPropsInstance:IStateProps = mapStateToProps(getInitialState('React'));
    let counterAttributes:number=0;
    for (let key in mapStateToPropsInstance) counterAttributes++;

    expect(mapStateToPropsInstance.vscode != undefined).toBeTruthy();
    expect(mapStateToPropsInstance.pageOutOfBounds).toBeFalsy();
    expect(mapStateToPropsInstance.selectedFrontend != undefined).toBeTruthy();
    expect(mapStateToPropsInstance.selectedPages != undefined).toBeTruthy();
    expect(counterAttributes === 4).toBeTruthy();
  });

  it("Angular",()=>{
    const mapStateToPropsInstance:IStateProps = mapStateToProps(getInitialState('Angular'));
    let counterAttributes:number=0;
    for (let key in mapStateToPropsInstance) counterAttributes++;

    expect(mapStateToPropsInstance.vscode != undefined).toBeTruthy();
    expect(mapStateToPropsInstance.pageOutOfBounds).toBeFalsy();
    expect(mapStateToPropsInstance.selectedFrontend != undefined).toBeTruthy();
    expect(mapStateToPropsInstance.selectedPages != undefined).toBeTruthy();
    expect(counterAttributes === 4).toBeTruthy();
  });

  it("Vue",()=>{
    const mapStateToPropsInstance:IStateProps = mapStateToProps(getInitialState('Vue'));
    let counterAttributes:number=0;
    for (let key in mapStateToPropsInstance) counterAttributes++;

    expect(mapStateToPropsInstance.vscode != undefined).toBeTruthy();
    expect(mapStateToPropsInstance.pageOutOfBounds).toBeFalsy();
    expect(mapStateToPropsInstance.selectedFrontend != undefined).toBeTruthy();
    expect(mapStateToPropsInstance.selectedPages != undefined).toBeTruthy();
    expect(counterAttributes === 4).toBeTruthy();
  });
});