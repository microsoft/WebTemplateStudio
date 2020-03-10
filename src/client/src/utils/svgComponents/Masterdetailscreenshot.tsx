import * as React from "react";
import { ReactComponent as Masterdetailscreenshot } from "../../assets/masterdetailscreenshot.svg";
import classnames from "classnames";

interface IProps {
  style: string;
}

export default (props: IProps) => {
  return (<Masterdetailscreenshot className={classnames(props.style)}/>);
}