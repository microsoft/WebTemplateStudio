import * as React from "react";
import { injectIntl, InjectedIntlProps } from "react-intl";
import styles from "./styles.module.css";
import classNames from "classnames";
import { azureMessages as azureModalMessages } from "../../mockData/azureServiceOptions";
import Dropdown from "../../components/Dropdown";
import { IAppServiceState } from ".";

const DEFAULT_VALUE = {
  value: "Select...",
  label: "Select..."
};

interface IStateProps {
  appServiceFormData: IAppServiceState;
  appServiceData: IAppServiceState;
  handleDropdown(formSectionId: string, option: any): void;
}

type Props = IStateProps & InjectedIntlProps;

interface attributeLinks {
  [key: string]: string;
}
const links: attributeLinks = {
  subscription:
    "https://account.azure.com/signup?showCatalog=True&appId=SubscriptionsBlade"
};

const SubscriptionSelection = (props: Props) => {
  const { intl, handleDropdown, appServiceFormData, appServiceData } = props;

  const FORM_CONSTANTS = {
    SUBSCRIPTION: {
      label: intl.formatMessage(azureModalMessages.azureModalSubscriptionLabel),
      value: "subscription"
    }
  };

  const getDropdownSection = (
    leftHeader: string,
    options: any,
    formSectionId: string,
    ariaLabel: string,
    rightHeader?: string,
    disabled?: boolean,
    defaultValue?: any,
    openDropdownUpwards?: boolean,
    subLabel?: string
  ) => {
    return (
      <div
        className={classNames([styles.selectionContainer], {
          [styles.selectionContainerDisabled]: disabled
        })}
      >
        <div className={styles.selectionHeaderContainer}>
          <div className={styles.leftHeader}>{leftHeader}</div>
          {links[formSectionId] && (
            <a
              tabIndex={disabled ? -1 : 0}
              className={styles.link}
              href={links[formSectionId]}
            >
              {rightHeader}
            </a>
          )}
        </div>
        <div className={styles.subLabel}>{subLabel}</div>
        <Dropdown
          ariaLabel={ariaLabel}
          options={options}
          handleChange={option => {
            handleDropdown(formSectionId, option);
          }}
          value={
            appServiceFormData[formSectionId].value
              ? appServiceFormData[formSectionId]
              : defaultValue
          }
          disabled={disabled}
          openDropdownUpwards={openDropdownUpwards}
        />
      </div>
    );
  };

  return getDropdownSection(
    FORM_CONSTANTS.SUBSCRIPTION.label,
    appServiceData.subscription,
    FORM_CONSTANTS.SUBSCRIPTION.value,
    intl.formatMessage(azureModalMessages.azureModalAriaSubscriptionLabel),
    intl.formatMessage(azureModalMessages.azureModalCreateNew),
    false,
    DEFAULT_VALUE,
    false,
    intl.formatMessage(azureModalMessages.azureModalSubscriptionSubLabel)
  );
};
export default injectIntl(SubscriptionSelection);
