import * as React from "react";
import { connect } from "react-redux";

import Input from "../../components/Input";
import OutputPath from "../../components/OutputPath";

import {
  updateOutputPathAction,
  updateProjectNameAction
} from "../../actions/wizardSelectionActions/updateProjectNameAndPath";
import {
  getOutputPath,
  getProjectName,
  getProjectNameValidation,
  getOutputPathValidation
} from "../../selectors/wizardSelectionSelector";

import { IVSCodeObject } from "../../reducers/vscodeApiReducer";
import { EXTENSION_COMMANDS, EXTENSION_MODULES } from "../../utils/constants";

import styles from "./styles.module.css";

import {
  injectIntl,
  defineMessages,
  InjectedIntlProps,
  FormattedMessage
} from "react-intl";
import { getVSCodeApiSelector } from "../../selectors/vscodeApiSelector";
import { IValidation } from "../../reducers/wizardSelectionReducers/updateOutputPath";
import { AppState } from "../../reducers";
import { Dispatch } from "redux";
import RootAction from "../../actions/ActionType";

interface IStateProps {
  vscode: IVSCodeObject;
  outputPath: string;
  projectName: string;
  projectPathValidation: IValidation;
  projectNameValidation: IValidation;
}

interface IDispatchProps {
  updateProjectName: (projectName: string) => any;
  updateOutputPath: (outputPath: string) => any;
}

type Props = IStateProps & IDispatchProps & InjectedIntlProps;

const messages = defineMessages({
  projectNameTitle: {
    id: "projectName.projectNameTitle",
    defaultMessage: "Project Name:"
  },
  projectName: {
    id: "projectName.projectName",
    defaultMessage: "Project Name"
  },
  ariaProjectNameLabel: {
    id: "projectName.ariaProjectName",
    defaultMessage: "Project Name Input"
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
    if (props.vscode) {
      if (props.projectPathValidation) {
        props.vscode.postMessage({
          module: EXTENSION_MODULES.VALIDATOR,
          command: EXTENSION_COMMANDS.PROJECT_PATH_VALIDATION,
          track: false,
          projectPath: props.outputPath,
          projectName: props.projectName
        });
      }
    }
  }, [props.outputPath, props.projectName]);
  React.useEffect(() => {
    if (props.vscode) {
      props.vscode.postMessage({
        module: EXTENSION_MODULES.VALIDATOR,
        command: EXTENSION_COMMANDS.PROJECT_PATH_VALIDATION,
        track: false,
        projectPath: props.outputPath,
        projectName: props.projectName
      });
    }
  }, [props.outputPath]);
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
      module: EXTENSION_MODULES.VALIDATOR,
      command: EXTENSION_COMMANDS.GET_OUTPUT_PATH,
      track: false
    });
  };
  return (
    <React.Fragment>
      <div className={styles.inputContainer}>
        <div className={styles.inputTitle}>
          {props.intl.formatMessage(messages.projectNameTitle)}
        </div>
        <Input
          handleChange={handleProjectNameChange}
          ariaLabel={props.intl.formatMessage(messages.ariaProjectNameLabel)}
          value={props.projectName}
          placeholder={props.intl.formatMessage(messages.projectName)}
        />
        {props.projectNameValidation.error && (
          <div className={styles.errorMessage}>
            {props.intl.formatMessage(props.projectNameValidation
              .error as FormattedMessage.MessageDescriptor)}
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
            isEmpty={
              props.projectPathValidation && props.outputPath.length === 0
            }
          />
        </div>
      </div>
    </React.Fragment>
  );
};

const mapStateToProps = (state: AppState): IStateProps => ({
  vscode: getVSCodeApiSelector(state),
  outputPath: getOutputPath(state),
  projectName: getProjectName(state),
  projectPathValidation: getOutputPathValidation(state),
  projectNameValidation: getProjectNameValidation(state)
});

const mapDispatchToProps = (
  dispatch: Dispatch<RootAction>
): IDispatchProps => ({
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
