import * as React from "react";
import { connect } from "react-redux";
import { ReactComponent as FullStack } from "../../assets/fullstack.svg";

import Input from "../../components/Input";
import OutputPath from "../../components/OutputPath";

import {
  updateOutputPathAction,
  updateProjectNameAction
} from "../../actions/updateProjectNameAndPath";
import {
  getOutputPath,
  getProjectName,
  getProjectNameValidation
} from "../../selectors/wizardSelectionSelector";

import { IVSCodeObject } from "../../reducers/vscodeApiReducer";
import { EXTENSION_COMMANDS } from "../../utils/constants";

import styles from "./styles.module.css";

import { injectIntl, defineMessages, InjectedIntlProps } from "react-intl";
interface IProps {
  validation: any;
}

interface IStateProps {
  vscode: IVSCodeObject;
  outputPath: string;
  projectName: string;
  projectPathValidation: any;
  projectNameValidation: any;
}

interface IDispatchProps {
  updateProjectName: (projectName: string) => any;
  updateOutputPath: (outputPath: string) => any;
}

type Props = IStateProps & IDispatchProps & InjectedIntlProps & IProps;

const messages = defineMessages({
  projectNameTitle: {
    id: "projectName.projectNameTitle",
    defaultMessage: "Project Name:"
  },
  projectName: {
    id: "projectName.projectName",
    defaultMessage: "Project Name"
  },
  outputPathTitle: {
    id: "projectName.outputPathTitle",
    defaultMessage: "Output Path:"
  },
  outputPath: {
    id: "projectName.outputPath",
    defaultMessage: "Output Path"
  }
});

const ProjectNameAndOutput = (props: Props) => {
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
            isInvalidProjectPath: false,
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
      <FullStack className={styles.test} />
      <div className={styles.inputContainer}>
        <div className={styles.inputTitle}>
          {props.intl.formatMessage(messages.projectNameTitle)}
        </div>
        <Input
          handleChange={handleProjectNameChange}
          value={props.projectName}
          placeholder={props.intl.formatMessage(messages.projectName)}
        />
        {props.projectNameValidation.error && (
          <div className={styles.errorMessage}>
            {props.intl.formatMessage(props.projectNameValidation.error)}
          </div>
        )}
      </div>
      <div className={styles.inputContainer}>
        <div className={styles.inputTitle}>
          {props.intl.formatMessage(messages.outputPathTitle)}
        </div>
        <div>
          <OutputPath
            handleChange={handleOutputPathChange}
            handleSaveClick={handleSaveClick}
            value={props.outputPath}
            placeholder={props.intl.formatMessage(messages.outputPath)}
            validation={props.projectPathValidation}
            isEmpty={props.validation && props.outputPath.length === 0}
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
  projectPathValidation: state.selection.projectPathValidation,
  projectNameValidation: getProjectNameValidation(state)
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
)(injectIntl(ProjectNameAndOutput));
