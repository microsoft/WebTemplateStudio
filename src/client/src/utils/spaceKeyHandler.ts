import * as React from "react";
import {KEY_EVENTS} from "./constants"

const spaceKeyHandler = (e: React.KeyboardEvent<HTMLAnchorElement>) => {
  console.log(e.type);
  let anchor = e.target as HTMLAnchorElement;
  if (e.key === KEY_EVENTS.SPACE) {
    anchor.click();
    // const x = new MouseEvent('click', {
    //   view: window,
    //   bubbles: true
    // });
    // e.target.dispatchEvent(x);
  }
}

export default spaceKeyHandler;