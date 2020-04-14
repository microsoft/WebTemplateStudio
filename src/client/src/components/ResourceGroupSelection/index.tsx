import * as React from "react";
import { useState } from "react";
import { injectIntl, InjectedIntlProps } from "react-intl";
import styles from "./styles.module.css";
import buttonStyles from "../../css/buttonStyles.module.css";
import messages from "./messages";
import Dropdown from "../Dropdown";
import classNames from "classnames";
import { AZURE_LINKS } from "../../utils/constants";
import { useSelector } from "react-redux";
import { AppState } from "../../store/combineReducers";
import { getSubscriptionsSelector } from "../../store/azureProfileData/azure/selector";

interface IProps {
  subscription: string;
  resourceGroup: string;
  resourceGroups: ResourceGroup[] | undefined;
  onResourceGroupChange(newResourceGroup: string): void;
  onRefreshResourceGroup(): void;
}

type Props = IProps & InjectedIntlProps;

const ResourceGroupSelection = (props: Props) => {
  const { formatMessage } = props.intl;
  const { subscription, resourceGroup, resourceGroups, onResourceGroupChange, onRefreshResourceGroup } = props;
  const subscriptions = useSelector((state: AppState) => getSubscriptionsSelector(state));
  const [dropdownResourceGroups, setDropownResourceGroups] = useState<IDropDownOptionType[]>([]);
  const [selectedDropdownResourceGroup, setSelectedDropdownResourceGroup] = useState<IDropDownOptionType | undefined>(
    undefined
  );

  const DEFAULT_RESOURCE_GROUP: IDropDownOptionType = {
    label: formatMessage(messages.createNewResourceGroup),
    value: "",
  };

  React.useEffect(() => {
    if (resourceGroups) {
      const newDropdownResourceGroups = isMicrosoftLearnSubscription() ? [] : [DEFAULT_RESOURCE_GROUP];

      resourceGroups.forEach((resourceGroup) =>
        newDropdownResourceGroups.push({
          label: resourceGroup.name,
          value: resourceGroup.name,
        })
      );
      setDropownResourceGroups(newDropdownResourceGroups);
    }
  }, [resourceGroups]);

  React.useEffect(() => {
    if (dropdownResourceGroups.length > 0) {
      const newResourceGroup = dropdownResourceGroups.find((s) => s.value === resourceGroup);
      if (newResourceGroup) {
        setSelectedDropdownResourceGroup(newResourceGroup);
      } else {
        setSelectedDropdownResourceGroup(dropdownResourceGroups[0]);
      }
    }
  }, [dropdownResourceGroups]);

  React.useEffect(() => {
    if (selectedDropdownResourceGroup) {
      onResourceGroupChange(selectedDropdownResourceGroup.value);
    }
  }, [selectedDropdownResourceGroup]);

  const isMicrosoftLearnSubscription = (): boolean => {
    const newSubscription = subscriptions.find((s) => s.name === subscription);
    return newSubscription !== undefined && newSubscription.isMicrosoftLearn;
  };

  const refreshResourceGroups = () => {
    setDropownResourceGroups([]);
    onRefreshResourceGroup();
  };

  return (
    <div className={classNames(styles.container, { [styles.containerDisabled]: subscription === "" })}>
      <div className={styles.header}>
        <div className={styles.title}>{formatMessage(messages.title)}</div>
        <a className={styles.link} href={AZURE_LINKS.CREATE_NEW_RESOURCE_GROUP}>
          {formatMessage(messages.newResourceGroupLink)}
        </a>
      </div>

      <div className={styles.subtitle}>{formatMessage(messages.subtitle)}</div>
      <Dropdown
        ariaLabel={formatMessage(messages.ariaDropdownLabel)}
        options={dropdownResourceGroups}
        handleChange={(resourceGroup) => setSelectedDropdownResourceGroup(resourceGroup)}
        value={selectedDropdownResourceGroup}
        disabled={subscription === ""}
      />
      <button
        disabled={subscription === ""}
        onClick={refreshResourceGroups}
        className={classNames(buttonStyles.buttonLink, styles.refreshButton)}
      >
        {formatMessage(messages.refresh)}
      </button>
    </div>
  );
};

export default injectIntl(ResourceGroupSelection);
