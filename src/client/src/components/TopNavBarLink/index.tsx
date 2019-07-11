import classnames from "classnames";
import * as React from "react";
import { Link } from "react-router-dom";

import styles from "./styles.module.css";

const TopNavBarLink = ({
  pageNumber,
  text,
  visitedCheck,
  path,
  disabled,
  isSelected
}: {
  pageNumber: number;
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
  const linkTabIndex = disabled ? -1 : 0;
  return (
    <Link
      tabIndex={linkTabIndex}
      to={path}
      onClick={handleClick}
      className={styles.container}
    >
      <div
        aria-label="heyyy"
        className={classnames(styles.text, {
          [styles.textSelected]: isSelected
        })}
      >
        <div
          className={classnames(styles.pageNumber, {
            [styles.pageIsSelected]: isSelected,
            [styles.pageIsVisited]: visitedCheck
          })}
        >
          {pageNumber}
        </div>
        <div
          className={classnames({
            [styles.pageIsSelectedSmall]: isSelected,
            [styles.pageText]: !isSelected
          })}
        >
          {text}
        </div>
      </div>
    </Link>
  );
};

export default TopNavBarLink;
