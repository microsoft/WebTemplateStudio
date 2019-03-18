import * as React from "react";
import { SortableContainer, SortableElement } from "react-sortable-hoc";

import DraggableSidebarItem from "../../components/DraggableSidebarItem";
import SummaryTile from "../../components/SummaryTile";

import styles from "./styles.module.css";

import cancel from "../../assets/cancel.svg";
import reorder from "../../assets/reorder.svg";
import getSvgUrl, { withLocalPath } from "../../utils/getSvgUrl";
import { ISelected } from "../../types/selected";

const SortableSidebarItem = SortableElement(({page, idx, handleInputChange, handleCloseClick}: {page: any, idx: number, handleInputChange: any, handleCloseClick?: (idx: number) => void }) => {
    return (
    <DraggableSidebarItem
        page={page}
        closeSvgUrl={withLocalPath(cancel)}
        pageSvgUrl={getSvgUrl(page.internalName)}
        reorderSvgUrl={withLocalPath(reorder)}
        handleInputChange={handleInputChange}
        handleCloseClick={handleCloseClick}
        idx={idx + 1}
    />)
    // use idx+1 to prevent falsiness of 0th value
})

const SortableSummaryTile = SortableElement(({page, idx, handleInputChange, handleCloseClick}: {page: any, idx: number, handleInputChange: any, handleCloseClick?: (idx: number) => void }) => {
  return (
      <React.Fragment>
          <div className={styles.tileContainer}>
          <SummaryTile title={page.title} version="v1.0" svgUrl={page.svgUrl} isEditable={true} />
          </div>
      </React.Fragment>)
})

/**
 * A component that produces sortable pages to be displayed on the sidebar or in the summary page.
 */
const SortableList = SortableContainer(({pages, pagesRows, handleInputChange, handleCloseClick }:{pages: ISelected[], pagesRows?: any[], handleInputChange: any, handleCloseClick?: (idx: number) => void }) => {
  return (
    <div>
      {!pagesRows && pages.map((page: any, idx: number) => {
        return (
        <SortableSidebarItem key={page.id} index={idx} idx={idx} page={page} handleInputChange={handleInputChange} handleCloseClick={handleCloseClick} />)
        })
        // index prop required by react-sortable, while idx used for updating redux state changes
      }
      {pagesRows && pagesRows.map((page: any, idx: number) => {
        return (
        <SortableSummaryTile key={`item-${page.internalName} ${idx}`} index={idx} idx={idx} page={page} handleInputChange={handleInputChange} handleCloseClick={handleCloseClick} />
        )})}
    </div>
  );
});

export default SortableList;