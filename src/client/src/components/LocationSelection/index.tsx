import * as React from "react";
import { useState } from "react";
import { injectIntl, InjectedIntlProps } from "react-intl";
import styles from "./styles.module.css";
import messages from "./messages";
import Dropdown from "../Dropdown";
import classNames from "classnames";
const DEFAULT_LOCATION = "Central US";

interface IProps {
  Location: string;
  Locations: AzureLocation[];
  onLocationChange(selectedLocation: string): void;
}

type Props = IProps & InjectedIntlProps;

const LocationSelection = (props: Props) => {
  const { formatMessage } = props.intl;
  const { Location, Locations, onLocationChange } = props;
  const [dropdownLocations, setDropdownLocations] = useState<IDropDownOptionType[]>([]);
  const [selectedLocation, setSelectedLocation] = useState<IDropDownOptionType | undefined>(undefined);

  React.useEffect(() => {
    const newDropDownLocations = Locations.map<IDropDownOptionType>((location) => ({
      label: location.name,
      value: location.name,
    }));
    setDropdownLocations(newDropDownLocations);
  }, [Locations]);

  React.useEffect(() => {
    const newLocation = dropdownLocations.find((s) => s.value === Location);
    if (newLocation) {
      setSelectedLocation(newLocation);
    } else {
      const location = dropdownLocations.find((s) => s.value === DEFAULT_LOCATION);
      setSelectedLocation(location);
    }
  }, [dropdownLocations]);

  React.useEffect(() => {
    if (selectedLocation) {
      onLocationChange(selectedLocation.value);
    }
  }, [selectedLocation]);

  return (
    <div className={classNames(styles.container, { [styles.containerDisabled]: dropdownLocations.length === 0 })}>
      <div className={styles.header}>
        <div className={styles.title}>{formatMessage(messages.title)}</div>
      </div>
      <div className={styles.subtitle}>{formatMessage(messages.subtitle)}</div>
      <Dropdown
        ariaLabel={formatMessage(messages.ariaDropdownLabel)}
        options={dropdownLocations}
        handleChange={(location) => setSelectedLocation(location)}
        value={selectedLocation}
        disabled={dropdownLocations.length === 0}
      />
    </div>
  );
};

export default injectIntl(LocationSelection);
