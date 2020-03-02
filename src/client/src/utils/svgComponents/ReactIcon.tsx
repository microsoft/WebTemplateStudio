import * as React from "react";
import { ReactComponent as ReactIcon } from "../../assets/react.svg";
import classnames from "classnames";

interface IProps {
  style: string;
}

export default (props: IProps) => {
  return (<ReactIcon className={classnames(props.style)}/>);
}