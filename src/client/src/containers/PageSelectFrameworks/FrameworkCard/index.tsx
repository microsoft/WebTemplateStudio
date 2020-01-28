import classNames from "classnames";
import * as React from "react";
import { connect } from "react-redux";

import { ISelectProps, IDispatchProps, IStateProps } from "./interfaces";
import {mapDispatchToProps, mapStateToProps} from "./store";
import { ISelected } from "../../../types/selected";
import { setBackendFrameworks } from "../../../actions/wizardContentActions/getBackendFrameworks";
import styles from "./styles.module.css";
import { getSvg } from "../../../utils/getSvgUrl";

type Props = ISelectProps & IDispatchProps & IStateProps;

const FrameworkCard = (props:Props) => {
  const { framework, setFrontendSelect, frontEndSelect,
    setBackendSelect, backEndSelect, isFrontEnd } = props;

  const [selected, setSelected] = React.useState(false);
  const [isShown, setIsShown] = React.useState(false);

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

  const keyDownHandler = () =>{
  };

  return (
    <div
    role="button"
    tabIndex={0}
    onClick={selectCard}
    onKeyDown={keyDownHandler}
    className={classNames(styles.container, styles.boundingBox, {
      [styles.selected]: selected
    })}
    onMouseEnter={() => setIsShown(true)}
    onMouseLeave={() => setIsShown(false)}>
    <div>
      <div className={styles.gridLayoutCardHeader}>
        <div>
          {getSvg(framework.internalName, styles.icon) ||
            (framework.svgUrl && (
              <img src={framework.svgUrl} alt="" />
            ))}
        </div>
        <div
          className={classNames({
            [styles.title]: framework.svgUrl,
            [styles.titleLeftJustified]: framework.svgUrl === undefined ? true : false
          })}
        >
        </div>
      </div>
    </div>
  </div>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(FrameworkCard);