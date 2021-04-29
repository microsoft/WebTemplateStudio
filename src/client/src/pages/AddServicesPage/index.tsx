import * as React from "react";
import { InjectedIntlProps, injectIntl } from "react-intl";
import { useSelector } from "react-redux";

import Title from "../../components/Titles/Title";
import { isLoggedInSelector } from "../../store/config/azure/selector";
import { getServiceGroups } from "../../store/templates/features/selector";
import pageStyles from "../pageStyles.module.css";
import AzureAccount from "./AzureAccount";
import AzureStudent from "./AzureStudent";
import messages from "./messages";
import ServiceGroup from "./ServiceGroup";
import styles from "./styles.module.css";

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
      <div className={pageStyles.flexCardsContainer}>
        {serviceGroups.map((group, key) => {
          return <ServiceGroup group={group} key={key} />;
        })}
      </div>
    </div>
  );
};

export default injectIntl(AddServicesPage);
