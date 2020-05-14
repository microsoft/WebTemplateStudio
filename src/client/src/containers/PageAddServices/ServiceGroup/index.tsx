import * as React from "react";
import { useSelector } from "react-redux";
import styles from "./styles.module.css";
import { servicesEnum } from "../../../mockData/azureServiceOptions";
import { IOption } from "../../../types/option";
import { InjectedIntlProps, injectIntl } from "react-intl";
import { AppState } from "../../../store/combineReducers";
import messages from "./messages";
import ServiceCard from "../ServiceCard";

interface IStateProps {
  serviceType: string;
  services: IOption[];
}

type Props = IStateProps & InjectedIntlProps;

const ServiceGroup = ({ intl, services, serviceType }: Props) => {
  const { formatMessage } = intl;
  const isPreview = useSelector((state: AppState) => state.config.previewStatus);
  const [title, setTitle] = React.useState("");

  React.useEffect(() => {
    switch (serviceType) {
      case servicesEnum.HOSTING:
        setTitle(formatMessage(messages.hostingTitle));
        break;
      case servicesEnum.DATABASE:
        setTitle(formatMessage(messages.storageTitle));
        break;
    }
  }, []);
  return (
    <div className={styles.container}>
      <div className={styles.serviceType}>{serviceType}</div>
      <div className={styles.descriptor}>{title}</div>
      <div className={styles.cardsContainer}>
        {services.map((option, key) => {
          if (isPreview || !option.isPreview) {
            return <ServiceCard key={key} option={option} />;
          }
        })}
      </div>
    </div>
  );
};

export default injectIntl(ServiceGroup);
