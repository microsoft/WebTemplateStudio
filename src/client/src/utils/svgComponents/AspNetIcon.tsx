import * as React from "react";
import { ReactComponent as AspNetIcon } from "../../assets/aspNet.svg";
import classnames from "classnames";

interface IProps {
  style: string;
}

export default (props: IProps) => {
  return (<AspNetIcon className={classnames(props.style)}/>);
}