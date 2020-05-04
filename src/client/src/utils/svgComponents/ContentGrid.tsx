import * as React from "react";
import { ReactComponent as ContentGrid } from "../../assets/contentgrid.svg";
import svgStyles from "../svgStyles.module.css";
import classnames from "classnames";

interface IProps {
  style: string;
}

export default (props: IProps) => {
  return (<ContentGrid className={classnames(props.style, svgStyles.icon)}/>);
}