import { mapStateToProps } from './store';
import { IStoreProps } from './interfaces';
import { getInitialState } from '../../mockData/mockStore';

describe("pageAddPages", () => {
  it("react",()=>{
    const mapStateToPropsInstance:IStoreProps = mapStateToProps(getInitialState());
    let counterAttributes:number=0;
    for (let key in mapStateToPropsInstance) counterAttributes++;

    expect(mapStateToPropsInstance.options != undefined).toBeTruthy();
    expect(mapStateToPropsInstance.pageOutOfBounds).toBeFalsy();
    expect(counterAttributes === 2).toBeTruthy();
  });

 
});