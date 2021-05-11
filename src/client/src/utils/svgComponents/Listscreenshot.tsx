import classnames from "classnames";
import * as React from "react";

import { ReactComponent as Listscreenshot } from "../../assets/listscreenshot.svg";

interface IProps {
  style: string;
}

export default (props: IProps): JSX.Element => {
  return <Listscreenshot className={classnames(props.style)} />;
};
