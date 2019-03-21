import * as React from "react";
import { connect } from "react-redux";

import { ReactComponent as SaveSVG } from "../../assets/folder.svg";
import Table from "../../components/Table";

import {
  updateOutputPathAction,
  updateProjectNameAction
} from "../../actions/updateProjectNameAndPath";
import * as WizardSelectors from "../../selectors/wizardSelectionSelector";

import styles from "./styles.module.css";

import { RowType } from "../../types/rowType";
import { IVSCode } from "../../reducers/vscodeApiReducer";

interface IStateProps {
  projectTypeRows: RowType[];
  frameworkRows: RowType[];
  servicesRows: RowType[];
  pagesRows: RowType[];
  projectName: string;
  outputPath: string;
  vscode: any;
  validation: any
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
  const handleSaveClick = () => {
    if (process.env.NODE_ENV === "production") {
      props.vscode.postMessage({
        command: "getOutputPath"
      });
    } else {
      // @ts-ignore produces a mock login response from VSCode in development
      window.postMessage({
        command: "getOutputPath",
        outputPath: "/generic_output_path"
      });
    }
  };
  return (
    <div className={styles.container}>
      <div className={styles.title}>Review and Generate Template</div>
      <div className={styles.outputDetailsContainer}>
        <div className={styles.inputContainer}>
          <div className={styles.inputTitle}>Project Name:</div>
          <input
            onChange={handleProjectNameChange}
            placeholder="Project Name"
            className={styles.input}
            maxLength={50}
          />
        </div>
        <div className={styles.inputContainer}>
          <div className={styles.inputTitle}>Output Path:</div>
          <div className={styles.outputPathContainer}>
            <input
              onChange={handleOutputPathChange}
              className={styles.pathInput}
              placeholder="Output Path"
              value={props.outputPath}
            />
            <SaveSVG
              className={styles.saveIcon}
              onClick={() => {
                handleSaveClick();
              }}
            />
          </div>
        </div>
      </div>
      {!props.validation.isValidProjectName && <div style={{ color: "#FF6666", fontSize: "12px", minHeight: "18px", marginBottom: "20px" }}>{props.validation.projectNameError}</div>}
      {!props.validation.isValidProjectPath && <div style={{ color: "#FF6666", fontSize: "12px", minHeight: "18px", marginBottom: "20px" }}>{props.validation.projectPathError}</div>}
      <Table title="1. Type of Application" rowItems={props.projectTypeRows} />
      <Table title="2. Frameworks" rowItems={props.frameworkRows} />
      <Table title="3. Pages" rowItems={props.pagesRows} />
      {props.servicesRows.length > 0 && (
        <Table title="4. Services" rowItems={props.servicesRows} />
      )}
    </div>
  );
};

const mapStateToProps = (state: any): IStateProps => (
  {
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
