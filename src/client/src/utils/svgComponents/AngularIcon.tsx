import * as React from "react";
import { ReactComponent as AngularIcon } from "../../assets/angular.svg";
import classnames from "classnames";

interface IProps {
  style: string;
}

export default (props: IProps) => {
  return (<AngularIcon className={classnames(props.style)}/>);
}