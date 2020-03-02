import * as React from "react";
import { ReactComponent as CosmosdbIcon } from "../../assets/cosmosdb.svg";
import classnames from "classnames";

interface IProps {
  style: string;
}

export default (props: IProps) => {
  return (<CosmosdbIcon className={classnames(props.style)}/>);
}