import * as React from "react";
import styles from "./styles.module.css";

import { useSelector } from "react-redux";
import { InjectedIntlProps, injectIntl } from "react-intl";
import { isLoggedInSelector } from "../../store/config/azure/selector";
import { getServiceGroups } from "../../store/templates/features/selector";

import messages from "./messages";

import ServiceGroup from "./ServiceGroup";
import AzureStudent from "./AzureStudent";
import AzureAccount from "./AzureAccount";
import Title from "../../components/Titles/Title";

type Props = InjectedIntlProps;

const AddServicesPage = ({ intl }: Props) => {
  const { formatMessage } = intl;

  const isLoggedIn = useSelector(isLoggedInSelector);
  const serviceGroups = useSelector(getServiceGroups);

  return (
    <div className={styles.container}>
      <div className={styles.logInInfoBar}>
        <Title>{formatMessage(messages.title)}</Title>

        <AzureAccount />
      </div>
      {!isLoggedIn && <AzureStudent />}
      <div className={styles.servicesContainer}>
        {serviceGroups.map((group, key) => {
          return <ServiceGroup group={group} key={key} />;
        })}
      </div>
    </div>
  );
};

export default injectIntl(AddServicesPage);
