import * as React from "react";
import { connect } from "react-redux";

import Input from "../../components/Input";
import OutputPath from "../../components/OutputPath";

import {
  updateOutputPathAction,
  updateProjectNameAction
} from "../../actions/updateProjectNameAndPath";
import {
  getOutputPath,
  getProjectName
} from "../../selectors/wizardSelectionSelector";

import { IVSCodeObject } from "../../reducers/vscodeApiReducer";
import { EXTENSION_COMMANDS } from "../../utils/constants";

import styles from "./styles.module.css";

interface IStateProps {
  vscode: IVSCodeObject;
  outputPath: string;
  projectName: string;
}

interface IDispatchProps {
  updateProjectName: (projectName: string) => any;
  updateOutputPath: (outputPath: string) => any;
}

type Props = IStateProps & IDispatchProps;

const ProjectNameAndOutput = (props: Props) => {
  const handleProjectNameChange = (
    e: React.SyntheticEvent<HTMLInputElement>
  ) => {
    const element = e.currentTarget as HTMLInputElement;
    props.updateProjectName(element.value);
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
  return (
    <React.Fragment>
      <div className={styles.inputContainer}>
        <div className={styles.inputTitle}>Project Name:</div>
        <Input
          handleChange={handleProjectNameChange}
          value={props.projectName}
          placeholder="Project Name"
        />
      </div>
      <div className={styles.inputContainer}>
        <div className={styles.inputTitle}>Output Path:</div>
        <div className={styles.outputPathContainer}>
          <OutputPath
            handleChange={handleOutputPathChange}
            handleSaveClick={handleSaveClick}
            value={props.outputPath}
            placeholder="Output Path"
          />
        </div>
      </div>
    </React.Fragment>
  );
};

const mapStateToProps = (state: any): IStateProps => ({
  vscode: state.vscode.vscodeObject,
  outputPath: getOutputPath(state),
  projectName: getProjectName(state)
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
)(ProjectNameAndOutput);
