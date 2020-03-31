import * as React from "react";
import { injectIntl, InjectedIntlProps } from "react-intl";
import styles from "./styles.module.css";
import classNames from "classnames";
import messages from "./messages";
import { getProjectName } from "../../../store/selection/app/wizardSelectionSelector/wizardSelectionSelector";
import { ReactComponent as Spinner } from "../../../assets/spinner.svg";
import { ReactComponent as GreenCheck } from "../../../assets/checkgreen.svg";
import { ValidateCosmosAccountName, GetValidCosmosAccountName } from "../../../utils/extensionService/extensionService";
import { useSelector } from "react-redux";
import { AppState } from "../../../store/combineReducers";
import { AppContext } from "../../../AppContext";
import { IVSCodeObject } from "../../../store/vscode/model";

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
  const vscode: IVSCodeObject = React.useContext(AppContext).vscode;
  const projectName = useSelector((state: AppState) => getProjectName(state));
  const [invalidAccountNameMessage, setInvalidAccountNameMessage] = React.useState("");
  const [isValidatingName, setIsValidatingName] = React.useState(false);

  React.useEffect(() => {
    if (isValidSubscription() && accountName === "") {
      GetValidCosmosAccountName(projectName, vscode).then(event => onAccountNameChange(event.data.payload.validName));
    }
  }, [subscription]);

  React.useEffect(() => {
    onIsAvailableAccountNameChange(false);
    if (accountName !== "") {
      setIsValidatingName(true);
      delayValidation(() =>{
        validationCosmosDbAccountNameScopeId++;
        ValidateCosmosAccountName(subscription, accountName, validationCosmosDbAccountNameScopeId, vscode).then(event => {
          if(validationCosmosDbAccountNameScopeId === event.data.payload.scope)
          {
            setInvalidAccountNameMessage(event.data.payload.errorMessage);
            onIsAvailableAccountNameChange(event.data.payload.isValid);
            setIsValidatingName(false);
          }
        });
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
  }

  const isValidSubscription = (): boolean => {
    return subscription !== "" && subscription !== "Select...";
  };

  return (
    <div
      className={classNames(styles.container, {
        [styles.containerDisabled]: !isValidSubscription(),
      })}
    >
      <div className={styles.title}>{formatMessage(messages.title)}</div>
      <div className={styles.subtitle}>{formatMessage(messages.subtitle)}</div>
      <div className={styles.inputContainer}>
        <input
          aria-label={formatMessage(messages.ariaInputLabel)}
          placeholder={formatMessage(messages.inputPlaceholderMessage)}
          className={styles.input}
          value={accountName}
          onChange={e => onAccountNameChange(e.currentTarget.value)}
          disabled={!isValidSubscription()}
        />
        {accountName !== "" && invalidAccountNameMessage === "" && !isValidatingName && (
          <GreenCheck className={styles.validationIcon} />
        )}
        {isValidatingName && <Spinner className={styles.spinner} />}
      </div>
      {accountName !== "" && !isValidatingName && invalidAccountNameMessage !== "" && (
        <div className={styles.errorMessage}>{invalidAccountNameMessage}</div>
      )}
    </div>
  );
};

export default injectIntl(AccountNameEditor);
