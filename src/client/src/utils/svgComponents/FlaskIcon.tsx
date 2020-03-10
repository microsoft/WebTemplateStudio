import * as React from "react";
import { ReactComponent as FlaskIcon } from "../../assets/flask.svg";
import classnames from "classnames";

interface IProps {
  style: string;
}

export default (props: IProps) => {
  return (<FlaskIcon className={classnames(props.style)}/>);
}