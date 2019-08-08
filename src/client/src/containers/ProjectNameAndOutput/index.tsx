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
import {
  EXTENSION_COMMANDS,
  EXTENSION_MODULES,
  PROJECT_NAME_CHARACTER_LIMIT
} from "../../utils/constants";

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
    defaultMessage: "Project Name"
  },
  ariaProjectNameLabel: {
    id: "projectName.ariaProjectName",
    defaultMessage: "Project Name Input"
  },
  nameTooLong: {
    id: "projectNameError.nameTooLong",
    defaultMessage: `Project name can only be {maxLength} characters long`
  },
  outputPathTitle: {
    id: "projectName.outputPathTitle",
    defaultMessage: "Save To"
  }
});

const ProjectNameAndOutput = (props: Props) => {
  const [projectNameMaxLength, setProjectNameMaxLength] = React.useState(false);

  const {
    vscode,
    outputPath,
    projectPathValidation,
    projectNameValidation,
    projectName,
    updateProjectName,
    updateOutputPath
  } = props;

  React.useEffect(() => {
    if (projectName === "") {
      vscode.postMessage({
        module: EXTENSION_MODULES.DEFAULTS,
        command: EXTENSION_COMMANDS.GET_PROJECT_NAME
      });
    }
    if (outputPath === "") {
      vscode.postMessage({
        module: EXTENSION_MODULES.DEFAULTS,
        command: EXTENSION_COMMANDS.GET_OUTPUT_PATH
      });
    }
  }, [vscode]);

  React.useEffect(() => {
    if (vscode) {
      if (
        projectPathValidation ||
        (outputPath !== "" && !projectPathValidation)
      ) {
        vscode.postMessage({
          module: EXTENSION_MODULES.VALIDATOR,
          command: EXTENSION_COMMANDS.PROJECT_PATH_VALIDATION,
          track: false,
          projectPath: outputPath,
          projectName: projectName
        });
      }
    }
  }, [outputPath, projectName]);
  const handleProjectNameChange = (
    e: React.SyntheticEvent<HTMLInputElement>
  ) => {
    const element = e.currentTarget as HTMLInputElement;
    updateProjectName(element.value);
  };
  const validateKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const element = e.target as HTMLInputElement;
    const inputKeyCheck = /^[A-Za-z0-9_\- ]$/;

    if (element.value.length === 50 && inputKeyCheck.test(e.key)) {
      setProjectNameMaxLength(true);
      e.stopPropagation();
    } else {
      setProjectNameMaxLength(false);
    }
  };

  const handleOutputPathChange = (
    e: React.SyntheticEvent<HTMLInputElement>
  ) => {
    const element = e.currentTarget as HTMLInputElement;
    updateOutputPath(element.value);
  };
  const handleSaveClick = () => {
    vscode.postMessage({
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
          handleKeyDown={validateKey}
          ariaLabel={props.intl.formatMessage(messages.ariaProjectNameLabel)}
          value={projectName}
          maxLength={PROJECT_NAME_CHARACTER_LIMIT}
          autoFocus={true}
        />
        {projectNameValidation.error && (
          <div className={styles.errorMessage}>
            {props.intl.formatMessage(
              projectNameValidation.error as FormattedMessage.MessageDescriptor
            )}
          </div>
        )}
        {projectNameMaxLength && (
          <div className={styles.errorMessage}>
            {props.intl.formatMessage(
              messages.nameTooLong as FormattedMessage.MessageDescriptor,
              { maxLength: PROJECT_NAME_CHARACTER_LIMIT }
            )}
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
            value={outputPath}
            validation={projectPathValidation}
            isEmpty={projectPathValidation && outputPath.length === 0}
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
