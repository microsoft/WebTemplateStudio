import * as React from "react";
import { connect, useDispatch } from "react-redux";
import Input from "../../../components/Input";
import OutputPath from "../../../components/OutputPath";

import {
  getOutputPath,
  getProjectName,
  getProjectNameValidation,
  getOutputPathValidation,
  getValidations
} from "../../../store/userSelection/app/wizardSelectionSelector/wizardSelectionSelector";

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

import { AppState } from "../../../store/combineReducers";
import { validateProjectName} from "../../../utils/validations/projectName/projectName";
import { IValidation} from "../../../utils/validations/validations";
import { inferProjectName} from "../../../utils/infer/projectName";
import messages from "./messages";
import { getOutputPath as getOutputPathFromExtension } from "../../../utils/extensionService/extensionService";
import { setProjectPathValidationAction } from "../../../store/config/validations/action";
import { setProjectNameAction, setOutputPathAction } from "../../../store/userSelection/app/action";
import { IValidations } from "../../../store/config/validations/model";
import { AppContext } from "../../../AppContext";

interface IStateProps {
  outputPath: string;
  projectName: string;
  projectPathValidation: IValidation;
  projectNameValidation: IValidation;
  validations: IValidations;
}

type Props = IStateProps & InjectedIntlProps;

const ProjectNameAndOutput = (props: Props) => {
  const {
    outputPath,
    projectPathValidation,
    projectName,
    validations,
    projectNameValidation
  } = props;

  const dispatch = useDispatch();
  const { vscode } = React.useContext(AppContext);
  
  React.useEffect(() => {
    if (projectName==="" && outputPath!=="" && projectNameValidation.isDirty===false){
      inferProjectName(outputPath, vscode).then(suggestedProjectName => {
        dispatch(setProjectNameAction(suggestedProjectName, {isValid:true, error:"", isDirty:true}));
      });
    }
  },[projectName, outputPath]);

  React.useEffect(() => {
    if (outputPath === "") {
      getOutputPathFromExtension(vscode).then((event)=>{
        const message = event.data;
        if (message.payload !== null && message.payload.outputPath !== null) {
          dispatch(setOutputPathAction(message.payload.outputPath));
        }
      })
    }
  }, [vscode]);

  const validateSetProjectValueAndSetDirty = (projectNameToSet: string) =>{
    validateProjectName(projectNameToSet, outputPath, validations.projectNameValidationConfig, vscode).then((validateState: IValidation)=>{
      validateState.isDirty = projectNameValidation.isDirty;
      dispatch(setProjectNameAction(projectNameToSet, validateState));
    });

    if (projectNameToSet!==""){
      dispatch(setProjectPathValidationAction({isValid: true}));
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
  outputPath: getOutputPath(state),
  projectName: getProjectName(state),
  validations: getValidations(state),
  projectPathValidation: getOutputPathValidation(state),
  projectNameValidation: getProjectNameValidation(state)
});

export default connect(
  mapStateToProps
)(injectIntl(ProjectNameAndOutput));