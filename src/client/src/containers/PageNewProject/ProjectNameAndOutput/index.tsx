import * as React from "react";
import { connect } from "react-redux";

import Input from "../../../components/Input";
import OutputPath from "../../../components/OutputPath";

import {
  getOutputPath,
  getProjectName,
  getProjectNameValidation,
  getOutputPathValidation,
  getValidations
} from "../../../store/selection/app/wizardSelectionSelector/wizardSelectionSelector";

import { IVSCodeObject } from "../../../store/vscode/vscodeApiReducer";
import {
  EXTENSION_COMMANDS,
  EXTENSION_MODULES,
  PROJECT_NAME_CHARACTER_LIMIT
} from "../../../utils/constants";

import styles from "./styles.module.css";

import {
  injectIntl,
  InjectedIntlProps
} from "react-intl";

import { getVSCodeApiSelector } from "../../../store/vscode/vscodeApiSelector";
import { AppState } from "../../../store/combineReducers";
import { Dispatch } from "redux";
import RootAction from "../../../store/ActionType";
import { validateProjectName} from "../../../utils/validations/projectName/projectName";
import { IValidation} from "../../../utils/validations/validations";
import { inferProjectName} from "../../../utils/infer/projectName";
import messages from "./messages";
import { getOutputPath as getOutputPathFromExtension } from "../../../utils/extensionService/extensionService";
import { setProjectPathValidationAction } from "../../../store/selection/validations/action";
import { setProjectNameAction, setOutputPathAction } from "../../../store/selection/app/action";
import { IValidations } from "../../../store/selection/validations/setValidations";

interface IStateProps {
  vscode: IVSCodeObject;
  outputPath: string;
  projectName: string;
  projectPathValidation: IValidation;
  projectNameValidation: IValidation;
  validations: IValidations;
}

interface IDispatchProps {
  updateProjectName: (projectName: string, validation: any) => any;
  updateOutputPath: (outputPath: string) => any;
  setProjectPathValidationAction: (validation: any) => void;
}

type Props = IStateProps & IDispatchProps & InjectedIntlProps;

const ProjectNameAndOutput = (props: Props) => {
  const {
    vscode,
    outputPath,
    projectPathValidation,
    projectName,
    validations,
    updateProjectName,
    updateOutputPath,
    setProjectPathValidationAction,
    projectNameValidation
  } = props;

  React.useEffect(() => {
    if (projectName==="" && outputPath!=="" && projectNameValidation.isDirty===false){
      inferProjectName(outputPath,vscode).then(suggestedProjectName => {
        updateProjectName(suggestedProjectName, {isValid:true, error:"", isDirty:true});
      });
    }
  },[projectName, outputPath]);

  React.useEffect(() => {
    if (outputPath === "") {
      getOutputPathFromExtension(vscode).then((event)=>{
        const message = event.data;
        if (message.payload !== null && message.payload.outputPath !== null) {
          updateOutputPath(message.payload.outputPath);
        }
      })
    }
  }, [vscode]);

  const validateSetProjectValueAndSetDirty = (projectNameToSet: string) =>{
    validateProjectName(projectNameToSet, outputPath, validations.projectNameValidationConfig, vscode).then((validateState: IValidation)=>{
      validateState.isDirty = projectNameValidation.isDirty;
      updateProjectName(projectNameToSet, validateState);
    });

    if (projectNameToSet!==""){
      setProjectPathValidationAction({isValid: true});
    }
  }
  const handleProjectNameChange = (
    e: React.SyntheticEvent<HTMLInputElement>
  ) => {
    const element = e.currentTarget as HTMLInputElement;
    validateSetProjectValueAndSetDirty(element.value);
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
          ariaLabel={props.intl.formatMessage(messages.ariaProjectNameLabel)}
          value={projectName}
          maxLength={PROJECT_NAME_CHARACTER_LIMIT}
          autoFocus={true}
        />

        {!projectNameValidation.isValid && projectNameValidation.isDirty && (
          <div className={styles.errorMessage}>
            {props.intl.formatMessage(projectNameValidation.error) }
          </div>
        )}
      </div>
      <div className={styles.inputContainer}>
        <div className={styles.inputTitle}>
          {props.intl.formatMessage(messages.outputPathTitle)}
        </div>
        <div>
          <OutputPath
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
  validations: getValidations(state),
  projectPathValidation: getOutputPathValidation(state),
  projectNameValidation: getProjectNameValidation(state)
});

const mapDispatchToProps = (
  dispatch: Dispatch<RootAction>
): IDispatchProps => ({
  updateProjectName: (projectName: string, validate: any) => {
    dispatch(setProjectNameAction(projectName, validate));
  },
  updateOutputPath: (outputPath: string) => {
    dispatch(setOutputPathAction(outputPath));
  },
  setProjectPathValidationAction: (validation: any) => {
    dispatch(setProjectPathValidationAction(validation));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(injectIntl(ProjectNameAndOutput));
