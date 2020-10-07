import React, { useEffect, useState, createRef } from "react";
import { connect, useDispatch } from "react-redux";
import { injectIntl, InjectedIntl, InjectedIntlProps } from "react-intl";

import { getValidations } from "../../../../../store/userSelection/app/wizardSelectionSelector/wizardSelectionSelector";
import { setPageAction, setPagesAction } from "../../../../../store/userSelection/pages/action";
import { IValidations } from "../../../../../store/config/validations/model";
import { AppState } from "../../../../../store/combineReducers";

import { ISelected } from "../../../../../types/selected";
import { KEY_EVENTS } from "../../../../../utils/constants/constants";
import { validateItemName } from "../../../../../utils/validations/itemName/itemName";

import messages from "./messages";
import classnames from "classnames";
import styles from "./styles.module.css";

import { ReactComponent as ReorderIcon } from "../../../../../assets/reorder.svg";
import { ReactComponent as CloseSVG } from "../../../../../assets/cancel.svg";
import Icon from "../../../../Icon";

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

type Props = IStateProps & ISortablePageListProps & InjectedIntlProps;

const DraggablePage = ({
  page,
  maxInputLength,
  idx,
  totalCount,
  intl,
  validations,
  selectedPages,
  customInputStyle,
}: Props) => {
  const [namePage, setNamePage] = useState("");
  const dispatch = useDispatch();
  const [validValue, setValidValue] = useState<string>(page ? page.title : "");
  const inputRef = createRef<HTMLInputElement>();

  useEffect(() => {
    setNamePage(page.title);
  }, [page]);

  useEffect(() => {
    const hasFocusOnLasPage = selectedPages.length > 1 && !page.isDirty && selectedPages.length === idx;
    if (hasFocusOnLasPage) {
      setFocus();
      moveDownScroll();
      page.isDirty = true;
      setTimeout(() => {
        const node: any = document.getElementsByClassName("focus-visible")![0];
        if (node) node.select();
      }, 200);
    }
  }, [selectedPages]);

  const moveDownScroll = () => {
    if (document.getElementById("dvRightSideBar") && document.getElementById("dvSummaryContainer"))
      document.getElementById("dvRightSideBar")!.scrollTop = document.getElementById(
        "dvSummaryContainer"
      )!.offsetHeight;
  };
  const setFocus = () => {
    const node = inputRef.current!;
    if (node) node.focus();
  };

  const deletePageOnKeyDown = (event: React.KeyboardEvent<SVGSVGElement>) => {
    if (event.key === KEY_EVENTS.ENTER || event.key === KEY_EVENTS.SPACE) {
      deletePage();
    }
  };

  const deletePage = () => {
    const selectedPagesUpdated = selectedPages.splice(0).filter((selPage) => selPage.id !== page.id);
    dispatch(setPagesAction(selectedPagesUpdated));
  };

  const validateNameAndSetStore = async (newTitle: string) => {
    setNamePage(newTitle);
    page.title = newTitle;
    const validationResult = await validateItemName(newTitle, validations.itemNameValidationConfig, selectedPages);
    page.error = validationResult.error;
    page.isValidTitle = validationResult.isValid;
    dispatch(setPageAction(page));
  };

  return (
    <div className={styles.draggablePage}>
      <div className={styles.iconContainer}>
        <ReorderIcon className={styles.reorderIcon} />
      </div>
      <div className={styles.errorStack}>
        <div
          className={classnames(customInputStyle, {
            [styles.pagesTextContainer]: page.editable,
            [styles.textContainer]: true,
            [styles.largeIndentContainer]: false,
          })}
        >
          <div className={styles.inputContainer}>
            <Icon name={namePage} icon={page!.icon} small />

            {page && page.editable && idx && (
              <input
                aria-label={intl.formatMessage(messages.changeItemName)}
                className={classnames(styles.input)}
                maxLength={maxInputLength}
                value={namePage}
                onChange={(e) => {
                  validateNameAndSetStore(e.target.value);
                }}
                onFocus={(e) => {
                  setValidValue(page.title);
                }}
                onBlur={(e) => {
                  if (!page.isValidTitle)
                    setTimeout(() => {
                      validateNameAndSetStore(validValue);
                    }, 200);
                }}
                autoFocus={page.isDirty}
                disabled={
                  selectedPages.filter((selPage) => selPage.title !== page.title && selPage.isValidTitle === false)
                    .length > 0
                }
                ref={inputRef}
              />
            )}
            {page && !page.editable && idx && (
              <div
                className={classnames({
                  [styles.marginLeft10]: true,
                })}
              >
                {page.title}
              </div>
            )}
          </div>
        </div>
        {page && page.isValidTitle === false && page.error && (
          <div
            className={classnames({
              [styles.errorTextContainer]: true,
              [styles.textContainer]: true,
              [styles.largeIndentContainer]: false,
            })}
          >
            {intl.formatMessage(page.error)}
          </div>
        )}
      </div>
      {(totalCount !== undefined ? totalCount > 1 : true) && (
        <CloseSVG
          tabIndex={0}
          onClick={deletePage}
          onKeyDown={deletePageOnKeyDown}
          className={styles.cancelIcon}
          aria-label={intl.formatMessage(messages.deleteItem)}
        />
      )}
    </div>
  );
};

const mapStateToProps = (state: AppState) => ({
  selectedPages: state.userSelection.pages,
  validations: getValidations(state),
});

export default connect(mapStateToProps)(injectIntl(DraggablePage));
