import * as React from "react";
import { SortableContainer, SortableElement } from "react-sortable-hoc";

import DraggableSidebarItem from "../DraggableSidebarItem";

import styles from "./styles.module.css";

import cancel from "../../assets/cancel.svg";
import reorder from "../../assets/reorder.svg";
import getSvgUrl, { withLocalPath } from "../../utils/getSvgUrl";
import { ISelected } from "../../types/selected";

const SortableSidebarItem = SortableElement(
  ({
    page,
    idx,
    handleInputChange,
    handleCloseClick,
    totalPageCount,
    maxInputLength
  }: {
    page: any;
    idx: number;
    handleInputChange: any;
    maxInputLength?: number;
    handleCloseClick?: (idx: number) => void;
    totalPageCount: number;
  }) => {
    return (
      <DraggableSidebarItem
        page={page}
        closeSvgUrl={withLocalPath(cancel)}
        pageSvgUrl={getSvgUrl(page.internalName)}
        reorderSvgUrl={withLocalPath(reorder)}
        handleInputChange={handleInputChange}
        handleCloseClick={handleCloseClick}
        maxInputLength={maxInputLength}
        idx={idx + 1}
        totalCount={totalPageCount}
      />
    );
    // use idx+1 to prevent falsiness of 0th value
  }
);

/**
 * A component that produces sortable pages to be displayed on the sidebar or in the summary page.
 */
const SortableList = SortableContainer(
  ({
    pages,
    handleInputChange,
    handleCloseClick,
    maxInputLength
  }: {
    pages: ISelected[];
    handleInputChange: any;
    maxInputLength?: number;
    handleCloseClick?: (idx: number) => void;
  }) => {
    const totalPageCount = pages.length;
    return (
      <div className={styles.sidebarItem}>
        {pages.map((page: ISelected, idx: number) => {
          return (
            <SortableSidebarItem
              key={page.id}
              index={idx}
              idx={idx}
              page={page}
              handleInputChange={handleInputChange}
              maxInputLength={maxInputLength}
              handleCloseClick={handleCloseClick}
              totalPageCount={totalPageCount}
            />
          );
        })
        // index prop required by react-sortable, while idx used for updating redux state changes
        }
      </div>
    );
  }
);

export default SortableList;
