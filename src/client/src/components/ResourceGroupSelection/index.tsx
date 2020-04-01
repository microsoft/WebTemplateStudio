import * as React from "react";
import { useState } from "react";
import { injectIntl, InjectedIntlProps } from "react-intl";
import styles from "./styles.module.css";
import messages from "./messages";
import Dropdown from "../Dropdown";
import classNames from "classnames";
import { AZURE_LINKS } from "../../utils/constants";
const DEFAULT_RESOURCE_GROUP = "Create new resource group";

interface IProps {
  initialResourceGroups: ResourceGroup[];
  onResourceGroupChange(selectedResourceGroup: string): void;
}

type Props = IProps & InjectedIntlProps;

const ResourceGroupSelection = (props: Props) => {
  const { formatMessage } = props.intl;
  const { initialResourceGroups, onResourceGroupChange } = props;
  const [resourceGroups, setResourceGroups] = useState<IDropDownOptionType[]>([]);
  const [selectedResourceGroup, setSelectedResourceGroup] = useState<IDropDownOptionType | undefined>(undefined);

  React.useEffect(() => {
    if (initialResourceGroups) {
      const dropDownResourceGroups = initialResourceGroups.map<IDropDownOptionType>(resourceGroup => ({
        label: resourceGroup.name,
        value: resourceGroup.name,
      }));
      setResourceGroups(dropDownResourceGroups);
    }
  }, [initialResourceGroups]);

  
  React.useEffect(() => {
    if (!selectedResourceGroup) {
      const location = resourceGroups.find(s => s.label === DEFAULT_RESOURCE_GROUP);
      setSelectedResourceGroup(location);
    }
  }, [resourceGroups]);

  React.useEffect(() => {
    if (selectedResourceGroup) {
      onResourceGroupChange(selectedResourceGroup.value);
    }
  }, [selectedResourceGroup]);

  return (
    <div className={classNames(styles.container, { [styles.containerDisabled]: resourceGroups.length === 0 })}>
      <div className={styles.header}>
        <div className={styles.title}>{formatMessage(messages.title)}</div>
        <a className={styles.link} href={AZURE_LINKS.CREATE_NEW_RESOURCE_GROUP}>
          {formatMessage(messages.newResourceGroupLink)}
        </a>
      </div>


      <div className={styles.subtitle}>{formatMessage(messages.subtitle)}</div>
      <Dropdown
        ariaLabel={formatMessage(messages.ariaDropdownLabel)}
        options={resourceGroups}
        handleChange={resourceGroup => setSelectedResourceGroup(resourceGroup)}
        value={selectedResourceGroup}
        disabled={resourceGroups.length === 0}
      />
    </div>
  );
};

export default injectIntl(ResourceGroupSelection);
