import * as React from "react";
import { useState } from "react";
import { injectIntl, InjectedIntlProps } from "react-intl";
import styles from "./styles.module.css";
import buttonStyles from "../../css/buttonStyles.module.css";
import messages from "./messages";
import Dropdown from "../Dropdown";
import classNames from "classnames";
import { AZURE_LINKS } from "../../utils/constants";

interface IProps {
  isEnabled: boolean;
  resourceGroup: string;
  resourceGroups: ResourceGroup[];
  onResourceGroupChange(newResourceGroup: string): void;
  onRefreshResourceGroup(): void;
}

type Props = IProps & InjectedIntlProps;

const ResourceGroupSelection = (props: Props) => {
  const { formatMessage } = props.intl;
  const { isEnabled, resourceGroup, resourceGroups, onResourceGroupChange, onRefreshResourceGroup } = props;
  const [dropdownResourceGroups, setDropownResourceGroups] = useState<IDropDownOptionType[]>([]);
  const [selectedDropdownResourceGroup, setSelectedDropdownResourceGroup] = useState<IDropDownOptionType | undefined>(undefined);
  const disableComponent = !isEnabled || dropdownResourceGroups.length === 0;
  
  const DEFAULT_RESOURCE_GROUP: IDropDownOptionType = {
    label: formatMessage(messages.createNewResourceGroup),
    value: "",
  };

  React.useEffect(() => {
    const newDropdownResourceGroups = [DEFAULT_RESOURCE_GROUP];
    resourceGroups.forEach((resourceGroup) =>
      newDropdownResourceGroups.push({
        label: resourceGroup.name,
        value: resourceGroup.name,
      })
    );
    setDropownResourceGroups(newDropdownResourceGroups);
  }, [resourceGroups]);

  React.useEffect(() => {
    const newResourceGroup = dropdownResourceGroups.find((s) => s.value === resourceGroup);
    if (newResourceGroup) {
      setSelectedDropdownResourceGroup(newResourceGroup);
    }
  }, [dropdownResourceGroups]);

  React.useEffect(() => {
    if (selectedDropdownResourceGroup) {
      onResourceGroupChange(selectedDropdownResourceGroup.value);
    }
  }, [selectedDropdownResourceGroup]);

  const refreshResourceGroups = () => {
    setDropownResourceGroups([]);
    onRefreshResourceGroup();
  };

  return (
    <div className={classNames(styles.container, { [styles.containerDisabled]: disableComponent })}>
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
        disabled={disableComponent}
      />
      <button
        data-testid="refresh-button"
        disabled={disableComponent}
        onClick={refreshResourceGroups}
        className={classNames(buttonStyles.buttonLink, styles.refreshButton)}
      >
        {formatMessage(messages.refresh)}
      </button>
    </div>
  );
};

export default injectIntl(ResourceGroupSelection);
