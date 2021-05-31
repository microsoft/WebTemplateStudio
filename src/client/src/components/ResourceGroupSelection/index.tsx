import classNames from "classnames";
import * as React from "react";
import { useState } from "react";
import { InjectedIntlProps, injectIntl } from "react-intl";
import { useSelector } from "react-redux";

import { AppContext } from "../../AppContext";
import { ReactComponent as Refresh } from "../../assets/i-refresh.svg";
import modalStyles from "../../css/modal.module.css";
import { AppState } from "../../store/combineReducers";
import { getSubscriptionsSelector } from "../../store/config/azure/selector";
import { AZURE_LINKS } from "../../utils/constants/azure";
import { getResourceGroups } from "../../utils/extensionService/extensionService";
import Dropdown from "../Dropdown";
import messages from "./messages";
import styles from "./styles.module.css";

interface IProps {
  subscription: string;
  resourceGroup: string;
  onResourceGroupChange(newResourceGroup: string): void;
}

type Props = IProps & InjectedIntlProps;

const ResourceGroupSelection = (props: Props) => {
  const { formatMessage } = props.intl;
  const { vscode } = React.useContext(AppContext);
  const { subscription, resourceGroup, onResourceGroupChange } = props;
  const subscriptions = useSelector((state: AppState) => getSubscriptionsSelector(state));
  const [dropdownResourceGroups, setDropdownResourceGroups] = useState<IDropDownOptionType[]>([]);
  const [selectedDropdownResourceGroup, setSelectedDropdownResourceGroup] =
    useState<IDropDownOptionType | undefined>(undefined);
  const [isRefresh, setIsRefresh] = useState(false);

  const DEFAULT_RESOURCE_GROUP: IDropDownOptionType = {
    label: formatMessage(messages.createNewResourceGroup),
    value: "",
  };

  React.useEffect(() => {
    if (subscription) {
      chargeResourceGroups();
    }
  }, [subscription]);

  React.useEffect(() => {
    if (dropdownResourceGroups.length > 0) {
      const newResourceGroup = dropdownResourceGroups.find((s) => s.value === resourceGroup);
      if (newResourceGroup) {
        setSelectedDropdownResourceGroup(newResourceGroup);
      } else {
        setSelectedDropdownResourceGroup(dropdownResourceGroups[0]);
      }
      setIsRefresh(false);
    }
  }, [dropdownResourceGroups]);

  React.useEffect(() => {
    if (selectedDropdownResourceGroup) {
      onResourceGroupChange(selectedDropdownResourceGroup.value);
    }
  }, [selectedDropdownResourceGroup]);

  const chargeResourceGroups = async () => {
    const event = await getResourceGroups(vscode, subscription);
    const resourceGroups = event.data.payload.resourceGroups as ResourceGroup[];
    const newDropdownResourceGroups = isMicrosoftLearnSubscription() ? [] : [DEFAULT_RESOURCE_GROUP];

    resourceGroups.forEach((resourceGroup) =>
      newDropdownResourceGroups.push({
        label: resourceGroup.name,
        value: resourceGroup.name,
      })
    );
    setDropdownResourceGroups(newDropdownResourceGroups);
  };

  const isMicrosoftLearnSubscription = (): boolean => {
    const newSubscription = subscriptions.find((s) => s.name === subscription);
    return newSubscription !== undefined && newSubscription.isMicrosoftLearn;
  };

  const refreshResourceGroups = async () => {
    setIsRefresh(true);
    setDropdownResourceGroups([]);
    chargeResourceGroups();
  };

  const disableComponent = subscription === "" || isRefresh;

  return (
    <div className={classNames(styles.container, { [styles.containerDisabled]: disableComponent })}>
      <div className={modalStyles.header}>
        <div className={modalStyles.title}>{formatMessage(messages.title)}</div>
        <a href={AZURE_LINKS.CREATE_NEW_RESOURCE_GROUP}>{formatMessage(messages.newResourceGroupLink)}</a>
      </div>

      <div className={modalStyles.subtitle}>{formatMessage(messages.subtitle)}</div>
      <div className={styles.dropdownContainer}>
        <div className={styles.dropdown}>
          <Dropdown
            openDropdownUpwards={dropdownResourceGroups.length > 1}
            ariaLabel={formatMessage(messages.ariaDropdownLabel)}
            options={dropdownResourceGroups}
            handleChange={(resourceGroup) => setSelectedDropdownResourceGroup(resourceGroup)}
            value={selectedDropdownResourceGroup}
            disabled={disableComponent}
          />
        </div>
        <button
          data-testid="refresh-button"
          disabled={disableComponent}
          className={styles.refreshButton}
          onClick={refreshResourceGroups}
        >
          <Refresh className={styles.viewIcon} />
        </button>
      </div>
    </div>
  );
};

export default injectIntl(ResourceGroupSelection);
