import * as React from "react";
import { ReactComponent as Listscreenshot } from "../../assets/listscreenshot.svg";
import classnames from "classnames";

interface IProps {
  style: string;
}

export default (props: IProps): JSX.Element => {
  return <Listscreenshot className={classnames(props.style)} />;
};
