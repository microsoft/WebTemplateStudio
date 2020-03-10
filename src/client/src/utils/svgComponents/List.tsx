import * as React from "react";
import { ReactComponent as List } from "../../assets/list.svg";
import svgStyles from "../svgStyles.module.css";
import classnames from "classnames";

interface IProps {
  style: string;
}

export default (props: IProps) => {
  return (<List className={classnames(props.style, svgStyles.icon)}/>);
}