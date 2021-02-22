import classnames from "classnames";
import * as React from "react";

import { ReactComponent as Blankscreenshot } from "../../assets/blankscreenshot.svg";

interface IProps {
  style: string;
}

export default (props: IProps): JSX.Element => {
  return <Blankscreenshot className={classnames(props.style)} />;
};
