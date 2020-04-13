import * as React from "react";
import { useState } from "react";
import { injectIntl, InjectedIntlProps } from "react-intl";
import styles from "./styles.module.css";
import messages from "./messages";
import Dropdown from "../Dropdown";
import classNames from "classnames";
const DEFAULT_LOCATION = "Central US";

interface IProps {
  location: string;
  locations: AzureLocation[];
  onLocationChange(location: string): void;
}

type Props = IProps & InjectedIntlProps;

const LocationSelection = (props: Props) => {
  const { formatMessage } = props.intl;
  const { location, locations, onLocationChange } = props;
  const [dropdownLocations, setDropdownLocations] = useState<IDropDownOptionType[]>([]);
  const [selectedDropdownLocation, setSelectedDropdownLocation] = useState<IDropDownOptionType | undefined>(undefined);

  React.useEffect(() => {
    const newDropDownLocations = locations.map<IDropDownOptionType>((location) => ({
      label: location.name,
      value: location.name,
    }));
    setDropdownLocations(newDropDownLocations);
  }, [locations]);

  React.useEffect(() => {
    let newLocation = dropdownLocations.find((s) => s.value === location);
    if (newLocation) {
      setSelectedDropdownLocation(newLocation);
    } else {
      newLocation = dropdownLocations.find((s) => s.value === DEFAULT_LOCATION);
      setSelectedDropdownLocation(newLocation);
    }
  }, [dropdownLocations]);

  React.useEffect(() => {
    if (selectedDropdownLocation) {
      onLocationChange(selectedDropdownLocation.value);
    }
  }, [selectedDropdownLocation]);

  return (
    <div className={classNames(styles.container, { [styles.containerDisabled]: dropdownLocations.length === 0 })}>
      <div className={styles.header}>
        <div className={styles.title}>{formatMessage(messages.title)}</div>
      </div>
      <div className={styles.subtitle}>{formatMessage(messages.subtitle)}</div>
      <Dropdown
        ariaLabel={formatMessage(messages.ariaDropdownLabel)}
        options={dropdownLocations}
        handleChange={(location) => setSelectedDropdownLocation(location)}
        value={selectedDropdownLocation}
        disabled={dropdownLocations.length === 0}
      />
    </div>
  );
};

export default injectIntl(LocationSelection);
