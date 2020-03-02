import * as React from "react";
import { ReactComponent as NodeIcon } from "../../assets/node.svg";
import classnames from "classnames";

interface IProps {
  style: string;
}

export default (props: IProps) => {
  return (<NodeIcon className={classnames(props.style)}/>);
}