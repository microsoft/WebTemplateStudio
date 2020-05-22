import * as React from "react";
import { useSelector } from "react-redux";
import styles from "./styles.module.css";
import { InjectedIntlProps, injectIntl } from "react-intl";
import { AppState } from "../../../store/combineReducers";
import ServiceCard from "../ServiceCard";

interface IStateProps {
  group: IServiceGroup;
}

type Props = IStateProps & InjectedIntlProps;

const ServiceGroup = ({ group, intl }: Props) => {
  const { formatMessage } = intl;
  const isPreview = useSelector((state: AppState) => state.config.previewStatus);
  
  return (
    <div className={styles.container}>
      <div className={styles.title}>{formatMessage(group.name)}</div>
      <div className={styles.description}>{formatMessage(group.description)}</div>
      <div className={styles.cardsContainer}>
        {group.services.map((service,key) => {
          if (isPreview || !service.isPreview) {
            return <ServiceCard key={key} service={service} />;
          }
        })}
      </div>
    </div>
  );
};

export default injectIntl(ServiceGroup);
