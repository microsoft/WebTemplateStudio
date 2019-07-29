import classnames from "classnames";
import * as React from "react";
import { connect } from "react-redux";
import { arrayMove } from "react-sortable-hoc";

import { defineMessages, injectIntl, InjectedIntl } from "react-intl";

import SortableList from "../../components/SortableSelectionList";

import { selectPagesAction } from "../../actions/wizardSelectionActions/selectPages";

import { ISelected } from "../../types/selected";

import { ReactComponent as ShowIcon } from "../../assets/i-show.svg";
import { ReactComponent as HideIcon } from "../../assets/i-hide.svg";

import { validateName } from "../../utils/validateName";

import styles from "./styles.module.css";
import { AppState } from "../../reducers";
import { Dispatch } from "redux";
import RootAction from "../../actions/ActionType";

import { PAGE_NAME_CHARACTER_LIMIT } from "../../utils/constants"

interface ISortablePageListProps {
  selectedPages: any[];
}

interface IStateProps {
  isSummaryPage?: boolean;
  selectionTitle?: string;
}

interface ISortableDispatchProps {
  selectPages: (pages: ISelected[]) => any;
}

interface IIntlProps {
  intl?: InjectedIntl;
}

type Props = ISortablePageListProps &
  ISortableDispatchProps &
  IStateProps &
  IIntlProps;

const messages = defineMessages({
  duplicateName: {
    id: "sortablePageList.duplicateName",
    defaultMessage: "Page name has to be unique"
  },
  hide: {
    id: "sortablePageList.hide",
    defaultMessage: "Hide"
  },
  show: {
    id: "sortablePageList.show",
    defaultMessage: "Show"
  },
  pages: {
    id: "sortablePageList.pages",
    defaultMessage: "Pages"
  }
});

const SortablePageList = (props: Props) => {
  const { selectedPages, selectPages, isSummaryPage } = props;
  const [pages, setPages] = React.useState(selectedPages);
  const [isMinimized, setMinimized] = React.useState(false);
  React.useEffect(() => {
    setPages(selectedPages);
  }, [selectedPages]);
  const handleInputChange = (newTitle: string, idx: number) => {
    pages[idx].title = newTitle;
    pages[idx].error = "";
    const validationResult = validateName(pages[idx].title, "page");
    if (validationResult.error) {
      pages[idx].error = props.intl!.formatMessage(validationResult.error);
    }
    pages[idx].isValidTitle = validationResult.isValid;
    for (let i = 0; i < pages.length; i++) {
      if (pages[i].title === pages[idx].title && i !== idx) {
        pages[idx].isValidTitle = false;
        pages[idx].error = props.intl!.formatMessage(messages.duplicateName);
        break;
      }
    }
    setPages(pages);
    props.selectPages(pages);
  };
  const onSortEnd = ({
    oldIndex,
    newIndex
  }: {
    oldIndex: number;
    newIndex: number;
  }) => {
    selectPages(arrayMove(pages, oldIndex, newIndex));
  };
  const handleCloseClick = (idx: number) => {
    const pagesWithOmittedIdx: ISelected[] = [...pages];
    pagesWithOmittedIdx.splice(idx, 1);
    selectPages(pagesWithOmittedIdx);
  };
  const hideOrShowText = isMinimized
    ? props.intl!.formatMessage(messages.show)
    : props.intl!.formatMessage(messages.hide);
  const DRAG_PIXEL_THRESHOLD = 1;
  return (
    <div>
      {!isSummaryPage && (
        <div
          className={classnames(styles.pageListContainer, styles.sidebarItem)}
        >
          <div className={styles.dropdownTitle}>
            {`${props.intl!.formatMessage(messages.pages)} (${
              pages.length >= 0 ? pages.length : ""
              })`}
          </div>
          <button
            className={styles.hideOrShow}
            onClick={() => {
              setMinimized(isMinimized ? false : true);
            }}
          >
            {isMinimized ? (
              <ShowIcon className={styles.viewIcon} />
            ) : (
                <HideIcon className={styles.viewIcon} />
              )}
          </button>
        </div>
      )}
      {!isMinimized && (
        <SortableList
          pages={selectedPages}
          isSummaryPage={isSummaryPage}
          maxInputLength={PAGE_NAME_CHARACTER_LIMIT}
          onSortEnd={onSortEnd}
          distance={DRAG_PIXEL_THRESHOLD}
          handleInputChange={handleInputChange}
          handleCloseClick={handleCloseClick}
        />
      )}
      {/* Using a baseline of 1 for idx because !!0 === false */}
    </div>
  );
};

const mapStateToProps = (state: AppState): ISortablePageListProps => ({
  selectedPages: state.selection.pages
});

const mapDispatchToProps = (
  dispatch: Dispatch<RootAction>
): ISortableDispatchProps => ({
  selectPages: (pages: ISelected[]) => {
    dispatch(selectPagesAction(pages));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(injectIntl(SortablePageList));
