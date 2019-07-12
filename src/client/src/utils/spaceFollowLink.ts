import * as React from "react";

const spaceKeyHandler = (e: React.KeyboardEvent) => {
  if (e.key === " ") {
    const x = new MouseEvent('click', {
      view: window,
      bubbles: true
    });
    e.target.dispatchEvent(x);
  }
}

export default spaceKeyHandler;