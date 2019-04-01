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

interface IProps {
  validation: any;
}

interface IStateProps {
  vscode: IVSCodeObject;
  outputPath: string;
  projectName: string;
  projectPathValidation: any;
}

interface IDispatchProps {
  updateProjectName: (projectName: string) => any;
  updateOutputPath: (outputPath: string) => any;
}

type Props = IStateProps & IDispatchProps & IProps;

const ProjectNameAndOutput = (props: Props) => {
  console.log(props.validation);
  React.useEffect(() => {
    if (process.env.NODE_ENV === "production") {
      if (props.vscode) {
        // @ts-ignore
        props.vscode.postMessage({
          command: EXTENSION_COMMANDS.PROJECT_PATH_VALIDATION,
          projectPath: props.outputPath,
          projectName: props.projectName
        });
      }
    } else {
      // @ts-ignore produces a mock validation response from VSCode in development
      window.postMessage({
        command: EXTENSION_COMMANDS.PROJECT_PATH_VALIDATION,
        payload: {
          projectPathValidation: {
            isInvalidProjectPath: true,
            projectPathError: "Invalid path"
          }
        }
      });
    }
  }, [props.outputPath, props.projectName]);
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
        <div>
          <OutputPath
            handleChange={handleOutputPathChange}
            handleSaveClick={handleSaveClick}
            value={props.outputPath}
            placeholder="Output Path"
            validation={props.projectPathValidation}
            isEmpty={props.validation}
          />
        </div>
      </div>
    </React.Fragment>
  );
};

const mapStateToProps = (state: any): IStateProps => ({
  vscode: state.vscode.vscodeObject,
  outputPath: getOutputPath(state),
  projectName: getProjectName(state),
  projectPathValidation: state.selection.projectPathValidation
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
