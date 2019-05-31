import * as React from "react";
import { connect } from "react-redux";

import SummarySection from "../SummarySection";
import SummaryTile from "../../components/SummaryTile";
import SortablePageList from "../SortablePageList";

import * as ModalActions from "../../actions/modalActions/modalActions";
import * as WizardSelectors from "../../selectors/wizardSelectionSelector";

import styles from "./styles.module.css";

import { RowType } from "../../types/rowType";

import Title from "../../components/Title";

import { defineMessages, injectIntl, InjectedIntlProps } from "react-intl";
import { withLocalPath } from "../../utils/getSvgUrl";
import folder from "../../assets/folder.svg";
import { AppState } from "../../reducers";
import { getVSCodeApiSelector } from "../../selectors/vscodeApiSelector";
import { ThunkDispatch } from "redux-thunk";
import RootAction from "../../actions/ActionType";

interface IDispatchProps {
  openCosmosDbModal: () => any;
  openAzureFunctionsModal: () => any;
}

interface IStateProps {
  projectTypeRows: RowType[];
  frameworkRows: RowType[];
  servicesRows: RowType[];
  vscode: any;
  projectName: string;
  outputPath: string;
}

type Props = IStateProps & IDispatchProps & InjectedIntlProps;

const messages = defineMessages({
  welcome: {
    id: "review.newProject",
    defaultMessage: "New Project"
  },
  projectType: {
    id: "review.projectType",
    defaultMessage: "Project Type"
  },
  frameworks: {
    id: "review.frameworks",
    defaultMessage: "Frameworks"
  },
  pages: {
    id: "review.pages",
    defaultMessage: "Pages"
  },
  services: {
    id: "review.services",
    defaultMessage: "Services"
  },
  reviewAndGenerate: {
    id: "review.reviewAndGenerate",
    defaultMessage: "Your project summary."
  }
});

const ReviewAndGenerate = (props: Props) => {
  const {
    servicesRows,
    projectTypeRows,
    intl,
    frameworkRows,
    projectName,
    outputPath
  } = props;
  return (
    <div className={styles.container}>
      <Title>{intl.formatMessage(messages.reviewAndGenerate)}</Title>
      <div className={styles.selectionContainer}>
        <div className={styles.selectionTitle}>
          {intl.formatMessage(messages.welcome)}
        </div>
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
        <SortablePageList isSummaryPage={true} />
      </div>
      <SummarySection
        selectionTitle={intl.formatMessage(messages.services)}
        selectionRows={servicesRows}
        canDelete={true}
      />
    </div>
  );
};

const mapDispatchToProps = (
  dispatch: ThunkDispatch<AppState, void, RootAction>
): IDispatchProps => ({
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
  vscode: getVSCodeApiSelector(state),
  projectName: WizardSelectors.getProjectName(state),
  outputPath: WizardSelectors.getOutputPath(state)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(injectIntl(ReviewAndGenerate));
