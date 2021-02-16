import * as React from "react";
import { ReactComponent as Blankscreenshot } from "../../assets/blankscreenshot.svg";
import classnames from "classnames";

interface IProps {
  style: string;
}

export default (props: IProps) : JSX.Element => {
  return <Blankscreenshot className={classnames(props.style)} />;
};
