import { mapStateToProps } from './store';
import { IStateProps } from './interfaces';
import { getInitialState } from '../../../mockData/mockStore';

describe("Page Card", () => {
  it("React",()=>{
    const mapStateToPropsInstance: IStateProps = mapStateToProps(getInitialState());
    let counterAttributes = 0;
    for (const key in mapStateToPropsInstance) {
      if (key) counterAttributes++;
    }

    expect(mapStateToPropsInstance.pageOutOfBounds).toBeFalsy();
    expect(mapStateToPropsInstance.selectedFrontend !== undefined).toBeTruthy();
    expect(mapStateToPropsInstance.selectedPages !== undefined).toBeTruthy();
    expect(counterAttributes === 3).toBeTruthy();
  });
});