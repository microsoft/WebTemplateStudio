import { mapStateToProps } from './store';
import { IStateProps } from './interfaces';
import { getInitialState } from '../../../mockData/mockStore';

describe("Framework Card", () => {
  it("React",()=>{
    const mapStateToPropsInstance:IStateProps = mapStateToProps(getInitialState());
    let counterAttributes:number=0;
    for (let key in mapStateToPropsInstance) counterAttributes++;

    expect(mapStateToPropsInstance.vscode != undefined).toBeTruthy();
    expect(mapStateToPropsInstance.isPreview).toBeFalsy();
    expect(mapStateToPropsInstance.frontEndSelect != undefined).toBeTruthy();
    expect(mapStateToPropsInstance.backEndSelect != undefined).toBeTruthy();
    expect(counterAttributes === 4).toBeTruthy();
  });

 
});