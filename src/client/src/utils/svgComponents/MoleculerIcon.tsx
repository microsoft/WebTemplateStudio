import * as React from "react";
import { ReactComponent as MoleculerIcon } from "../../assets/moleculer.svg";
import classnames from "classnames";

interface IProps {
  style: string;
}

export default (props: IProps) => {
  return (<MoleculerIcon className={classnames(props.style)}/>);
}