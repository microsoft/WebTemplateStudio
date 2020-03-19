import * as React from "react";
import { injectIntl, InjectedIntlProps } from "react-intl";
import styles from "./styles.module.css";
import classNames from "classnames";
import messages from "./messages";
import { getProjectName } from "../../../selectors/wizardSelectionSelector/wizardSelectionSelector";
import { ReactComponent as Spinner } from "../../../assets/spinner.svg";
import { ReactComponent as GreenCheck } from "../../../assets/checkgreen.svg";
import { ValidateCosmosName, GetValidCosmosName } from "../../../utils/extensionService/extensionService";
import { connect } from "react-redux";
import { AppState } from "../../../reducers";
import { getVSCodeApiSelector } from "../../../selectors/vscodeApiSelector";
import { IVSCodeObject } from "../../../reducers/vscodeApiReducer";

interface IProps {
  subscription: string;
  cosmosName: string;
  onCosmosNameChange(newCosmosName: string): void;
  onIsAvailableCosmosNameChange(isAvailable: boolean): void;
}

interface IStateProps {
  vscode: IVSCodeObject;
  projectName: string;
}

type Props = IProps & IStateProps & InjectedIntlProps;

const CosmosNameEditor = ({
  intl,
  projectName,
  vscode,
  subscription,
  cosmosName,
  onCosmosNameChange,
  onIsAvailableCosmosNameChange,
}: Props) => {
  const [invalidCosmosNameMessage, setInvalidCosmosNameMessage] = React.useState("");
  const [isValidatingName, setIsValidatingName] = React.useState(false);

  React.useEffect(() => {
    if (isValidSubscription() && cosmosName === "") {
      GetValidCosmosName(projectName, vscode)
      .then(event => onCosmosNameChange(event.data.payload.validName));
    }
  }, [subscription]);

  React.useEffect(() => {
    onIsAvailableCosmosNameChange(false);
    if (cosmosName !== "") {
      setIsValidatingName(true);
      setTimeout(() => {
        ValidateCosmosName(subscription, cosmosName, vscode).then(event => {
          setInvalidCosmosNameMessage(event.data.payload.errorMessage);
          onIsAvailableCosmosNameChange(event.data.payload.isValid);
          setIsValidatingName(false);
        });
      }, 700);
    }
  }, [cosmosName]);

  const isValidSubscription = (): boolean => {
    return subscription !== "" && subscription !== "Select...";
  };

  return (
    <div
      className={classNames(styles.container, {
        [styles.containerDisabled]: !isValidSubscription(),
      })}
    >
      <div className={styles.title}>
        {intl.formatMessage(messages.title)}
      </div>
      <div className={styles.subtitle}>
        {intl.formatMessage(messages.subtitle)}
      </div>
        <div className={styles.inputContainer}>
          <input
            aria-label={intl.formatMessage(messages.ariaInputLabel)}
            placeholder={intl.formatMessage(messages.inputPlaceholderMessage)}
            className={styles.input}
            value={cosmosName}
            onChange={e => onCosmosNameChange(e.currentTarget.value)}
            disabled={!isValidSubscription()}
          />
          {cosmosName !== "" && invalidCosmosNameMessage === "" && !isValidatingName && (
            <GreenCheck className={styles.validationIcon} />
          )}
          {isValidatingName && <Spinner className={styles.spinner} />}
        </div>
        {cosmosName !== "" && !isValidatingName && invalidCosmosNameMessage && (
          <div className={styles.errorMessage}>{invalidCosmosNameMessage}</div>
        )}
    </div>
  );
};

const mapStateToProps = (state: AppState): IStateProps => ({
  vscode: getVSCodeApiSelector(state),
  projectName: getProjectName(state),
});

export default connect(mapStateToProps)(injectIntl(CosmosNameEditor));
