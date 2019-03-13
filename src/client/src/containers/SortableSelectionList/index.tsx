import * as React from "react";
import { SortableContainer, SortableElement } from "react-sortable-hoc";

import DraggableSidebarItem from "../../components/DraggableSidebarItem";

import cancel from "../../assets/cancel.svg";
import reorder from "../../assets/reorder.svg";
import getSvgUrl from "../../utils/getSvgUrl";
import { ISelected } from "../../types/selected";

const SortableItem = SortableElement(({page, idx, handleInputChange}: {page: any, idx: number, handleInputChange: any}) => {
    return (
    <DraggableSidebarItem
        key={page.internalName}
        page={page}
        closeSvgUrl={`${
        process.env.REACT_APP_RELATIVE_PATH
        }${cancel}`}
        pageSvgUrl={getSvgUrl(page.internalName)}
        reorderSvgUrl={`${
        process.env.REACT_APP_RELATIVE_PATH
        }${reorder}`}
        handleInputChange={handleInputChange}
        idx={idx + 1}
    />)
})
const SortableList = SortableContainer(({pages, handleInputChange}:{pages: ISelected[], handleInputChange: any}) => {
  return (
    <div>
      {pages.map((page: any, idx: number) => {
        return (
        <SortableItem key={`item-${page.internalName + idx}`} index={idx} idx={idx} page={page} handleInputChange={handleInputChange} />)
        })}
    </div>
  );
});

export default SortableList;