import classnames from "classnames";
import * as React from "react";
import { injectIntl, FormattedMessage, InjectedIntl } from "react-intl";


import styles from "./styles.module.css";
import keyUpHandler from "../../utils/keyUpHandler";
import { ARIA_LABELS_NAVIGATION } from "../../utils/constants/constants";

const TopNavBarLink = ({
  pageNumber,
  text,
  visitedCheck,
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
    <a
      tabIndex={linkTabIndex}
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
        className={classnames(styles.text,styles.textSelected)}
      >
        <div
          className={classnames(styles.pageNumber, {
            [styles.pageIsSelected]: isSelected,
            [styles.pageIsVisited]: visitedCheck,
            [styles.pageCursorPointer]: !disabled
          })}
        >
          {pageNumber}
        </div>
        <div
          className={classnames({
            [styles.pageIsSelectedSmall]: isSelected,
            [styles.pageText]: !isSelected,
            [styles.pageCursorPointer]: !disabled
          })}
        >
          {text}
        </div>
      </div>
    </a>
  );
};

export default injectIntl(TopNavBarLink);
