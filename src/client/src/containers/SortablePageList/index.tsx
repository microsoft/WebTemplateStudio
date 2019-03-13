import * as React from "react";
import { connect } from "react-redux";
import { arrayMove, SortableContainer, SortableElement } from "react-sortable-hoc";

import DraggableSidebarItem from "../../components/DraggableSidebarItem";
import SortableList from "../SortableSelectionList";

import cancel from "../../assets/cancel.svg";
import reorder from "../../assets/reorder.svg";
import getSvgUrl from "../../utils/getSvgUrl";

import { selectPagesAction } from "../../actions/selectPages";

import { ISelected } from "../../types/selected";

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
    React.useEffect(() => {
        setPages(props.pages);
    }, [props.pages]);
    /**
     * Changes the title of the page type that was chosen
     * Saves changes into the redux
     */
    const handleInputChange = (newTitle: string, idx: number) => {
        pages[idx].title = newTitle;
        setPages(pages);
        props.selectPages(pages);
    };
    // const SortableItem = SortableElement(({page, idx}: {page: any, idx: number}) => {
    //     return (
    //     <DraggableSidebarItem
    //         key={page.internalName}
    //         page={page}
    //         closeSvgUrl={`${
    //         process.env.REACT_APP_RELATIVE_PATH
    //         }${cancel}`}
    //         pageSvgUrl={getSvgUrl(page.internalName)}
    //         reorderSvgUrl={`${
    //         process.env.REACT_APP_RELATIVE_PATH
    //         }${reorder}`}
    //         handleInputChange={handleInputChange}
    //         idx={idx + 1}
    //     />)
    // })
    // const SortableList = SortableContainer(({pages}:{pages: any}) => {
    //   return (
    //     <div>
    //       {pages.map((page: any, idx: number) => {
    //         return (
    //         <SortableItem key={`item-${page.internalName + idx}`} index={idx} idx={idx} page={page} />)
    //         })}
    //     </div>
    //   );
    // });
    const onSortEnd = ({oldIndex, newIndex}: {oldIndex: number, newIndex: number}) => {
        props.selectPages((arrayMove(pages, oldIndex, newIndex)));
    };
    return (
        <div className={styles.sidebarItem}>
            <div className={styles.dropdownTitle}>Pages</div>
            {/* <SortableSelectionList selectedItems={pages} handleInputChange={handleInputChange} onSortEnd={onSortEnd} />*/}
            <SortableList pages={props.pages} onSortEnd={onSortEnd} handleInputChange={handleInputChange} />
            {/* Using a baseline of 1 for idx because !!0 === false */}
        </div>
    )
}

const mapStateToProps = (state: any): ISortablePageListProps => {
    return {
      pages: state.selection.pages
    };
};

const mapDispatchToProps = (dispatch: any): ISortableDispatchProps => ({
    selectPages: (pages: ISelected[]) => {
        dispatch(selectPagesAction(pages));
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(SortablePageList);