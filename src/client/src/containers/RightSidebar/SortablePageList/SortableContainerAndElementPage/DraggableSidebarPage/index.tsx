import classnames from "classnames";
import * as React from "react";
import { connect } from "react-redux";
import Loadable from "react-loadable";

import { ReactComponent as CloseSVG } from "../../../../../assets/cancel.svg";

import { getSvg } from "../../../../../utils/getSvgUrl";

import { ISelected } from "../../../../../types/selected";
import styles from "./styles.module.css";
import { KEY_EVENTS } from "../../../../../utils/constants";

import { injectIntl, InjectedIntl, InjectedIntlProps } from "react-intl";

import { AppState } from "../../../../../reducers";

import messages from "./messages";
import { ThunkDispatch } from "redux-thunk";
import RootAction from "../../../../../actions/ActionType";
import { selectPageAction, selectPagesAction } from "../../../../../actions/wizardSelectionActions/selectPages";
import { validateItemName } from "../../../../../utils/validations/itemName/itemName";
import { getValidations } from "../../../../../selectors/wizardSelectionSelector/wizardSelectionSelector";
import { IValidations } from "../../../../../reducers/wizardSelectionReducers/setValidations";

const Reorder = Loadable({
  loader: () => import(/* webpackChunkName: "ReorderIcon" */  "../../../../../utils/svgComponents/ReorderIcon"),
  loading:() => <div/>
});
/**
 * Takes in either a page (type ISelected) or text, but not both
 * If a page is given, then text prop will not be rendered
 */

interface IStateProps {
  page: ISelected;
  maxInputLength?: number;
  idx?: number;
  totalCount?: number;
  intl: InjectedIntl;
  customInputStyle?: string;
}

interface ISortablePageListProps {
  selectedPages: Array<ISelected>;
  validations: IValidations;
}

interface ISortableDispatchProps {
  updatePage: (page: ISelected) => any;
  selectPages: (pages: ISelected[]) => any;
}

type Props = IStateProps & ISortablePageListProps & InjectedIntlProps & ISortableDispatchProps;

const DraggableSidebarItem = ({
  page,
  maxInputLength,
  idx,
  totalCount,
  intl,
  validations,
  selectedPages,
  updatePage,
  customInputStyle,
  selectPages
}: Props) => {
  const handleKeyDown = (event: React.KeyboardEvent<SVGSVGElement>) => {
    if (event.key === KEY_EVENTS.ENTER || event.key === KEY_EVENTS.SPACE) {
      handleCloseOnClick();
    }
  };

  const handleCloseClick = (idx: number) => {
    const pagesWithOmittedIdx: ISelected[] = [...selectedPages];
    pagesWithOmittedIdx.splice(idx, 1);
    selectPages(pagesWithOmittedIdx);
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
          <Reorder style={styles.reorderIcon} />
        </div>
        <div className={styles.errorStack}>
          <div
            className={classnames(customInputStyle, {
              [styles.pagesTextContainer]: true,
              [styles.textContainer]: true,
              [styles.largeIndentContainer]: false
            })}
          >
            <div className={styles.inputContainer}>
              {(getSvg(page!.internalName, styles.icon))}
              {page && idx && (
                <input
                  aria-label={intl.formatMessage(messages.changeItemName)}
                  className={classnames(styles.input)}
                  maxLength={maxInputLength}
                  value={page.title}
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
  },
  selectPages: (pages: ISelected[]) => {
    dispatch(selectPagesAction(pages));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(injectIntl(DraggableSidebarItem));
