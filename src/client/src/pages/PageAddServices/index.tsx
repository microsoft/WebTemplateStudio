import * as React from "react";
import classnames from "classnames";
import styles from "./styles.module.css";

import { useSelector } from "react-redux";
import { InjectedIntlProps, injectIntl } from "react-intl";
import { isLoggedInSelector } from "../../store/config/azure/selector";
import { getServiceGroups } from "../../store/templates/features/selector";

import messages from "./messages";

import Title from "../../components/Title";
import ServiceGroup from "./ServiceGroup";
import AzureStudent from "./AzureStudent";
import AzureAccount from "./AzureAccount";

type Props = InjectedIntlProps;

const PageAddServices = ({ intl }: Props) => {
  const { formatMessage } = intl;

  const isLoggedIn = useSelector(isLoggedInSelector);
  const serviceGroups = useSelector(getServiceGroups);

  return (
    <div className={styles.centerView}>
      <div className={classnames(styles.container)}>
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
    </div>
  );
};

export default injectIntl(PageAddServices);
