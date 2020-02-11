import { mapStateToProps } from './store';
import { IStoreProps } from './interfaces';
import { getInitialState } from '../../mockData/testing';

describe("pageAddPages", () => {
  it("react",()=>{
    const mapStateToPropsInstance:IStoreProps = mapStateToProps(getInitialState('React'));
    let counterAttributes:number=0;
    for (let key in mapStateToPropsInstance) counterAttributes++;

    expect(mapStateToPropsInstance.options != undefined).toBeTruthy();
    expect(mapStateToPropsInstance.pageOutOfBounds).toBeFalsy();
    expect(counterAttributes === 2).toBeTruthy();
  });

  it("Angular",()=>{
    const mapStateToPropsInstance:IStoreProps = mapStateToProps(getInitialState('Angular'));
    let counterAttributes:number=0;
    for (let key in mapStateToPropsInstance) counterAttributes++;

    expect(mapStateToPropsInstance.options != undefined).toBeTruthy();
    expect(mapStateToPropsInstance.pageOutOfBounds).toBeFalsy();
    expect(counterAttributes === 2).toBeTruthy();
  });

  it("Vue",()=>{
    const mapStateToPropsInstance:IStoreProps = mapStateToProps(getInitialState('Vue'));
    let counterAttributes:number=0;
    for (let key in mapStateToPropsInstance) counterAttributes++;

    expect(mapStateToPropsInstance.options != undefined).toBeTruthy();
    expect(mapStateToPropsInstance.pageOutOfBounds).toBeFalsy();
    expect(counterAttributes === 2).toBeTruthy();
  });
});