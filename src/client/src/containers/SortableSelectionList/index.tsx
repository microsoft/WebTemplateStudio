import * as React from "react";
import { SortableContainer, SortableElement } from "react-sortable-hoc";

import DraggableSidebarItem from "../../components/DraggableSidebarItem";

import cancel from "../../assets/cancel.svg";
import reorder from "../../assets/reorder.svg";
import getSvgUrl, { withLocalPath } from "../../utils/getSvgUrl";
import { ISelected } from "../../types/selected";

const SortableItem = SortableElement(({page, idx, handleInputChange}: {page: any, idx: number, handleInputChange: any}) => {
    return (
    <DraggableSidebarItem
        key={`ditem-${page.internalName}-${idx}`}
        page={page}
        closeSvgUrl={withLocalPath(cancel)}
        pageSvgUrl={getSvgUrl(page.internalName)}
        reorderSvgUrl={withLocalPath(reorder)}
        handleInputChange={handleInputChange}
        idx={idx + 1}
    />)
    // use idx+1 to prevent falsiness of 0th value
});
const SortableList = SortableContainer(({pages, handleInputChange}:{pages: ISelected[], handleInputChange: any}) => {
  return (
    <div>
      {pages.map((page: any, idx: number) => {
        return (
        <SortableItem key={`pageItem-${page.id + idx}`} index={idx} idx={idx} page={page} handleInputChange={handleInputChange} />)
        })}
    </div>
  );
});

export default SortableList;