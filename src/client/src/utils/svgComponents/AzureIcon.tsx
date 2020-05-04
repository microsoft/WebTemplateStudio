import * as React from "react";
import { ReactComponent as AzureIcon } from "../../assets/azure.svg";
import classnames from "classnames";

interface IProps {
  style: string;
}

export default (props: IProps) => {
  return (<AzureIcon className={classnames(props.style)}/>);
}