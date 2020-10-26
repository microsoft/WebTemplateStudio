import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import { injectIntl, InjectedIntlProps } from "react-intl";

import * as wizardSelectionSelector from "../../../store/userSelection/app/wizardSelectionSelector/wizardSelectionSelector";
import { setProjectPathValidationAction } from "../../../store/config/validations/action";
import { setProjectNameAction } from "../../../store/userSelection/app/action";

import { validateProjectName } from "../../../utils/validations/projectName/projectName";
import { PROJECT_NAME_CHARACTER_LIMIT } from "../../../utils/constants/constants";
import { inferProjectName } from "../../../utils/infer/projectName";

import { AppContext } from "../../../AppContext";

import classnames from "classnames";
import stylesInput from "../../../css/input.module.css";
import styles from "./styles.module.css";
import messages from "./messages";
import rightsidebarStyles from "../../RightSidebar/rightsidebarStyles.module.css";

interface IProps {
  rightsidebar?: boolean;
}

type Props = IProps & InjectedIntlProps;

const ProjectName = (props: Props) => {
  const { formatMessage } = props.intl;
  const dispatch = useDispatch();

  const { vscode } = React.useContext(AppContext);

  const outputPath = useSelector(wizardSelectionSelector.getOutputPath);
  const projectName = useSelector(wizardSelectionSelector.getProjectName);
  const validations = useSelector(wizardSelectionSelector.getValidations);
  const projectNameValidation = useSelector(wizardSelectionSelector.getProjectNameValidation);

  const [name, setName] = React.useState("");

  const validate = (projectName: string) =>{
      validateProjectName(projectName, outputPath, validations.projectNameValidationConfig, vscode).then(
        (validationResult) => {
          validationResult.isDirty = projectNameValidation.isDirty;
          dispatch(setProjectNameAction(projectName, validationResult));

          if (projectName !== "") {
            dispatch(setProjectPathValidationAction({ isValid: validationResult.isValid }));
          }
        }
      );
  }

  const validateAndSetProjectName = (e: React.SyntheticEvent<HTMLInputElement>) => {
    const newProjectName: string = e.currentTarget.value;
    setName(newProjectName);
    validate(newProjectName);
  };

  React.useEffect(() => {
    if (projectName === "" && outputPath !== "" && projectNameValidation.isDirty === false) {
      inferProjectName(outputPath, vscode).then((suggestedProjectName) => {
        dispatch(setProjectNameAction(suggestedProjectName, { isValid: true, error: "", isDirty: true }));
        setName(suggestedProjectName);
      });
    } else {
      if (projectName === name && projectNameValidation.isDirty === true) {
        validate(projectName);
      }
    }
  }, [projectName, outputPath]);

  React.useEffect(() => {
    if (projectName !== name) {
      setName(projectName);
    }
  }, [projectName]);

  return (
    <div className={props.rightsidebar ? rightsidebarStyles.inputContainer : styles.inputContainer}>
      <div className={props.rightsidebar ? rightsidebarStyles.title : styles.inputTitle}>
        {formatMessage(messages.projectNameTitle)}
      </div>

      <div>
        <input
          onChange={validateAndSetProjectName}
          aria-label={formatMessage(messages.ariaProjectNameLabel)}
          value={name}
          maxLength={PROJECT_NAME_CHARACTER_LIMIT}
          className={classnames(stylesInput.input, !projectNameValidation.isValid ? styles.error : "")}
        />

        {!projectNameValidation.isValid && projectNameValidation.isDirty && (
          <div className={styles.errorMessage}>{formatMessage(projectNameValidation.error)}</div>
        )}
      </div>
    </div>
  );
};

export default injectIntl(ProjectName);
