import * as React from "react";
import { connect } from "react-redux";

import SummarySection from "../../components/SummarySection";
import ProjectNameAndOutput from "../ProjectNameAndOutput";
import SortablePageList from "../SortablePageList";

import * as ModalActions from "../../actions/modalActions";
import * as WizardSelectors from "../../selectors/wizardSelectionSelector";

import styles from "./styles.module.css";

import { RowType } from "../../types/rowType";

import { WIZARD_CONTENT_INTERNAL_NAMES } from "../../utils/constants";

interface IDispatchProps {
  openCosmosDbModal: () => any;
  openAzureFunctionsModal: () => any;
}

interface IStateProps {
  projectTypeRows: RowType[];
  frameworkRows: RowType[];
  servicesRows: RowType[];
  pagesRows: RowType[];
  vscode: any;
  validation: any;
}

type Props = IStateProps & IDispatchProps;

const ReviewAndGenerate = (props: Props) => {
  const {
    vscode,
    servicesRows,
    projectTypeRows,
    pagesRows,
    frameworkRows
  } = props;
  const modalOpeners = {
    [WIZARD_CONTENT_INTERNAL_NAMES.COSMOS_DB]: props.openCosmosDbModal,
    [WIZARD_CONTENT_INTERNAL_NAMES.AZURE_FUNCTIONS]:
      props.openAzureFunctionsModal
  };
  return (
    <div className={styles.container}>
      <div className={styles.title}>6. Review and Generate Template</div>
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
        modalOpeners={modalOpeners}
      />
    </div>
  );
};

const mapDispatchToProps = (dispatch: any): IDispatchProps => ({
  openCosmosDbModal: () => {
    dispatch(ModalActions.openCosmosDbModalAction());
  },
  openAzureFunctionsModal: () => {
    dispatch(ModalActions.openAzureFunctionsModalAction());
  }
});

const mapStateToProps = (state: any): IStateProps => ({
  projectTypeRows: WizardSelectors.getProjectTypeRowItemSelector(state),
  frameworkRows: WizardSelectors.getFrameworksRowItemSelector(state),
  servicesRows: WizardSelectors.getServicesSelector(state),
  pagesRows: WizardSelectors.getPagesRowItemsSelector(state),
  vscode: state.vscode.vscodeObject,
  validation: state.selection.validation
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ReviewAndGenerate);
