import * as React from "react";
import { injectIntl, InjectedIntlProps } from "react-intl";
import styles from "../styles.module.css";
import classNames from "classnames";

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

interface IMapStateProps {
  vscode: IVSCodeObject;
  savedAppServiceSelection: ISelectedAppService | null;
}
interface IStateProps {
  subscription: string;
  projectName: string;
  onIsValidatingName(isValidating: boolean): void;
  onChangeAppName(newAppName: { isValid: boolean; value: string }): void;
}

type Props = IStateProps & IMapStateProps & InjectedIntlProps;

const AppName = ({
  intl,
  subscription,
  projectName,
  onIsValidatingName,
  onChangeAppName,
  vscode,
  savedAppServiceSelection,
}: Props) => {
  const [appName, setAppName] = React.useState("");
  const [invalidAppNameMessage, setInvalidAppNameMessage] = React.useState("");
  const [isValidatingName, setIsValidatingName] = React.useState(false);

  React.useEffect(() => {
    if (savedAppServiceSelection) {
      setAppName(savedAppServiceSelection.siteName);
    }
  }, []);

  React.useEffect(() => {
    if (subscription !== "" && appName === "") {
      GetValidAppServiceName(projectName, vscode).then(event => setAppName(event.data.payload.validName));
    }
  }, [subscription]);

  React.useEffect(() => {
    setIsValidatingName(true);
    setTimeout(() => {
      ValidateAppServiceName(subscription, appName, vscode).then(event => {
        const message = event.data.payload.reason ? event.data.payload.reason : "";
        setInvalidAppNameMessage(message);
        onChangeAppName({ isValid: event.data.payload.isAvailable, value: appName });
        setIsValidatingName(false);
      });
    }, 700);
  }, [appName]);

  React.useEffect(() => onIsValidatingName(isValidatingName), [isValidatingName]);

  return (
    <div
      className={classNames(styles.selectionContainer, {
        [styles.selectionContainerDisabled]: subscription === "",
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
            disabled={subscription === ""}
          />
          {subscription && invalidAppNameMessage.length === 0 && !isValidatingName && (
            <GreenCheck className={styles.validationIcon} />
          )}
          {subscription && isValidatingName && <Spinner className={styles.spinner} />}
        </div>
        {!isValidatingName && appName && appName.length > 0 && invalidAppNameMessage && (
          <div className={styles.errorMessage}>{invalidAppNameMessage}</div>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = (state: AppState): IMapStateProps => ({
  vscode: getVSCodeApiSelector(state),
  savedAppServiceSelection: getAppServiceSelectionSelector(state),
});

export default connect(mapStateToProps)(injectIntl(AppName));
