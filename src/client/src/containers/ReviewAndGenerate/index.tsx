import * as React from "react";
import { connect } from "react-redux";

import Table from "../../components/Table";

import { getFrameworksRowItemSelector, getServicesSelector, getProjectTypeRowItemSelector, getPagesRowItemsSelector } from "../../selectors/wizardSelectionSelector";

import styles from "./styles.module.css";

import { RowType } from "../../types/rowType";

interface IStateProps {
    projectTypeRows: RowType[];
    frameworkRows: RowType[];
    servicesRows: RowType[];
    pagesRows: RowType[];
}

const ReviewAndGenerate = (props: IStateProps) => {
    return(
        <div className={styles.container}>
            <div className={styles.title}>
                Review and Generate Template
            </div>
            <div className={styles.outputDetailsContainer}>
                <div className={styles.inputContainer}>
                    <div className={styles.inputTitle}>
                        Project Name:
                    </div>
                    <input className={styles.input}/>
                </div>
                <div className={styles.inputContainer}>
                    <div className={styles.inputTitle}>
                        Output Path:
                    </div>
                    <input className={styles.input}/>
                </div>
            </div>
            <Table title="1. Type of Application" rowItems={props.projectTypeRows}/>
            <Table title="2. Frameworks" rowItems={props.frameworkRows}/>
            <Table title="3. Pages" rowItems={props.pagesRows} />
            {props.servicesRows.length > 0 && 
            <Table title="4. Services" rowItems={props.servicesRows}/>}
        </div>
    )
}

const mapStateToProps = (state: any): IStateProps => ({
    projectTypeRows: getProjectTypeRowItemSelector(state),
    frameworkRows: getFrameworksRowItemSelector(state),
    servicesRows: getServicesSelector(state),
    pagesRows: getPagesRowItemsSelector(state),
})

export default(connect(mapStateToProps)(ReviewAndGenerate))