import classnames from "classnames";
import * as React from "react";
import { connect } from "react-redux";

import SummarySection from "../SummarySection";
import SummaryTile from "../../components/SummaryTile";
import SortablePageList from "../SortablePageList";

import * as ModalActions from "../../actions/modalActions/modalActions";
import * as WizardSelectors from "../../selectors/wizardSelectionSelector";

import styles from "./styles.module.css";

import { RowType } from "../../types/rowType";

import { WIZARD_CONTENT_INTERNAL_NAMES } from "../../utils/constants";
import Title from "../../components/Title";

import { defineMessages, injectIntl, InjectedIntlProps } from "react-intl";
import { withLocalPath } from "../../utils/getSvgUrl";
import folder from "../../assets/folder.svg";
import { AppState } from "../../reducers";
import { getVSCodeApiSelector } from "../../selectors/vscodeApiSelector";

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
  projectName: string;
  outputPath: string;
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
    defaultMessage: "6. Your project summary."
  }
});

const ReviewAndGenerate = (props: Props) => {
  const {
    servicesRows,
    projectTypeRows,
    pagesRows,
    intl,
    frameworkRows,
    projectName,
    outputPath
  } = props;
  const modalOpeners = {
    [WIZARD_CONTENT_INTERNAL_NAMES.COSMOS_DB]: props.openCosmosDbModal,
    [WIZARD_CONTENT_INTERNAL_NAMES.AZURE_FUNCTIONS]:
      props.openAzureFunctionsModal
  };
  return (
    <div className={styles.container}>
      <Title>{intl.formatMessage(messages.reviewAndGenerate)}</Title>
      <div
        className={classnames(styles.selectionTitle, styles.selectionContainer)}
      >
        {intl.formatMessage(messages.welcome)}
        <SummaryTile
          showFolderIcon={true}
          svgUrl={withLocalPath(folder)}
          title={projectName}
          subTitle={`${outputPath}/${projectName}`}
        />
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

const mapStateToProps = (state: AppState): IStateProps => ({
  projectTypeRows: WizardSelectors.getProjectTypeRowItemSelector(state),
  frameworkRows: WizardSelectors.getFrameworksRowItemSelector(state),
  servicesRows: WizardSelectors.getServicesSelector(state),
  pagesRows: WizardSelectors.getPagesRowItemsSelector(state),
  vscode: getVSCodeApiSelector(state),
  projectName: WizardSelectors.getProjectName(state),
  outputPath: WizardSelectors.getOutputPath(state)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(injectIntl(ReviewAndGenerate));
