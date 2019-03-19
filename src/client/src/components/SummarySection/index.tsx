import * as React from "react";

import SummaryTile from "../SummaryTile";

import { RowType } from "../../types/rowType";

import styles from "./styles.module.css";

interface Props {
    selectionTitle: string;
    selectionRows: RowType[];
    isEditable?: boolean;
}

const SummarySection = ({ selectionTitle, selectionRows, isEditable }: Props) => {
    const renderTile = (title: string, svgUrl?: string, company?: string, originalTitle?: string, isEditable?: boolean, withIndent?: boolean) => {
        return (
          <div className={styles.tileContainer}>
            <SummaryTile title={title} version="v1.0" svgUrl={svgUrl} company={company} originalTitle={originalTitle} isEditable={isEditable} withIndent={withIndent} />
          </div>
        )
    }
    return (
        <div className={styles.selectionContainer}>
            <div className={styles.selectionTitle}>{selectionTitle}</div>
                {selectionRows.map((selection) => (
                    <React.Fragment>
                    {renderTile(selection.title, selection.svgUrl, selection.company, selection.originalTitle, isEditable)}
                    {selection.functionNames && selection.functionNames.map((functionName) => (
                        renderTile(functionName, undefined, undefined, undefined, true, true)
                    ))}
                    </React.Fragment>
                ))}
        </div>
    )
}

export default SummarySection;