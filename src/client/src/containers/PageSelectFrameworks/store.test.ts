import { mapStateToProps } from './store';
import { IStateProps } from './interfaces';
import { getInitialState } from '../../mockData/mockStore';

describe("PageSelectFramework", () => {
  it("React",()=>{
    const mapStateToPropsInstance: IStateProps = mapStateToProps(getInitialState());
    let counterAttributes = 0;
    for (const key in mapStateToPropsInstance) {
      if (key) counterAttributes++;
    }

    expect(mapStateToPropsInstance.vscode !== undefined).toBeTruthy();
    expect(mapStateToPropsInstance.frontendOptions !== undefined).toBeTruthy();
    expect(mapStateToPropsInstance.backendOptions !== undefined).toBeTruthy();

    expect(counterAttributes).toBe(3);
  });
});