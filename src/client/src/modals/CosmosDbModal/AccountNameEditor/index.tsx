import classNames from "classnames";
import * as React from "react";
import { InjectedIntlProps, injectIntl } from "react-intl";
import { useSelector } from "react-redux";

import { AppContext } from "../../../AppContext";
import { ReactComponent as GreenCheck } from "../../../assets/checkgreen.svg";
import { ReactComponent as Spinner } from "../../../assets/spinner.svg";
import modalStyles from "../../../css/modal.module.css";
import { AppState } from "../../../store/combineReducers";
import { getProjectName } from "../../../store/userSelection/app/wizardSelectionSelector/wizardSelectionSelector";
import { GetValidCosmosAccountName, ValidateCosmosAccountName } from "../../../utils/extensionService/extensionService";
import messages from "./messages";
import styles from "./styles.module.css";

let timeout: NodeJS.Timeout | undefined;
let validationCosmosDbAccountNameScopeId = 0;

interface IProps {
  subscription: string;
  accountName: string;
  onAccountNameChange(newAccountName: string): void;
  onIsAvailableAccountNameChange(isAvailable: boolean): void;
}

type Props = IProps & InjectedIntlProps;

const AccountNameEditor = ({
  intl,
  subscription,
  accountName,
  onAccountNameChange,
  onIsAvailableAccountNameChange,
}: Props) => {
  const { formatMessage } = intl;
  const { vscode } = React.useContext(AppContext);
  const projectName = useSelector((state: AppState) => getProjectName(state));
  const [invalidAccountNameMessage, setInvalidAccountNameMessage] = React.useState("");
  const [isValidatingName, setIsValidatingName] = React.useState(false);

  React.useEffect(() => {
    if (isValidSubscription() && accountName === "") {
      GetValidCosmosAccountName(projectName, vscode).then((event) => onAccountNameChange(event.data.payload.validName));
    }
  }, [subscription]);

  React.useEffect(() => {
    onIsAvailableAccountNameChange(false);
    if (accountName !== "") {
      setIsValidatingName(true);
      delayValidation(() => {
        validationCosmosDbAccountNameScopeId++;
        ValidateCosmosAccountName(subscription, accountName, validationCosmosDbAccountNameScopeId, vscode).then(
          (event) => {
            if (validationCosmosDbAccountNameScopeId === event.data.payload.scope) {
              setInvalidAccountNameMessage(event.data.payload.errorMessage);
              onIsAvailableAccountNameChange(event.data.payload.isValid);
              setIsValidatingName(false);
            }
          }
        );
      });
    }
  }, [accountName]);

  const delayValidation = (validation: () => void) => {
    if (timeout) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(() => {
      timeout = undefined;
      validation();
    }, 700);
  };

  const isValidSubscription = (): boolean => {
    return subscription !== "" && subscription !== "Select...";
  };

  return (
    <div
      className={classNames(styles.container, {
        [styles.containerDisabled]: !isValidSubscription(),
      })}
    >
      <div className={modalStyles.title}>{formatMessage(messages.title)}</div>
      <div className={modalStyles.subtitle}>{formatMessage(messages.subtitle)}</div>
      <div className={styles.inputContainer}>
        <input
          aria-label={formatMessage(messages.ariaInputLabel)}
          placeholder={formatMessage(messages.inputPlaceholderMessage)}
          className={styles.input}
          value={accountName}
          onChange={(e) => onAccountNameChange(e.currentTarget.value)}
          disabled={!isValidSubscription()}
        />
        {accountName !== "" && invalidAccountNameMessage === "" && !isValidatingName && (
          <GreenCheck data-testid="green-check" className={styles.validationIcon} />
        )}
        {isValidatingName && <Spinner data-testid="spinner" className={styles.spinner} />}
      </div>
      {accountName !== "" && !isValidatingName && invalidAccountNameMessage !== "" && (
        <div data-testid="error-message" className={styles.errorMessage}>
          {invalidAccountNameMessage}
        </div>
      )}
    </div>
  );
};

export default injectIntl(AccountNameEditor);
