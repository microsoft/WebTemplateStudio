import * as React from "react";
import { SortableContainer, SortableElement } from "react-sortable-hoc";
import DraggableSidebarItem from "../DraggableSidebarItem";
import styles from "./styles.module.css";
import { ISelected } from "../../types/selected";

const SortableSidebarItem = SortableElement(
  ({
    page,
    idx,
    handleCloseClick,
    totalPageCount,
    maxInputLength
  }: {
    page: any;
    idx: number;
    maxInputLength?: number;
    handleCloseClick?: (idx: number) => void;
    totalPageCount: number;
  }) => {
    return (
      <DraggableSidebarItem
        page={page}
        handleCloseClick={handleCloseClick}
        maxInputLength={maxInputLength}
        idx={idx + 1}
        totalCount={totalPageCount}
      />
    );
  }
);

/**
 * A component that produces sortable pages to be displayed on the sidebar or in the summary page.
 */
const SortableList = SortableContainer(
  ({
    pages,
    handleCloseClick,
    maxInputLength
  }: {
    pages: ISelected[];
    maxInputLength?: number;
    handleCloseClick?: (idx: number) => void;
  }) => {
    const totalPageCount = pages.length;
    return (
      <div className={styles.sidebarItem}>
        {pages.map((page: ISelected, idx: number) => {
          return (
            <SortableSidebarItem
              index={idx}
              idx={idx}
              page={page}
              maxInputLength={maxInputLength}
              handleCloseClick={handleCloseClick}
              totalPageCount={totalPageCount}
            />
          );
        })
        }
      </div>
    );
  }
);

export default SortableList;
