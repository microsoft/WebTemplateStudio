import classnames from "classnames";
import * as React from "react";
import { InjectedIntlProps, injectIntl } from "react-intl";
import { useDispatch, useSelector } from "react-redux";

import { AppContext } from "../../../AppContext";
import stylesInput from "../../../css/input.module.css";
import { setProjectPathValidationAction } from "../../../store/config/validations/action";
import { setProjectNameAction } from "../../../store/userSelection/app/action";
import * as wizardSelectionSelector from "../../../store/userSelection/app/wizardSelectionSelector/wizardSelectionSelector";
import { PROJECT_NAME_CHARACTER_LIMIT } from "../../../utils/constants/constants";
import { inferProjectName } from "../../../utils/infer/projectName";
import { validateProjectName } from "../../../utils/validations/projectName/projectName";
import rightsidebarStyles from "../../RightSidebar/rightsidebarStyles.module.css";
import InputTitle from "../../Titles/TitleForInput";
import messages from "./messages";
import styles from "./styles.module.css";

interface IProps {
  isRightsidebar?: boolean;
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

  const validate = (projectName: string) => {
    validateProjectName(projectName, outputPath, validations.projectNameValidationConfig, vscode).then(
      (validationResult) => {
        validationResult.isDirty = projectNameValidation.isDirty;
        dispatch(setProjectNameAction(projectName, validationResult));

        if (projectName !== "") {
          dispatch(setProjectPathValidationAction({ isValid: validationResult.isValid }));
        }
      }
    );
  };

  const validateAndSetProjectName = (e: React.SyntheticEvent<HTMLInputElement>) => {
    const newProjectName: string = e.currentTarget.value;
    setName(newProjectName);
    validate(newProjectName);
  };

  React.useEffect(() => {
    if (projectName === "" && outputPath !== "" && projectNameValidation.isDirty === false) {
      inferProjectName(outputPath, vscode).then((suggestedProjectName) => {
        dispatch(setProjectNameAction(suggestedProjectName, { isValid: true, isDirty: true }));
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
    <div className={props.isRightsidebar ? rightsidebarStyles.inputContainer : styles.inputContainer}>
      <InputTitle>{formatMessage(messages.projectNameTitle)}</InputTitle>

      <div>
        <input
          onChange={validateAndSetProjectName}
          aria-label={formatMessage(messages.ariaProjectNameLabel)}
          value={name}
          maxLength={PROJECT_NAME_CHARACTER_LIMIT}
          className={classnames(stylesInput.input, !projectNameValidation.isValid ? styles.error : "")}
        />

        {!projectNameValidation.isValid && projectNameValidation.isDirty && (
          <div className={styles.errorMessage}>
            {projectNameValidation.error ? formatMessage(projectNameValidation.error) : ""}
          </div>
        )}
      </div>
    </div>
  );
};

export default injectIntl(ProjectName);
