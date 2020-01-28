import * as React from "react";
import { connect } from "react-redux";

import { ISelectProps, IDispatchProps, IStateProps } from "./interfaces";
import {mapDispatchToProps, mapStateToProps} from "./store";
import { ISelected } from "../../../types/selected";
import { setBackendFrameworks } from "../../../actions/wizardContentActions/getBackendFrameworks";

type Props = ISelectProps & IDispatchProps & IStateProps;

const FrameworkCard = (props:Props) => {
  const { framework, setFrontendSelect, frontEndSelect,
    setBackendSelect, backEndSelect, isFrontEnd } = props;

  const [ selected, setSelected ] = React.useState(false);
  React.useEffect(()=>{
    getLatestVersion();
  },[]);

  React.useEffect(()=>{
    if (isFrontEnd) setSelected(frontEndSelect.internalName === framework.internalName);
  },[frontEndSelect]);

  React.useEffect(()=>{
    if (!isFrontEnd) setSelected(backEndSelect.internalName === framework.internalName);
  },[backEndSelect]);

  const getLatestVersion = () =>{

  }

  const selectCard = ()=>{
    const { title, internalName, licenses, author, version } = framework;
    const shorthandVersionLabel = `v${version || "1.0"}`;
    const selectedFramework = {
      internalName,
      title: title as string,
      version: shorthandVersionLabel,
      licenses,
      author
    };
    if (isFrontEnd){
      setFrontendSelect(selectedFramework);
    }else{
      setBackendSelect(selectedFramework);
    }
  }

  return (
    <div>
      card component!!
      <p>{selected && (<p>selected ole ryryryryryrry</p>)}</p>
      <p onClick={selectCard}>select</p>
    </div>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(FrameworkCard);