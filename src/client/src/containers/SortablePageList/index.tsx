import * as React from "react";
import { connect } from "react-redux";
import { arrayMove } from "react-sortable-hoc";

import SortableList from "../SortableSelectionList";

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
    const handleInputChange = (newTitle: string, idx: number) => {
        pages[idx].title = newTitle;
        setPages(pages);
        props.selectPages(pages);
    };
    const onSortEnd = ({oldIndex, newIndex}: {oldIndex: number, newIndex: number}) => {
        props.selectPages((arrayMove(pages, oldIndex, newIndex)));
    };
    return (
        <div className={styles.sidebarItem}>
            <div className={styles.dropdownTitle}>Pages</div>
            <SortableList pages={props.pages} onSortEnd={onSortEnd} handleInputChange={handleInputChange} />
        </div>
    )
}

const mapStateToProps = (state: any): ISortablePageListProps => ({
    pages: state.selection.pages
});

const mapDispatchToProps = (dispatch: any): ISortableDispatchProps => ({
    selectPages: (pages: ISelected[]) => {
        dispatch(selectPagesAction(pages));
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(SortablePageList);