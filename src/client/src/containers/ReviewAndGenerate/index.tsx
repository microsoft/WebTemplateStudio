import * as React from "react";
import { connect } from "react-redux";

import { ReactComponent as SaveSVG } from "../../assets/folder.svg";
import SortablePageList from "../SortablePageList";

import {
  updateOutputPathAction,
  updateProjectNameAction
} from "../../actions/updateProjectNameAndPath";
import * as WizardSelectors from "../../selectors/wizardSelectionSelector";

import styles from "./styles.module.css";

import { RowType } from "../../types/rowType";
import { EXTENSION_COMMANDS } from "../../utils/constants";
import SummarySection from "../../components/SummarySection";

interface IStateProps {
  projectTypeRows: RowType[];
  frameworkRows: RowType[];
  servicesRows: RowType[];
  pagesRows: RowType[];
  projectName: string;
  outputPath: string;
  vscode: any;
  validation: any;
}

interface IDispatchProps {
  updateProjectName: (projectName: string) => any;
  updateOutputPath: (outputPath: string) => any;
}

type Props = IStateProps & IDispatchProps;

const ReviewAndGenerate = (props: Props) => {
  const {
    updateProjectName,
    updateOutputPath,
    vscode,
    outputPath,
    servicesRows,
    projectTypeRows,
    pagesRows,
    frameworkRows
  } = props;
  const handleProjectNameChange = (e: React.SyntheticEvent) => {
    let target = e.target as HTMLInputElement;
    updateProjectName(target.value);
  };
  const handleOutputPathChange = (
    e: React.SyntheticEvent<HTMLInputElement>
  ) => {
    const element = e.currentTarget as HTMLInputElement;
    updateOutputPath(element.value);
  };
  const handleSaveClick = () => {
    vscode.postMessage({
      command: EXTENSION_COMMANDS.GET_OUTPUT_PATH
    });
  };
  return (
    <div className={styles.container}>
      <div className={styles.title}>5. Review and Generate Template</div>
      <div className={styles.selectionTitle}>1. Welcome</div>
      <div className={styles.inputContainer}>
        <div className={styles.inputTitle}>Project Name:</div>
        <input
          onChange={handleProjectNameChange}
          placeholder="Project Name"
          className={styles.input}
        />
      </div>
      <div className={styles.inputContainer}>
        <div className={styles.inputTitle}>Output Path:</div>
        <div className={styles.outputPathContainer}>
          <input
            onChange={handleOutputPathChange}
            className={styles.pathInput}
            placeholder="Output Path"
            value={outputPath}
          />
          <SaveSVG className={styles.saveIcon} onClick={handleSaveClick} />
        </div>
      </div>
      {!props.validation.isValidProjectName && (
        <div
          style={{
            color: "#FF6666",
            fontSize: "12px",
            minHeight: "18px",
            marginBottom: "20px"
          }}
        >
          {props.validation.projectNameError}
        </div>
      )}
      {!props.validation.isValidProjectPath && (
        <div
          style={{
            color: "#FF6666",
            fontSize: "12px",
            minHeight: "18px",
            marginBottom: "20px"
          }}
        >
          {props.validation.projectPathError}
        </div>
      )}
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
  projectName: WizardSelectors.getProjectName(state),
  outputPath: WizardSelectors.getOutputPath(state),
  vscode: state.vscode.vscodeObject,
  validation: state.selection.validation
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
