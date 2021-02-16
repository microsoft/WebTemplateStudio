import * as React from "react";
import { KEY_EVENTS } from "./constants/constants";

const keyUpHandler = (e: React.KeyboardEvent<HTMLAnchorElement>) : void => {
  const anchor = e.target as HTMLAnchorElement;

  //if pressing space on an anchor, prevent page scroll.
  anchor.onkeydown = (e) => {
    if (e.key === KEY_EVENTS.SPACE) e.preventDefault();
  };

  if (e.key === KEY_EVENTS.SPACE) {
    anchor.click();
  }
};

export default keyUpHandler;
