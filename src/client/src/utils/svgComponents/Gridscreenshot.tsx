import * as React from "react";
import { ReactComponent as Gridscreenshot } from "../../assets/gridscreenshot.svg";
import classnames from "classnames";

interface IProps {
  style: string;
}

export default (props: IProps) => {
  return (<Gridscreenshot className={classnames(props.style)}/>);
}