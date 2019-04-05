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

import { defineMessages, injectIntl, InjectedIntlProps } from "react-intl";

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

type Props = IStateProps & IDispatchProps & InjectedIntlProps;

const messages = defineMessages({
  welcome: {
    id: "review.welcome",
    defaultMessage: "1. Welcome"
  },
  projectType: {
    id: "review.projectType",
    defaultMessage: "2. Project Type"
  },
  frameworks: {
    id: "review.frameworks",
    defaultMessage: "3. Frameworks"
  },
  pages: {
    id: "review.pages",
    defaultMessage: "4. Pages"
  },
  services: {
    id: "review.services",
    defaultMessage: "5. Services"
  },
  reviewAndGenerate: {
    id: "review.reviewAndGenerate",
    defaultMessage: "6. Review and Generate Template"
  }
});

const ReviewAndGenerate = (props: Props) => {
  const {
    vscode,
    servicesRows,
    projectTypeRows,
    pagesRows,
    intl,
    frameworkRows
  } = props;
  const modalOpeners = {
    [WIZARD_CONTENT_INTERNAL_NAMES.COSMOS_DB]: props.openCosmosDbModal,
    [WIZARD_CONTENT_INTERNAL_NAMES.AZURE_FUNCTIONS]:
      props.openAzureFunctionsModal
  };
  return (
    <div className={styles.container}>
      <div className={styles.title}>
        {intl.formatMessage(messages.reviewAndGenerate)}
      </div>
      <div className={styles.selectionTitle}>
        {intl.formatMessage(messages.welcome)}
      </div>
      <div className={styles.projectDetailsContainer}>
        <ProjectNameAndOutput />
      </div>
      <SummarySection
        selectionTitle={intl.formatMessage(messages.projectType)}
        selectionRows={projectTypeRows}
      />
      <SummarySection
        selectionTitle={intl.formatMessage(messages.frameworks)}
        selectionRows={frameworkRows}
      />
      <div className={styles.selectionContainer}>
        <div className={styles.selectionTitle}>
          {intl.formatMessage(messages.pages)}
        </div>
        <SortablePageList pagesRows={pagesRows} />
      </div>
      <SummarySection
        selectionTitle={intl.formatMessage(messages.services)}
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
)(injectIntl(ReviewAndGenerate));
