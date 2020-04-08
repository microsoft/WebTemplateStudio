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
  initialResourceGroups: ResourceGroup[];
  onResourceGroupChange(selectedResourceGroup: string): void;
  onRefreshResourceGroup(): void;
}

type Props = IProps & InjectedIntlProps;

const ResourceGroupSelection = (props: Props) => {
  const { formatMessage } = props.intl;
  const { initialResourceGroups, onResourceGroupChange, onRefreshResourceGroup } = props;
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
    const resourceGroup = resourceGroups.find(s => s.value === selectedResourceGroup);
    if (!resourceGroup) {
      setSelectedResourceGroup(undefined);
    }
  }, [resourceGroups]);

  React.useEffect(() => {
    if (selectedResourceGroup) {
      onResourceGroupChange(selectedResourceGroup.value);
    }
  }, [selectedResourceGroup]);


  const refreshResourceGroups = () => {
    setResourceGroups([]);
    onRefreshResourceGroup();
  }

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
      <button data-testid="refresh-button" disabled={resourceGroups.length === 0} onClick={refreshResourceGroups}
        className={classNames(buttonStyles.buttonLink, styles.refreshButton)}>
          {formatMessage(messages.refresh)}
      </button>
    </div>
  );
};

export default injectIntl(ResourceGroupSelection);
