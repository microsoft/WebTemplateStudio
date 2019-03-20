import * as React from "react";
import { connect } from "react-redux";

import SummarySection from "../../components/SummarySection";
import SortablePageList from "../SortablePageList";

import * as WizardSelectors from "../../selectors/wizardSelectionSelector";

import styles from "./styles.module.css";

import { RowType } from "../../types/rowType";
import ProjectNameAndOutput from "../ProjectNameAndOutput";

interface IStateProps {
  projectTypeRows: RowType[];
  frameworkRows: RowType[];
  servicesRows: RowType[];
  pagesRows: RowType[];
  vscode: any;
  validation: any;
}

type Props = IStateProps;

const ReviewAndGenerate = (props: Props) => {
  const {
    vscode,
    servicesRows,
    projectTypeRows,
    pagesRows,
    frameworkRows
  } = props;
  return (
    <div className={styles.container}>
      <div className={styles.title}>5. Review and Generate Template</div>
      <div className={styles.selectionTitle}>1. Welcome</div>
      <div className={styles.projectDetailsContainer}>
        <ProjectNameAndOutput />
      </div>
      <SummarySection
        selectionTitle="2. Project Type"
        selectionRows={projectTypeRows}
      />
      <SummarySection
        selectionTitle="3. Frameworks"
        selectionRows={frameworkRows}
      />
      <div className={styles.selectionContainer}>
        <div className={styles.selectionTitle}>4. Pages</div>
        <SortablePageList pagesRows={pagesRows} />
      </div>
      <SummarySection
        selectionTitle="5. Services"
        selectionRows={servicesRows}
      />
    </div>
  );
};

const mapStateToProps = (state: any): IStateProps => ({
  projectTypeRows: WizardSelectors.getProjectTypeRowItemSelector(state),
  frameworkRows: WizardSelectors.getFrameworksRowItemSelector(state),
  servicesRows: WizardSelectors.getServicesSelector(state),
  pagesRows: WizardSelectors.getPagesRowItemsSelector(state),
  vscode: state.vscode.vscodeObject,
  validation: state.selection.validation
});

export default connect(mapStateToProps)(ReviewAndGenerate);
