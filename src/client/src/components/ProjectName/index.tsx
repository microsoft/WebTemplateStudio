import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { injectIntl, InjectedIntlProps } from "react-intl";

import {
  getOutputPath,
  getProjectName,
  getProjectNameValidation,
  getValidations,
} from "../../store/userSelection/app/wizardSelectionSelector/wizardSelectionSelector";
import { setProjectPathValidationAction } from "../../store/config/validations/action";
import { setProjectNameAction } from "../../store/userSelection/app/action";

import { validateProjectName } from "../../utils/validations/projectName/projectName";
import { PROJECT_NAME_CHARACTER_LIMIT } from "../../utils/constants/constants";
import { IValidation } from "../../utils/validations/validations";
import { inferProjectName } from "../../utils/infer/projectName";

import { AppContext } from "../../AppContext";

import stylesInput from "../../css/input.module.css";
import styles from "./styles.module.css";
import messages from "./messages";

type Props = InjectedIntlProps;

const ProjectName = (props: Props) => {
  //#region CONSTANTS
  const { formatMessage } = props.intl;
  const outputPath = useSelector(getOutputPath);
  const projectName = useSelector(getProjectName);
  const validations = useSelector(getValidations);
  const projectNameValidation = useSelector(getProjectNameValidation);
  const dispatch = useDispatch();
  const { vscode } = React.useContext(AppContext);
  const [name, setName] = React.useState("");
  const [hasFocus, setHasFocus] = React.useState(false);
  const [validName, setValidName] = React.useState("");
  const onFocus = () => {
    setHasFocus(true);
    setValidName(name);
  };
  const onBlur = () => {
    setHasFocus(false);
    if (!projectNameValidation.isValid)
      setTimeout(() => {
        dispatch(setProjectNameAction(validName, { isValid: true, error: "", isDirty: true }));
      }, 400);
  };

  const validateSetProjectValueAndSetDirty = (e: React.SyntheticEvent<HTMLInputElement>) => {
    const projectNameToSet: string = e.currentTarget.value;
    setName(projectNameToSet);
    validateProjectName(projectNameToSet, outputPath, validations.projectNameValidationConfig, vscode).then(
      (validateState: IValidation) => {
        validateState.isDirty = projectNameValidation.isDirty;
        dispatch(setProjectNameAction(projectNameToSet, validateState));
      }
    );

    if (projectNameToSet !== "") {
      dispatch(setProjectPathValidationAction({ isValid: true }));
    }
  };

  //#endregion

  React.useEffect(() => {
    setName(projectName);
  }, []);

  React.useEffect(() => {
    if (projectName === "" && outputPath !== "" && projectNameValidation.isDirty === false) {
      inferProjectName(outputPath, vscode).then((suggestedProjectName) => {
        dispatch(setProjectNameAction(suggestedProjectName, { isValid: true, error: "", isDirty: true }));
        setName(suggestedProjectName);
      });
    }
  }, [projectName, outputPath]);

  React.useEffect(() => {
    if (projectName !== name) {
      setName(projectName);
    }
  }, [projectName]);

  return (
    <div className={styles.inputContainer}>
      <div className={styles.inputTitle}>{formatMessage(messages.projectNameTitle)}</div>

      <input
        onChange={validateSetProjectValueAndSetDirty}
        aria-label={formatMessage(messages.ariaProjectNameLabel)}
        value={name}
        maxLength={PROJECT_NAME_CHARACTER_LIMIT}
        className={stylesInput.input}
        onFocus={onFocus}
        onBlur={onBlur}
      />

      {!projectNameValidation.isValid && projectNameValidation.isDirty && hasFocus && (
        <div className={styles.errorMessage}>{formatMessage(projectNameValidation.error)}</div>
      )}
    </div>
  );
};

export default injectIntl(ProjectName);
