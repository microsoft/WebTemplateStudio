import * as React from "react";
import { connect } from "react-redux";
import { arrayMove } from "react-sortable-hoc";

import SortableList from "../SortableSelectionList";

import { selectPagesAction } from "../../actions/selectPages";

import { ISelected } from "../../types/selected";

import { PAGE_NAME_ERROR_MESSAGES } from "../../utils/constants";
import { validateName } from "../../utils/validateName";

import styles from "./styles.module.css";

const MAX_PAGE_NAME_LENGTH = 50;

interface ISortablePageListProps {
  selectedPages: any[];
}

interface IStateProps {
  pagesRows?: any[];
  selectionTitle?: string;
}

interface ISortableDispatchProps {
  selectPages: (pages: ISelected[]) => any;
}

type Props = ISortablePageListProps & ISortableDispatchProps & IStateProps;

const SortablePageList = (props: Props) => {
  const { selectedPages, selectPages, pagesRows } = props;
  const [pages, setPages] = React.useState(selectedPages);
  const [isMinimized, setMinimized] = React.useState(false);
  React.useEffect(() => {
    setPages(selectedPages);
  }, [selectedPages]);
  const handleInputChange = (newTitle: string, idx: number) => {
    pages[idx].title = newTitle;
    const validationResult = validateName(pages[idx].title);
    pages[idx].error = validationResult.error;
    pages[idx].isValidTitle = validationResult.isValid;
    for (let i = 0; i < pages.length; i++) {
      if (pages[i].title === pages[idx].title && i !== idx) {
        pages[idx].isValidTitle = false;
        pages[idx].error = PAGE_NAME_ERROR_MESSAGES.DUPLICATE_NAME;
        break;
      }
    }
    if (pages[idx].title.length < MAX_PAGE_NAME_LENGTH) {
      setPages(pages);
      props.selectPages(pages);
    }
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
  const hideOrShowText = isMinimized ? "Show" : "Hide";
  const DRAG_PIXEL_THRESHOLD = 1;
  return (
    <div className={styles.sidebarItem}>
      {!pagesRows && (
        <div className={styles.pageListContainer}>
          <div className={styles.dropdownTitle}>Pages</div>
          <div
            className={styles.hideOrShow}
            onClick={() => {
              setMinimized(isMinimized ? false : true);
            }}
          >
            {hideOrShowText}
          </div>
        </div>
      )}
      {!isMinimized && (
        <SortableList
          pages={selectedPages}
          pagesRows={pagesRows}
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

const mapStateToProps = (state: any): ISortablePageListProps => ({
  selectedPages: state.selection.pages
});

const mapDispatchToProps = (dispatch: any): ISortableDispatchProps => ({
  selectPages: (pages: ISelected[]) => {
    dispatch(selectPagesAction(pages));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SortablePageList);
