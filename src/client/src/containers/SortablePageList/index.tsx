import * as React from "react";
import { connect } from "react-redux";
import { arrayMove } from "react-sortable-hoc";

import SortableList from "../SortableSelectionList";

import { selectPagesAction } from "../../actions/selectPages";

import { ISelected } from "../../types/selected";

import { PAGE_NAME_ERROR_MESSAGES } from "../../utils/constants";
import { validateName } from "../../utils/validateName";

import styles from "./styles.module.css";

interface ISortablePageListProps {
  pages: any[];
}

interface ISortableDispatchProps {
  selectPages: (pages: ISelected[]) => any;
}

type Props = ISortablePageListProps & ISortableDispatchProps;

const SortablePageList = (props: Props) => {
  const [pages, setPages] = React.useState(props.pages);
  const [isMinimized, setMinimized] = React.useState(false);
  React.useEffect(() => {
    setPages(props.pages);
  }, [props.pages]);
  const handleInputChange = (newTitle: string, idx: number) => {
    pages[idx].title = newTitle;

    console.log(pages[idx].title);
    try {
      pages[idx].isValidTitle = validateName(pages[idx].title);
      for (let i = 0; i < pages.length; i++) {
        if (pages[i].title === pages[idx].title && i !== idx) {
          pages[idx].isValidTitle = false;
          pages[idx].error = PAGE_NAME_ERROR_MESSAGES.DUPLICATE_NAME;
          break;
        }
      }
    } catch (error) {
      pages[idx].isValidTitle = false;
      pages[idx].error = error.message;
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
    props.selectPages(arrayMove(pages, oldIndex, newIndex));
  };
  const handleCloseClick = (idx: number) => {
    const pagesWithOmittedIdx: ISelected[] = [...pages];
    pagesWithOmittedIdx.splice(idx, 1);
    props.selectPages(pagesWithOmittedIdx);
  };
  const hideOrShowText = isMinimized ? "Show" : "Hide";
  const DRAG_PIXEL_THRESHOLD = 1;
  return (
    <div className={styles.sidebarItem}>
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
      {!isMinimized && (
        <SortableList
          pages={props.pages}
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
  pages: state.selection.pages
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
