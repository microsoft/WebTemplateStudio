import classnames from "classnames";
import * as React from "react";
import { connect } from "react-redux";

import { ReactComponent as Reorder } from "../../assets/reorder.svg";
import { ReactComponent as AzureFunctionsIcon } from "../../assets/azurefunctions.svg";
import { ReactComponent as CosmosDBIcon } from "../../assets/cosmosdb.svg";
import { ReactComponent as AppServiceIcon } from "../../assets/appservice.svg";

import { ReactComponent as CloseSVG } from "../../assets/cancel.svg";

import { getSvg } from "../../utils/getSvgUrl";

import { ISelected } from "../../types/selected";
import styles from "./styles.module.css";
import { KEY_EVENTS } from "../../utils/constants";

import { injectIntl, InjectedIntl, defineMessages, InjectedIntlProps } from "react-intl";
import { IFunctionName } from "../../containers/AzureFunctionsSelection";

import { AppState } from "../../reducers";

const messages = defineMessages({
  changeItemName: {
    id: "draggableSidebarItem.changeItemName",
    defaultMessage: "Change Item Name"
  },
  pageNameMaxLength: {
    id: "draggableSidebarItem.pageNameMaxLength",
    defaultMessage: "Page name must be under {maxLength} characters long. "
  },
  deleteItem: {
    id: "draggableSidebarItem.deleteItem",
    defaultMessage: "Delete item"
  }
});

/**
 * Takes in either a page (type ISelected) or text, but not both
 * If a page is given, then text prop will not be rendered
 */

interface IStateProps {
  page: ISelected;
  text?: string;
  azureFunctions?: boolean;
  cosmosDB?: boolean;
  appService?: boolean;
  reorderSvgUrl?: string;
  pageSvgUrl?: string;
  closeSvgUrl: string;
  itemTitle?: string;
  handleInputChange?: (e: any, idx: number) => void;
  maxInputLength?: number;
  idx?: number;
  azureFunctionName?: IFunctionName;
  withIndent?: boolean;
  withLargeIndent?: boolean;
  handleCloseClick?: (idx: number) => void;
  intl: InjectedIntl;
  customInputStyle?: string;
  isAzureFunction?: boolean;
  totalCount?: number;
}

interface ISortablePageListProps {
  selectedPages: Array<ISelected>;
}

type Props = IStateProps & ISortablePageListProps & InjectedIntlProps;

const DraggableSidebarItem = ({
  page,
  text,
  azureFunctions,
  cosmosDB,
  appService,
  pageSvgUrl,
  reorderSvgUrl,
  itemTitle,
  handleInputChange,
  maxInputLength,
  idx,
  azureFunctionName,
  withIndent,
  withLargeIndent,
  handleCloseClick,
  intl,
  customInputStyle,
  isAzureFunction,
  totalCount,
  selectedPages
}:Props) => {
  const handleKeyDown = (event: React.KeyboardEvent<SVGSVGElement>) => {
    if (event.key === KEY_EVENTS.ENTER || event.key === KEY_EVENTS.SPACE) {
      handleCloseOnClick();
    }
  };

  const handleCloseOnClick = () => {
    idx && handleCloseClick && handleCloseClick(idx - 1); // correction for idx + 1 to prevent 0th falsey behaviour
  };

 
  const [validValue, setValidValue] =
    React.useState<string>(page ? page.title:"");

  React.useEffect(() => {
    if (page && page.isValidTitle) setValidValue(page.title);
  },[page ? page.title:""]);

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
          {azureFunctions && <AzureFunctionsIcon />}
          {cosmosDB && <CosmosDBIcon />}
          {appService && <AppServiceIcon />}
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
                  maxLength={maxInputLength}
                  value={page ? page.title : azureFunctionName!.title}
                  onChange={e => {
                    if (handleInputChange && idx) {
                      handleInputChange(e.target.value, idx - 1);
                    }
                  }}
                  onBlur={e => {
                    if (handleInputChange && idx && page && page.isValidTitle===false) {
                      handleInputChange(validValue, idx - 1);
                    }
                  }}
                  ref={page.ref}
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
          {page && page.isValidTitle===false && page.error && (
            <div
              className={classnames({
                [styles.errorTextContainer]:
                  true,
                [styles.textContainer]: true,
                [styles.largeIndentContainer]: false
              })}
            >
              {intl.formatMessage(page.error)}
            </div>
          )}

        </div>
        {(totalCount !== undefined ? totalCount > 1 : true) && (
          <CloseSVG
            tabIndex={0}
            onClick={handleCloseOnClick}
            onKeyDown={handleKeyDown}
            className={styles.cancelIcon}
            aria-label={intl.formatMessage(messages.deleteItem)}
          />
        )}
      </div>
    </div>
  );
};

const mapStateToProps = (state: AppState) => ({
  selectedPages: state.selection.pages
});

export default connect(
  mapStateToProps
)(injectIntl(DraggableSidebarItem));
