import classnames from "classnames";
import * as React from "react";
import { Link } from "react-router-dom";

// import Check from "../../assets/check.svg";
import { ReactComponent as Check } from "../../assets/check.svg";

import styles from "./styles.module.css";

const LeftSidebarLink = ({
  text,
  visitedCheck,
  path,
  disabled,
  isSelected
}: {
  text: string;
  visitedCheck: boolean;
  path: string;
  disabled: boolean;
  isSelected: boolean;
}) => {
  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    if (disabled) {
      e.preventDefault();
    }
  };
  return (
    <Link
      tabIndex={disabled ? -1 : 0}
      to={path}
      onClick={handleClick}
      className={styles.container}
    >
      {visitedCheck || isSelected ? (
        <Check
          className={classnames(styles.icon, {
            [styles.visitedIcon]: visitedCheck,
            [styles.selected]: isSelected
          })}
        />
      ) : (
        <div className={styles.spacer} />
      )}
      <div
        className={classnames(styles.text, {
          [styles.textSelected]: isSelected
        })}
      >
        {text}
      </div>
    </Link>
  );
};

export default LeftSidebarLink;
