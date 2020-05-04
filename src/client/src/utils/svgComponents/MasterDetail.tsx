import * as React from "react";
import { ReactComponent as MasterDetail } from "../../assets/masterdetail.svg";
import svgStyles from "../svgStyles.module.css";
import classnames from "classnames";

interface IProps {
  style: string;
}

export default (props: IProps) => {
  return (<MasterDetail className={classnames(props.style, svgStyles.icon)}/>);
}