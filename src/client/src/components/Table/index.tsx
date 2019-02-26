import * as React from "react";

import styles from "./styles.module.css";

import { RowType } from "../../types/rowType";

interface IProps {
    title: string;
    rowItems: RowType[];
}

const Table = (props: IProps) => {
    const [ isMinimized, hideOrShowRows ] = React.useState(false);
    return (
        <div className={styles.table}>
            <div className={styles.rowTitle}>
                <div>
                    {props.title}
                </div>
                <div onClick={() => { isMinimized ? hideOrShowRows(false) : hideOrShowRows(true) }}>
                    Minimize
                </div>
            </div> 
            <div className={styles.rowContainer}>
                {!isMinimized && props.rowItems.map((rowItem: RowType) => (
                    <div className={styles.row}>
                        <div className={styles.rowCellLeft}>
                            {rowItem.type}
                        </div>
                        <div className={styles.rowCellRight}>
                            {rowItem.name}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Table;