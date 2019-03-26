import * as React from "react";
import { SortableContainer, SortableElement } from "react-sortable-hoc";

import DraggableSidebarItem from "../../components/DraggableSidebarItem";

import cancel from "../../assets/cancel.svg";
import reorder from "../../assets/reorder.svg";
import getSvgUrl, { withLocalPath } from "../../utils/getSvgUrl";
import { ISelected } from "../../types/selected";

const SortableItem = SortableElement(({page, idx, handleInputChange, handleCloseClick}: {page: any, idx: number, handleInputChange: any, handleCloseClick?: (idx: number) => void }) => {
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
const SortableList = SortableContainer(({pages, handleInputChange, handleCloseClick }:{pages: ISelected[], handleInputChange: any, handleCloseClick?: (idx: number) => void }) => {
  return (
    <div>
      {pages.map((page: any, idx: number) => {
        return (
        <SortableItem key={page.id} index={idx} idx={idx} page={page} handleInputChange={handleInputChange} handleCloseClick={handleCloseClick} />)
        })
        // index prop required by react-sortable, while idx used for updating redux state changes
      }
    </div>
  );
});

export default SortableList;