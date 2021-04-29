import classnames from "classnames";
import * as React from "react";

import { ReactComponent as Masterdetailscreenshot } from "../../assets/masterdetailscreenshot.svg";

interface IProps {
  style: string;
}

export default (props: IProps): JSX.Element => {
  return <Masterdetailscreenshot className={classnames(props.style)} />;
};
