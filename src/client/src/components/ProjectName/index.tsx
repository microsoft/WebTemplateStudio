import * as React from "react";
import { connect, useDispatch, useSelector } from "react-redux";

import {
  getOutputPath,
  getProjectName,
  getProjectNameValidation,
  getValidations
} from "../../store/userSelection/app/wizardSelectionSelector/wizardSelectionSelector";

import {
  PROJECT_NAME_CHARACTER_LIMIT
} from "../../utils/constants/constants";

import styles from "./styles.module.css";

import {
  injectIntl,
  InjectedIntlProps
} from "react-intl";

import { validateProjectName} from "../../utils/validations/projectName/projectName";
import { IValidation} from "../../utils/validations/validations";
import { inferProjectName} from "../../utils/infer/projectName";
import messages from "./messages";
import { setProjectPathValidationAction } from "../../store/config/validations/action";
import { setProjectNameAction } from "../../store/userSelection/app/action";
import { AppContext } from "../../AppContext";
import stylesInput from "../../css/input.module.css";
import classnames from "classnames";

type Props = InjectedIntlProps;

const ProjectName = (props: Props) => {
  const outputPath = useSelector(getOutputPath);
  const projectName = useSelector(getProjectName);
  const validations = useSelector(getValidations);
  const projectNameValidation = useSelector(getProjectNameValidation);
  const dispatch = useDispatch();
  const { vscode } = React.useContext(AppContext);
  const [name, setName] = React.useState("");
  const [hasFocus, setHasFocus] = React.useState(false);
  const onFocus = () => setHasFocus(true);
  const onBlur = () => setHasFocus(false);

  React.useEffect(()=>{
    setName(projectName);
  },[]);

  React.useEffect(() => {
    if (projectName==="" && outputPath!=="" && projectNameValidation.isDirty===false){
      inferProjectName(outputPath, vscode).then(suggestedProjectName => {
        dispatch(setProjectNameAction(suggestedProjectName, {isValid:true, error:"", isDirty:true}));
        setName(suggestedProjectName);
      });
    }
  },[projectName, outputPath]);

  React.useEffect(() => {
    if (projectName !== name){
      setName(projectName);
    }
  },[projectName]);

  const validateSetProjectValueAndSetDirty = (e: React.SyntheticEvent<HTMLInputElement>) => {
    const projectNameToSet: string = e.currentTarget.value;
    setName(projectNameToSet);
    validateProjectName(projectNameToSet, outputPath, validations.projectNameValidationConfig, vscode).then((validateState: IValidation)=>{
      validateState.isDirty = projectNameValidation.isDirty;
      dispatch(setProjectNameAction(projectNameToSet, validateState));
    });

    if (projectNameToSet!==""){
      dispatch(setProjectPathValidationAction({isValid: true}));
    }
  }

  return (
    <React.Fragment>
      <input
        onChange={validateSetProjectValueAndSetDirty}
        aria-label={props.intl.formatMessage(messages.ariaProjectNameLabel)}
        value={name}
        maxLength={PROJECT_NAME_CHARACTER_LIMIT}
        className={classnames(stylesInput.input)}
        onFocus={onFocus}
        onBlur={onBlur}
      />

      {!projectNameValidation.isValid && projectNameValidation.isDirty && hasFocus && (
        <div className={styles.errorMessage}>
          {props.intl.formatMessage(projectNameValidation.error) }
        </div>
      )}
    </React.Fragment>
  );
};

export default injectIntl(ProjectName);