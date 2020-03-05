import * as React from "react";
import { injectIntl, InjectedIntlProps } from "react-intl";
import styles from "../styles.module.css";
import classNames from "classnames";

import { ReactComponent as Spinner } from "../../../assets/spinner.svg";
import { ReactComponent as GreenCheck } from "../../../assets/checkgreen.svg";
import { azureMessages as azureModalMessages } from "../../../mockData/azureServiceOptions";

interface IStateProps {
  subscription: string;
  siteName: string;
  onSiteNameChange(newSiteName: string): void;
  isValidatingName: boolean;
  appNameInvalidMessage: string;
}

type Props = IStateProps & InjectedIntlProps;

const AppName = (props: Props) => {
  const {
    intl,
    subscription,
    siteName,
    onSiteNameChange,
    isValidatingName,
    appNameInvalidMessage
  } = props;

  const handleInput = (e: React.SyntheticEvent<HTMLInputElement>): void => {
    const newSiteName = e.currentTarget as HTMLInputElement;
    onSiteNameChange(newSiteName.value);
  };

  return (
    <div
      className={classNames(styles.selectionContainer, {
        [styles.selectionContainerDisabled]: subscription === ""
      })}
    >
      <div className={styles.selectionHeaderContainer}>
        <div className={styles.leftHeader}>
          {intl.formatMessage(azureModalMessages.appServiceAppNameLabel)}
        </div>
      </div>
      <div className={styles.subLabel}>
        {intl.formatMessage(azureModalMessages.appServiceAppNameSubLabel)}
      </div>
      <div className={styles.errorStack}>
        <div className={styles.inputContainer}>
          <input
            aria-label={intl.formatMessage(
              azureModalMessages.appServiceAriaAppNameLabel
            )}
            className={styles.input}
            onChange={handleInput}
            value={subscription === "" ? "" : siteName}
            placeholder={intl.formatMessage(
              azureModalMessages.appServiceAppNameLabel
            )}
            disabled={subscription === ""}
            tabIndex={subscription === "" ? -1 : 0}
          />
          {subscription && appNameInvalidMessage.length === 0 && !isValidatingName && (
            <GreenCheck className={styles.validationIcon} />
          )}
          {subscription && isValidatingName && (
            <Spinner className={styles.spinner} />
          )}
        </div>
        {!isValidatingName && siteName.length > 0 && appNameInvalidMessage && (
            <div className={styles.errorMessage}>
              {appNameInvalidMessage}
            </div>
          )}
      </div>
    </div>
  );
};
export default injectIntl(AppName);
