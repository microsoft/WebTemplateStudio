import * as React from "react";
import { Link } from "react-router-dom";

import Check from "../../assets/check.svg";

import styles from "./styles.module.css";

const LeftSidebarLink = ({
  text,
  showCheck,
  path,
  disabled
}: {
  text: string;
  showCheck: boolean;
  path: string;
  disabled: boolean;
}) => {
  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    if (disabled) {
      e.preventDefault();
    }
  }
  return (
    <Link to={path} onClick={handleClick} className={styles.container}>
      {showCheck ? (
        <img
          src={process.env.REACT_APP_RELATIVE_PATH + Check}
          className={styles.icon}
        />
      ) : (
        <div className={styles.spacer} />
      )}
      <div className={styles.text}>{text}</div>
    </Link>
  );
};

export default LeftSidebarLink;
