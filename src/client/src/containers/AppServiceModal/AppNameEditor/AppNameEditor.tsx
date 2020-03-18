import * as React from "react";
import { injectIntl, InjectedIntlProps } from "react-intl";
import styles from "../styles.module.css";
import classNames from "classnames";

import { getProjectName } from "../../../selectors/wizardSelectionSelector/wizardSelectionSelector";
import { ReactComponent as Spinner } from "../../../assets/spinner.svg";
import { ReactComponent as GreenCheck } from "../../../assets/checkgreen.svg";
import { azureMessages as azureModalMessages } from "../../../mockData/azureServiceOptions";
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
    if (isValidSubscription() && appName === "") {
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

  const isValidSubscription = (): boolean => {
    return subscription !== "" && subscription !== "Select...";
  };

  return (
    <div
      className={classNames(styles.selectionContainer, {
        [styles.selectionContainerDisabled]: !isValidSubscription(),
      })}
    >
      <div className={styles.selectionHeaderContainer}>
        <div className={styles.leftHeader}>{intl.formatMessage(azureModalMessages.appServiceAppNameLabel)}</div>
      </div>
      <div className={styles.subLabel}>{intl.formatMessage(azureModalMessages.appServiceAppNameSubLabel)}</div>
      <div className={styles.errorStack}>
        <div className={styles.inputContainer}>
          <input
            aria-label={intl.formatMessage(azureModalMessages.appServiceAriaAppNameLabel)}
            placeholder={intl.formatMessage(azureModalMessages.appServiceAppNameLabel)}
            className={styles.input}
            value={appName}
            onChange={e => onAppNameChange(e.currentTarget.value)}
            disabled={!isValidSubscription()}
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
    </div>
  );
};

const mapStateToProps = (state: AppState): IStateProps => ({
  vscode: getVSCodeApiSelector(state),
  projectName: getProjectName(state),
});

export default connect(mapStateToProps)(injectIntl(AppNameEditor));
