import classnames from "classnames";
import * as React from "react";
import { connect, useDispatch } from "react-redux";
import loadable from '@loadable/component'
import { ReactComponent as CloseSVG } from "../../../../../assets/cancel.svg";
import { getSvg } from "../../../../../utils/getSvgUrl";
import { ISelected } from "../../../../../types/selected";
import styles from "./styles.module.css";
import { KEY_EVENTS } from "../../../../../utils/constants/constants";
import { injectIntl, InjectedIntl, InjectedIntlProps } from "react-intl";
import { AppState } from "../../../../../store/combineReducers";

import messages from "./messages";
import { validateItemName } from "../../../../../utils/validations/itemName/itemName";
import { getValidations } from "../../../../../store/userSelection/app/wizardSelectionSelector/wizardSelectionSelector";
import { setPageAction, setPagesAction } from "../../../../../store/userSelection/pages/action";
import { IValidations } from "../../../../../store/config/validations/model";

const Reorder = loadable(() => import(/* webpackChunkName: "ReorderIcon" */  "../../../../../utils/svgComponents/ReorderIcon"));

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
  customInputStyle
}: Props) => {
  const [namePage, setNamePage] = React.useState("");
  const dispatch = useDispatch();
  const [validValue, setValidValue] = React.useState<string>(page ? page.title:"");
  const inputRef = React.createRef<HTMLInputElement>();

  React.useEffect(()=>{
    setNamePage(page.title)
  },[page]);

  React.useEffect(()=>{
    const hasFocusOnLasPage = selectedPages.length>1 && !page.isDirty && selectedPages.length === idx;
    if (hasFocusOnLasPage){
      setFocus();
      moveDownScroll();
      page.isDirty = true;
      setTimeout(()=>{
        const node: any = document.getElementsByClassName("focus-visible")![0];
        node.select();
      },200);
    }
  },[selectedPages]);

  const moveDownScroll = () =>{
     if (document.getElementById("dvRightSideBar") && document.getElementById("dvSummaryContainer")) 
      document.getElementById("dvRightSideBar")!.scrollTop= document.getElementById("dvSummaryContainer")!.offsetHeight;
  }
  const setFocus = () =>{
    const node = inputRef.current!
    node.focus();
  }

  const deletePageOnKeyDown = (event: React.KeyboardEvent<SVGSVGElement>) => {
    if (event.key === KEY_EVENTS.ENTER || event.key === KEY_EVENTS.SPACE) {
      deletePage();
    }
  };

  const deletePage = () => {
    const selectedPagesUpdated = selectedPages.splice(0).filter(selPage => selPage.id !== page.id);
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
                  value={namePage}
                  onChange={e => {
                    const isDirty = namePage !== e.target.value;
                    if (isDirty){
                      if (validateNameAndSetStore && idx) {
                        page.isDirty=true;
                        validateNameAndSetStore(e.target.value);
                      }
                    }
                  }}
                  onBlur={e => {
                    const isDirty = namePage !== e.target.value;
                    if (isDirty){
                      if (validateNameAndSetStore && idx && page && page.isValidTitle===false) {
                        validateNameAndSetStore(validValue);
                      }else{
                        validateNameAndSetStore(e.target.value);
                      }
                      if (page.isValidTitle) setValidValue(page.title);
                    }
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
            onClick={deletePage}
            onKeyDown={deletePageOnKeyDown}
            className={styles.cancelIcon}
            aria-label={intl.formatMessage(messages.deleteItem)}
          />
        )}
      </div>
    </div>
  );
};

const mapStateToProps = (state: AppState) => ({
  selectedPages: state.userSelection.pages,
  validations: getValidations(state)
});

export default connect(mapStateToProps)(injectIntl(DraggablePage));