import * as React from "react";
import { injectIntl, InjectedIntlProps } from "react-intl";
import styles from "./styles.module.css";
import classNames from "classnames";
import messages from "./messages";
import { getProjectName } from "../../../store/userSelection/app/wizardSelectionSelector/wizardSelectionSelector";
import { ReactComponent as Spinner } from "../../../assets/spinner.svg";
import { ReactComponent as GreenCheck } from "../../../assets/checkgreen.svg";
import { ValidateAppServiceName, GetValidAppServiceName } from "../../../utils/extensionService/extensionService";
import { useSelector } from "react-redux";
import { AppState } from "../../../store/combineReducers";
import { AppContext } from "../../../AppContext";

let timeout: NodeJS.Timeout | undefined;
let validationAppServiceNameScopeId = 0;

interface IProps {
  subscription: string;
  appName: string;
  onAppNameChange(newAppName: string): void;
  onIsAvailableAppNameChange(isAvailable: boolean): void;
}

type Props = IProps & InjectedIntlProps;

const AppNameEditor = ({
  intl,
  subscription,
  appName,
  onAppNameChange,
  onIsAvailableAppNameChange,
}: Props) => {
  const {formatMessage} = intl;
  const {vscode} = React.useContext(AppContext);
  const projectName = useSelector((state: AppState) => getProjectName(state));
  const [invalidAppNameMessage, setInvalidAppNameMessage] = React.useState("");
  const [isValidatingName, setIsValidatingName] = React.useState(false);

  React.useEffect(() => {
    if (subscription !== "" && appName === "") {
      GetValidAppServiceName(projectName, vscode)
      .then(event => onAppNameChange(event.data.payload.validName));
    }
  }, [subscription]);

  React.useEffect(() => {
    onIsAvailableAppNameChange(false);
    if (appName !== "") {
      setIsValidatingName(true);
      delayValidation(() => {
        validationAppServiceNameScopeId++;
        ValidateAppServiceName(subscription, appName, validationAppServiceNameScopeId, vscode).then(event => {
         if(validationAppServiceNameScopeId === event.data.payload.scope)
         {
          setInvalidAppNameMessage(event.data.payload.errorMessage);
          onIsAvailableAppNameChange(event.data.payload.isValid);
          setIsValidatingName(false);
         }
      });
    });
    }
  }, [appName]);

  const delayValidation = (validation: () => void) => {
    if (timeout) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(() => {
      timeout = undefined;
      validation();
    }, 700);
  }

  return (
    <div
      className={classNames(styles.container, {
        [styles.containerDisabled]: subscription === "",
      })}
    >
      <div className={styles.title}>
        {formatMessage(messages.title)}
      </div>
      <div className={styles.subtitle}>
        {formatMessage(messages.subtitle)}
      </div>
        <div className={styles.inputContainer}>
          <input
            aria-label={formatMessage(messages.ariaInputLabel)}
            placeholder={formatMessage(messages.inputPlaceholderMessage)}
            className={styles.input}
            value={appName}
            onChange={e => onAppNameChange(e.currentTarget.value)}
            disabled={subscription === ""}
          />
          {appName !== "" && invalidAppNameMessage === "" && !isValidatingName && (
            <GreenCheck data-testid="green-check" className={styles.validationIcon} />
          )}
          {isValidatingName && <Spinner data-testid="spinner" className={styles.spinner} />}
        </div>
        {appName !== "" && !isValidatingName && invalidAppNameMessage !== "" && (
          <div data-testid="error-message" className={styles.errorMessage}>{invalidAppNameMessage}</div>
        )}
    </div>
  );
};

export default injectIntl(AppNameEditor);
