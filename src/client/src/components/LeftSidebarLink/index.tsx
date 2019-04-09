import * as React from "react";
import { Link } from "react-router-dom";

import Check from "../../assets/check.svg";

import styles from "./styles.module.css";
import { withLocalPath } from "../../utils/getSvgUrl";

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
  };
  return (
    <Link to={path} onClick={handleClick} className={styles.container}>
      {showCheck ? (
        <img
          src={withLocalPath(Check)}
          className={styles.icon}
          alt="Link to a different page in the wizard"
        />
      ) : (
        <div className={styles.spacer} />
      )}
      <div className={styles.text}>{text}</div>
    </Link>
  );
};

export default LeftSidebarLink;
