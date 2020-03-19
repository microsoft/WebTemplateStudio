import * as React from "react";
import { injectIntl, InjectedIntlProps } from "react-intl";
import styles from "./styles.module.css";
import classNames from "classnames";
import messages from "./messages";
import { getProjectName } from "../../../selectors/wizardSelectionSelector/wizardSelectionSelector";
import { ReactComponent as Spinner } from "../../../assets/spinner.svg";
import { ReactComponent as GreenCheck } from "../../../assets/checkgreen.svg";
import { ValidateAppServiceName, GetValidAppServiceName } from "../../../utils/extensionService/extensionService";
import { connect } from "react-redux";
import { AppState } from "../../../reducers";
import { getVSCodeApiSelector } from "../../../selectors/vscodeApiSelector";
import { IVSCodeObject } from "../../../reducers/vscodeApiReducer";

interface IProps {
  subscription: string;
  appName: string;
  onAppNameChange(newAppName: string): void;
  onIsAvailableAppNameChange(isAvailable: boolean): void;
}

interface IStateProps {
  vscode: IVSCodeObject;
  projectName: string;
}

type Props = IProps & IStateProps & InjectedIntlProps;

const AppNameEditor = ({
  intl,
  projectName,
  vscode,
  subscription,
  appName,
  onAppNameChange,
  onIsAvailableAppNameChange,
}: Props) => {
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
      setTimeout(() => {
        ValidateAppServiceName(subscription, appName, vscode).then(event => {
          setInvalidAppNameMessage(event.data.payload.errorMessage);
          onIsAvailableAppNameChange(event.data.payload.isValid);
          setIsValidatingName(false);
        });
      }, 700);
    }
  }, [appName]);

  return (
    <div
      className={classNames(styles.container, {
        [styles.containerDisabled]: subscription === "",
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
            value={appName}
            onChange={e => onAppNameChange(e.currentTarget.value)}
            disabled={subscription === ""}
          />
          {appName !== "" && invalidAppNameMessage === "" && !isValidatingName && (
            <GreenCheck className={styles.validationIcon} />
          )}
          {isValidatingName && <Spinner className={styles.spinner} />}
        </div>
        {appName !== "" && !isValidatingName && invalidAppNameMessage && (
          <div className={styles.errorMessage}>{invalidAppNameMessage}</div>
        )}
    </div>
  );
};

const mapStateToProps = (state: AppState): IStateProps => ({
  vscode: getVSCodeApiSelector(state),
  projectName: getProjectName(state),
});

export default connect(mapStateToProps)(injectIntl(AppNameEditor));
