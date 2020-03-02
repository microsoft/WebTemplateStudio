import * as React from "react";
import { ReactComponent as BlankPage } from "../../assets/blankpage.svg";
import svgStyles from "../svgStyles.module.css";
import classnames from "classnames";

interface IProps {
  style: string;
}

export default (props: IProps) => {
  return (<BlankPage className={classnames(props.style, svgStyles.icon)}/>);
}