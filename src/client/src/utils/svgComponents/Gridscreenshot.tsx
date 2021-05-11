import classnames from "classnames";
import * as React from "react";

import { ReactComponent as Gridscreenshot } from "../../assets/gridscreenshot.svg";

interface IProps {
  style: string;
}

export default (props: IProps): JSX.Element => {
  return <Gridscreenshot className={classnames(props.style)} />;
};
