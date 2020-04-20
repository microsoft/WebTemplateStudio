import * as React from "react";
import { useState } from "react";
import { injectIntl, InjectedIntlProps } from "react-intl";
import styles from "./styles.module.css";
import messages from "./messages";
import Dropdown from "../Dropdown";
import classNames from "classnames";
import { AzureResourceType } from "../../utils/constants";
import { getLocations } from "../../utils/extensionService/extensionService";
import { AppContext } from "../../AppContext";

interface IProps {
  location: string;
  subscription: string;
  azureServiceType: AzureResourceType;
  onLocationChange(location: string): void;
}

type Props = IProps & InjectedIntlProps;

const LocationSelection = (props: Props) => {
  const { formatMessage } = props.intl;
  const { vscode } = React.useContext(AppContext);
  const { location, subscription, azureServiceType, onLocationChange } = props;
  const [dropdownLocations, setDropdownLocations] = useState<IDropDownOptionType[]>([]);
  const [selectedDropdownLocation, setSelectedDropdownLocation] = useState<IDropDownOptionType | undefined>(undefined);

  React.useEffect(() => {
    if(subscription) {
      chargeLocations();
    }
  }, [subscription]);

  React.useEffect(() => {
    const newLocation = dropdownLocations.find((s) => s.value === location);
    if (newLocation) {
      setSelectedDropdownLocation(newLocation);
    }
  }, [dropdownLocations]);

  React.useEffect(() => {
    if (selectedDropdownLocation) {
      onLocationChange(selectedDropdownLocation.value);
    }
  }, [selectedDropdownLocation]);

  const chargeLocations = async () => {
    const event = await getLocations(vscode, subscription, azureServiceType);
    const locations = event.data.payload.locations as AzureLocation[];
    const newDropDownLocations = locations.map<IDropDownOptionType>((location) => ({
      label: location.name,
      value: location.name,
    }));
    setDropdownLocations(newDropDownLocations);
  };
  
  const disableComponent = subscription === "" || dropdownLocations.length === 0;

  return (
    <div className={classNames(styles.container, { [styles.containerDisabled]: disableComponent })}>
      <div className={styles.header}>
        <div className={styles.title}>{formatMessage(messages.title)}</div>
      </div>
      <div className={styles.subtitle}>{formatMessage(messages.subtitle)}</div>
      <Dropdown
        ariaLabel={formatMessage(messages.ariaDropdownLabel)}
        options={dropdownLocations}
        handleChange={(location) => setSelectedDropdownLocation(location)}
        value={selectedDropdownLocation}
        disabled={disableComponent}
      />
    </div>
  );
};

export default injectIntl(LocationSelection);
