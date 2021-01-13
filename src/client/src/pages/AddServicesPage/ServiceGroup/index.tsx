import * as React from "react";
import styles from "./styles.module.css";
import { InjectedIntlProps, injectIntl } from "react-intl";
import ServiceCard from "../ServiceCard";

interface IStateProps {
  group: IServiceGroup;
}

type Props = IStateProps & InjectedIntlProps;

const ServiceGroup = ({ group, intl }: Props) => {
  const { formatMessage } = intl;

  return (
    <div className={styles.container}>
      <h4>{formatMessage(group.name)}</h4>
      <h3>{formatMessage(group.description)}</h3>
      <div className={styles.cardsContainer}>
        {group.services.map((service, key) => {
          return <ServiceCard key={key} service={service} />;
        })}
      </div>
    </div>
  );
};

export default injectIntl(ServiceGroup);
