import * as React from "react";
import { ReactComponent as VueIcon } from "../../assets/vue.svg";
import classnames from "classnames";

interface IProps {
  style: string;
}

export default (props: IProps) => {
  return (<VueIcon className={classnames(props.style)}/>);
}