import * as React from "react";
import { ReactComponent as FullStack } from "../../assets/fullstack.svg";
import svgStyles from "../svgStyles.module.css";
import classnames from "classnames";

interface IProps {
  style: string;
}

export default (props: IProps) => {
  return (<FullStack className={classnames(props.style, svgStyles.icon)}/>);
}