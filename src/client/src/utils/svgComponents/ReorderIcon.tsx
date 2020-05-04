import * as React from "react";
import { ReactComponent as ReorderIcon } from "../../assets/reorder.svg";
import classnames from "classnames";

interface IProps {
  style: string;
}

export default (props: IProps) => {
  return (<ReorderIcon className={classnames(props.style)}/>);
}