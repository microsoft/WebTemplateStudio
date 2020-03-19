import * as React from "react";
import { SortableContainer, SortableElement } from "react-sortable-hoc";
import DraggablePage from "./DraggablePage";
import styles from "./styles.module.css";
import { ISelected } from "../../../../types/selected";

const SortableSidebarItem = SortableElement(
  ({
    page,
    idx,
    totalPageCount,
    maxInputLength
  }: {
    page: any;
    idx: number;
    maxInputLength?: number;
    totalPageCount: number;
  }) => {
    return (
      <DraggablePage
        page={page}
        maxInputLength={maxInputLength}
        idx={idx + 1}
        totalCount={totalPageCount}
      />
    );
  }
);

const PageContainer = SortableContainer(
  ({
    pages,
    maxInputLength
  }: {
    pages: ISelected[];
    maxInputLength?: number;
  }) => {
    const totalPageCount = pages.length;
    return (
      <div className={styles.sidebarItem}>
        {pages.map((page: ISelected, idx: number) => {
          return (
            <SortableSidebarItem
              key={idx}
              index={idx}
              idx={idx}
              page={page}
              maxInputLength={maxInputLength}
              totalPageCount={totalPageCount}
            />
          );
        })
        }
      </div>
    );
  }
);

export default PageContainer;