import * as React from "react";
import { ReactComponent as AppserviceIcon } from "../../assets/appservice.svg";
import classnames from "classnames";

interface IProps {
  style: string;
}

export default (props: IProps) => {
  return (<AppserviceIcon className={classnames(props.style)}/>);
}