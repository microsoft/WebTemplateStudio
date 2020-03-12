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
import { getAppServiceSelectionSelector } from "../../../selectors/appServiceSelector";
import { IVSCodeObject } from "../../../reducers/vscodeApiReducer";
import { ISelectedAppService } from "../../../reducers/wizardSelectionReducers/services/appServiceReducer";
import { AppServiceContext } from "../AppServiceContext";

interface IStateProps {
  vscode: IVSCodeObject;
  savedAppServiceSelection: ISelectedAppService | null;
  projectName: string;
}

type Props = IStateProps & InjectedIntlProps;

const AppNameEditor = ({ intl, projectName, vscode, savedAppServiceSelection }: Props) => {
  const { subscription, appName, setAppName, setIsAvailableAppName } = React.useContext(AppServiceContext);
  const [invalidAppNameMessage, setInvalidAppNameMessage] = React.useState("");
  const [isValidatingName, setIsValidatingName] = React.useState(false);

  React.useEffect(() => {
    if (savedAppServiceSelection) {
      setAppName(savedAppServiceSelection.siteName);
    }
  }, []);

  React.useEffect(() => {
    if (isValidSubscription() && appName === "") {
      GetValidAppServiceName(projectName, vscode).then(event => setAppName(event.data.payload.validName));
    }
  }, [subscription]);

  React.useEffect(() => {
    setIsAvailableAppName(false);
    if (appName !== "") {
      setIsValidatingName(true);
      setTimeout(() => {
        ValidateAppServiceName(subscription.value, appName, vscode).then(event => {
          const isAvailable = event.data.payload.isAvailable;
          const message = event.data.payload.reason ? event.data.payload.reason : "";
          setInvalidAppNameMessage(message);
          setIsAvailableAppName(isAvailable);
          setIsValidatingName(false);
        });
      }, 700);
    }
  }, [appName]);

  const isValidSubscription = (): boolean => {
    return subscription && subscription.value !== "" && subscription.value !== "Select...";
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
            onChange={e => setAppName(e.currentTarget.value)}
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
  savedAppServiceSelection: getAppServiceSelectionSelector(state),
  projectName: getProjectName(state),
});

export default connect(mapStateToProps)(injectIntl(AppNameEditor));
