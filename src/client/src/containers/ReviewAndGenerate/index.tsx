import * as React from "react";
import { connect } from "react-redux";

import Table from "../../components/Table";

import * as WizardSelectors from "../../selectors/wizardSelectionSelector";
import {
  updateProjectNameAction,
  updateOutputPathAction
} from "../../actions/updateProjectNameAndPath";

import styles from "./styles.module.css";

import { RowType } from "../../types/rowType";

interface IStateProps {
  projectTypeRows: RowType[];
  frameworkRows: RowType[];
  servicesRows: RowType[];
  pagesRows: RowType[];
  projectName: string;
  outputPath: string;
}

interface IDispatchProps {
  updateProjectName: (projectName: string) => any;
  updateOutputPath: (outputPath: string) => any;
}

type Props = IStateProps & IDispatchProps;

const ReviewAndGenerate = (props: Props) => {
  const handleProjectNameChange = (e: any) => {
    props.updateProjectName(e.target.value);
  };
  const handleOutputPathChange = (
    e: React.SyntheticEvent<HTMLInputElement>
  ) => {
    const element = e.currentTarget as HTMLInputElement;
    props.updateOutputPath(element.value);
  };
  return (
    <div className={styles.container}>
      <div className={styles.title}>Review and Generate Template</div>
      <div className={styles.outputDetailsContainer}>
        <div className={styles.inputContainer}>
          <div className={styles.inputTitle}>Project Name:</div>
          <input
            onChange={handleProjectNameChange}
            defaultValue={props.projectName}
            className={styles.input}
          />
        </div>
        <div className={styles.inputContainer}>
          <div className={styles.inputTitle}>Output Path:</div>
          <input
            onChange={handleOutputPathChange}
            defaultValue={props.outputPath}
            className={styles.input}
          />
        </div>
      </div>
      <Table title="1. Type of Application" rowItems={props.projectTypeRows} />
      <Table title="2. Frameworks" rowItems={props.frameworkRows} />
      <Table title="3. Pages" rowItems={props.pagesRows} />
      {props.servicesRows.length > 0 && (
        <Table title="4. Services" rowItems={props.servicesRows} />
      )}
    </div>
  );
};

const mapStateToProps = (state: any): IStateProps => ({
  projectTypeRows: WizardSelectors.getProjectTypeRowItemSelector(state),
  frameworkRows: WizardSelectors.getFrameworksRowItemSelector(state),
  servicesRows: WizardSelectors.getServicesSelector(state),
  pagesRows: WizardSelectors.getPagesRowItemsSelector(state),
  projectName: WizardSelectors.getProjectName(state),
  outputPath: WizardSelectors.getOutputPath(state)
});

const mapDispatchToProps = (dispatch: any): IDispatchProps => ({
  updateProjectName: (projectName: string) => {
    dispatch(updateProjectNameAction(projectName));
  },
  updateOutputPath: (outputPath: string) => {
    dispatch(updateOutputPathAction(outputPath));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ReviewAndGenerate);
