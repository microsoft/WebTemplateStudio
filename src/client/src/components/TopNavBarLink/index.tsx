import classnames from "classnames";
import * as React from "react";
import { defineMessages } from "react-intl";
import { injectIntl, FormattedMessage, InjectedIntl } from "react-intl";

import { Link } from "react-router-dom";

import styles from "./styles.module.css";
import keyUpHandler from "../../utils/keyUpHandler";
import { ARIA_LABELS_NAVIGATION } from "../../utils/constants";

const TopNavBarLink = ({
  pageNumber,
  text,
  visitedCheck,
  path,
  disabled,
  isSelected,
  intl
}: {
  pageNumber: number;
  text: string;
  visitedCheck: boolean;
  path: string;
  disabled: boolean;
  isSelected: boolean;
  intl: InjectedIntl;
}) => {
  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    if (disabled) {
      e.preventDefault();
    }
  };

  const getAriaLabel = (
    arialabeltext: FormattedMessage.MessageDescriptor,
    isSelected = false
  ): string => {
    if (isSelected) {
      arialabeltext = ARIA_LABELS_NAVIGATION.ARIA_LABELS_CURRENT_PAGE;
    }
    return intl.formatMessage(arialabeltext, {
      pagesText: intl.formatMessage({
        id: "ariaLabelForLink",
        defaultMessage: text
      })
    });
  };

  const linkTabIndex = disabled ? -1 : 0;
  return (
    <Link
      tabIndex={linkTabIndex}
      to={path}
      onClick={handleClick}
      className={styles.container}
      onKeyUp={keyUpHandler}
      id={"page" + pageNumber}
      aria-label={
        visitedCheck || isSelected
          ? getAriaLabel(
              ARIA_LABELS_NAVIGATION.ARIA_LABELS_MESSAGES,
              isSelected
            )
          : getAriaLabel(ARIA_LABELS_NAVIGATION.ARIA_LABELS_DISABLED_PAGE)
      }
    >
      <div
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

export default injectIntl(TopNavBarLink);
