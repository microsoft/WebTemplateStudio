import classnames from "classnames";
import * as React from "react";
import { connect } from "react-redux";
import Loadable from "react-loadable";

import { ReactComponent as CloseSVG } from "../../assets/cancel.svg";

import { getSvg } from "../../utils/getSvgUrl";

import { ISelected } from "../../types/selected";
import styles from "./styles.module.css";
import { KEY_EVENTS } from "../../utils/constants";

import { injectIntl, InjectedIntl, InjectedIntlProps } from "react-intl";
import { IFunctionName } from "../../containers/AzureFunctionsSelection";

import { AppState } from "../../reducers";

import messages from "./messages";
import { ThunkDispatch } from "redux-thunk";
import RootAction from "../../actions/ActionType";
import { selectPageAction } from "../../actions/wizardSelectionActions/selectPages";
import { validateItemName } from "../../utils/validations/itemName/itemName";
import { getValidations } from "../../selectors/wizardSelectionSelector/wizardSelectionSelector";
import { IValidations } from "../../reducers/wizardSelectionReducers/setValidations";

const CosmosDBIcon = Loadable({
  loader: () => import(/* webpackChunkName: "CosmosdbIcon" */  "../../utils/svgComponents/CosmosdbIcon"),
  loading:() => <div/>
});
const AppServiceIcon = Loadable({
  loader: () => import(/* webpackChunkName: "AppServiceIcon" */  "../../utils/svgComponents/AppserviceIcon"),
  loading:() => <div/>
});
const Reorder = Loadable({
  loader: () => import(/* webpackChunkName: "ReorderIcon" */  "../../utils/svgComponents/ReorderIcon"),
  loading:() => <div/>
});
/**
 * Takes in either a page (type ISelected) or text, but not both
 * If a page is given, then text prop will not be rendered
 */

interface IStateProps {
  page: ISelected;
  text?: string;
  cosmosDB?: boolean;
  appService?: boolean;
  reorderSvgUrl?: string;
  pageSvgUrl?: string;
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
  validations: IValidations;
}

interface ISortableDispatchProps {
  updatePage: (page: ISelected) => any;
}

type Props = IStateProps & ISortablePageListProps & InjectedIntlProps & ISortableDispatchProps;

const DraggableSidebarItem = ({
  page,
  text,
  cosmosDB,
  appService,
  pageSvgUrl,
  reorderSvgUrl,
  itemTitle,
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
  updatePage,
  validations,
  selectedPages
}: Props) => {
  const handleKeyDown = (event: React.KeyboardEvent<SVGSVGElement>) => {
    if (event.key === KEY_EVENTS.ENTER || event.key === KEY_EVENTS.SPACE) {
      handleCloseOnClick();
    }
  };

  const handleCloseOnClick = () => {
    idx && handleCloseClick && handleCloseClick(idx - 1); // correction for idx + 1 to prevent 0th falsey behaviour
  };

  const [validValue, setValidValue] = React.useState<string>(page ? page.title:"");
  const inputRef = React.createRef<HTMLInputElement>();
  /*const setFocus = () =>{
      const node = inputRef.current!
      node.focus();
  }
  const setSelect = () =>{
    const node = inputRef.current!
    node.select();
  }*/

  const handleInputChange = async (newTitle: string, idx: number, isDirty: boolean) => {
    page.title = newTitle;
    const validationResult = await validateItemName(newTitle, validations.itemNameValidationConfig, selectedPages);
    page.error = validationResult.error;
    page.isValidTitle = validationResult.isValid;
    page.isDirty=isDirty
    updatePage(page);
  };

  return (
    <div>
      <div className={styles.draggablePage}>
        <div className={styles.iconContainer}>
          {!(withIndent || withLargeIndent) && (
            <Reorder style={styles.reorderIcon} />
          )}
          {cosmosDB && <CosmosDBIcon style={styles.reorderIcon}/>}
          {appService && <AppServiceIcon style={styles.reorderIcon}/>}
        </div>
        <div className={styles.errorStack}>
          <div
            className={classnames(customInputStyle, {
              [styles.pagesTextContainer]: !withIndent,
              [styles.textContainer]: !withIndent,
              [styles.largeIndentContainer]: withLargeIndent
            })}
          >
            <div className={styles.inputContainer}>
              {page && idx ? (
                <input
                  aria-label={intl.formatMessage(messages.changeItemName)}
                  className={classnames(styles.input, {
                    [styles.azureFunctionNameInput]: isAzureFunction
                  })}
                  maxLength={maxInputLength}
                  value={page ? page.title : azureFunctionName!.title}
                  onChange={e => {
                    if (handleInputChange && idx) {
                      handleInputChange(e.target.value, idx - 1, true);
                    }
                  }}
                  onBlur={e => {
                    if (handleInputChange && idx && page && page.isValidTitle===false) {
                      handleInputChange(validValue, idx - 1, false);
                    }else{
                      handleInputChange(e.target.value, idx - 1, false);
                    }
                    if (page.isValidTitle) setValidValue(page.title);
                  }}
                  autoFocus={page.isDirty}
                  disabled={selectedPages.filter(selPage => selPage.title!==page.title && selPage.isValidTitle===false).length>0}
                  ref={inputRef}
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
  selectedPages: state.selection.pages,
  validations: getValidations(state)
});

const mapDispatchToProps = (
  dispatch: ThunkDispatch<AppState, void, RootAction>
): ISortableDispatchProps => ({
  updatePage: (page: ISelected) => {
    dispatch(selectPageAction(page));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(injectIntl(DraggableSidebarItem));
