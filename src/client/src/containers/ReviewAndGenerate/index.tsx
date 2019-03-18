import * as React from "react";
import { connect } from "react-redux";

import { ReactComponent as SaveSVG } from "../../assets/folder.svg";
import SummaryTile from "../../components/SummaryTile";
import SortablePageList from "../SortablePageList";
import Title from "../../components/Title";

import {
  updateOutputPathAction,
  updateProjectNameAction
} from "../../actions/updateProjectNameAndPath";
import * as WizardSelectors from "../../selectors/wizardSelectionSelector";

import styles from "./styles.module.css";

import { RowType } from "../../types/rowType";
import { EXTENSION_COMMANDS } from "../../utils/constants";

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
    props.vscode.postMessage({
      command: EXTENSION_COMMANDS.GET_OUTPUT_PATH
    });
  };
  const renderTile = (title: string, svgUrl?: string, company?: string, originalTitle?: string, isEditable?: boolean, withIndent?: boolean) => {
    return (
      <div className={styles.tileContainer}>
        <SummaryTile title={title} version="v1.0" svgUrl={svgUrl} company={company} originalTitle={originalTitle} isEditable={isEditable} withIndent={withIndent} />
      </div>
    )
  }
  const renderSelection = (selectionTitle: string, selectionRows: RowType[], isEditable?: boolean, withIndent?: boolean) => {
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
    )}
  return (
    <div className={styles.container}>
      <Title>Review and generate template</Title>
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
      {!props.validation.isValidProjectName && <div style={{ color: "#FF6666", fontSize: "12px", minHeight: "18px", marginBottom: "20px" }}>{props.validation.projectNameError}</div>}
      {!props.validation.isValidProjectPath && <div style={{ color: "#FF6666", fontSize: "12px", minHeight: "18px", marginBottom: "20px" }}>{props.validation.projectPathError}</div>}
      {renderSelection("2. Project Type", props.projectTypeRows)}
      {renderSelection("3. Frameworks", props.frameworkRows)}
      <div className={styles.selectionContainer}>
        <div className={styles.selectionTitle}>4. Pages</div>
          <SortablePageList pagesRows={props.pagesRows} />
      </div>
      {renderSelection("5. Services", props.servicesRows)}
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
