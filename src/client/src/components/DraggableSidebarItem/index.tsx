import classnames from "classnames";
import * as React from "react";

import { ReactComponent as Reorder } from "../../assets/reorder.svg";
import { ReactComponent as CloseSVG } from "../../assets/cancel.svg";

import { getSvg } from "../../utils/getSvgUrl";

import { ISelected } from "../../types/selected";
import styles from "./styles.module.css";

import { injectIntl, InjectedIntl, defineMessages } from "react-intl";
import { IFunctionName } from "../../containers/AzureFunctionsSelection";

const messages = defineMessages({
  changeItemName: {
    id: "draggableSidebarItem.changeItemName",
    defaultMessage: "Change Item Name"
  }
});

/**
 * Takes in either a page (type ISelected) or text, but not both
 * If a page is given, then text prop will not be rendered
 */
const DraggableSidebarItem = ({
  page,
  text,
  pageSvgUrl,
  reorderSvgUrl,
  itemTitle,
  handleInputChange,
  idx,
  azureFunctionName,
  withIndent,
  withLargeIndent,
  handleCloseClick,
  intl,
  customInputStyle,
  isAzureFunction,
  totalPageCount
}: {
  page?: ISelected;
  text?: string;
  reorderSvgUrl?: string;
  pageSvgUrl?: string;
  closeSvgUrl: string;
  itemTitle?: string;
  handleInputChange?: (e: any, idx: number) => void;
  idx?: number;
  azureFunctionName?: IFunctionName;
  withIndent?: boolean;
  withLargeIndent?: boolean;
  handleCloseClick?: (idx: number) => void;
  intl: InjectedIntl;
  customInputStyle?: string;
  isAzureFunction?: boolean;
  totalPageCount?: number;
}) => {
  const handleKeyDown = (event: any) => {
    if (event.keyCode === 13 || event.keyCode === 32) {
      handleCloseOnClick();
    }
  };
  const handleCloseOnClick = () => {
    idx && handleCloseClick && handleCloseClick(idx - 1); // correction for idx + 1 to prevent 0th falsey behaviour
  };
  return (
    <div>
      {itemTitle && (
        <div className={styles.titleContainer}>
          {withIndent ? (
            <React.Fragment>
              <div className={styles.iconContainer} />
              <div className={styles.itemContainer}>
                <div>{itemTitle}</div>
              </div>
            </React.Fragment>
          ) : (
            itemTitle
          )}
        </div>
      )}
      <div className={styles.draggablePage}>
        <div className={styles.iconContainer}>
          {!(withIndent || withLargeIndent) && (
            <Reorder className={styles.reorderIcon} />
          )}
        </div>
        <div className={styles.errorStack}>
          <div
            className={classnames(customInputStyle, {
              [styles.pagesTextContainer]: withIndent || reorderSvgUrl,
              [styles.textContainer]: !withIndent,
              [styles.largeIndentContainer]: withLargeIndent
            })}
          >
            <div className={styles.inputContainer}>
              {reorderSvgUrl &&
                (getSvg(page!.internalName, styles.icon) || (
                  <img className={styles.icon} src={pageSvgUrl} alt="" />
                ))}
              {handleInputChange && (page || isAzureFunction) && idx ? (
                <input
                  aria-label={intl.formatMessage(messages.changeItemName)}
                  className={classnames(styles.input, {
                    [styles.azureFunctionNameInput]: isAzureFunction
                  })}
                  value={page ? page.title : azureFunctionName!.title}
                  onChange={e => {
                    if (handleInputChange && idx) {
                      handleInputChange(e.target.value, idx - 1);
                    }
                  }}
                />
              ) : (
                <input
                  className={classnames(
                    styles.disabledInput,
                    styles.input,
                    customInputStyle
                  )}
                  value={text}
                  disabled={true}
                />
              )}
            </div>
          </div>
          {((page && !page.isValidTitle) ||
            (azureFunctionName && !azureFunctionName.isValidTitle)) && (
            <div
              className={classnames({
                [styles.errorTextContainer]:
                  withIndent || reorderSvgUrl || true,
                [styles.textContainer]: !withIndent,
                [styles.largeIndentContainer]: withLargeIndent
              })}
            >
              {(page && page.error) ||
                (azureFunctionName && azureFunctionName.error)}
            </div>
          )}
        </div>
        {(totalPageCount !== undefined ? totalPageCount > 1 : true) && 
        <CloseSVG
          tabIndex={0}
          onClick={handleCloseOnClick}
          onKeyDown={handleKeyDown}
          className={styles.cancelIcon}
        />
        }
      </div>
    </div>
  );
};

export default injectIntl(DraggableSidebarItem);
