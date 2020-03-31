import * as React from "react";
import { useState } from "react";
import { injectIntl, InjectedIntlProps } from "react-intl";
import styles from "./styles.module.css";
import messages from "./messages";
import Dropdown from "../Dropdown";
import classNames from "classnames";

interface IProps {
  initialLocations: AzureLocation[];
  onLocationChange(selectedLocation: string): void;
}

type Props = IProps & InjectedIntlProps;

const LocationSelection = (props: Props) => {
  const { formatMessage } = props.intl;
  const { initialLocations, onLocationChange } = props;
  const [locations, setLocations] = useState<IDropDownOptionType[]>([]);
  const [selectedLocation, setSelectedLocation] = useState<IDropDownOptionType | undefined>(undefined);

  React.useEffect(() => {
    if (initialLocations) {
      const dropDownLocations = initialLocations.map<IDropDownOptionType>(location => ({
        label: location.name,
        value: location.name,
      }));
      setLocations(dropDownLocations);
    }
  }, [initialLocations]);

  React.useEffect(() => {
    if (selectedLocation) {
      onLocationChange(selectedLocation.value);
    }
  }, [selectedLocation]);

  return (
    <div className={classNames(styles.container, { [styles.containerDisabled]: locations.length === 0 })}>
      <div className={styles.header}>
        <div className={styles.title}>{formatMessage(messages.title)}</div>
      </div>
      <div className={styles.subtitle}>{formatMessage(messages.subtitle)}</div>
      <Dropdown
        ariaLabel={formatMessage(messages.ariaDropdownLabel)}
        options={locations}
        handleChange={setSelectedLocation}
        value={selectedLocation}
        disabled={locations.length === 0}
      />
    </div>
  );
};

export default injectIntl(LocationSelection);
