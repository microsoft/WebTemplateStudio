import { mapStateToProps } from './store';
import { IStateProps } from './interfaces';
import { getInitialState } from '../../mockData/mockStore';

describe("PageSelectFramework", () => {
  it("React",()=>{
    const mapStateToPropsInstance:IStateProps = mapStateToProps(getInitialState());
    let counterAttributes:number=0;
    for (let key in mapStateToPropsInstance) counterAttributes++;

    expect(mapStateToPropsInstance.vscode != undefined).toBeTruthy();
    expect(mapStateToPropsInstance.frontendOptions != undefined).toBeTruthy();
    expect(mapStateToPropsInstance.backendOptions != undefined).toBeTruthy();
    expect(counterAttributes === 3).toBeTruthy();
  });

  
});