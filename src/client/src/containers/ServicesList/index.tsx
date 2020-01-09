import { connect } from "react-redux";
import { AppState } from "../../reducers";
import { getServicesSelector } from "../../selectors/cosmosServiceSelector";
import React from "react";
import { injectIntl, InjectedIntlProps } from "react-intl";
import messages from "./strings";
import styles from "./styles.module.css";
import CosmosDBSelection from "../CosmosDBSelection";
import AppServiceSelection from "../AppServiceSelection";
import { IServices } from "../../reducers/wizardSelectionReducers/services";

interface IProps {
  services: IServices;
}

type Props = IProps & InjectedIntlProps;

function ServicesList({ services, intl }: Props) {
  const { formatMessage } = intl;

  return (
    <div className={styles.servicesSection}>
      <div className={styles.title}>{formatMessage(messages.services)}</div>
      {services.appService && <AppServiceSelection appServiceSelection={services.appService} />}
      {services.cosmosDB && <CosmosDBSelection cosmosSelection={services.cosmosDB} />}
    </div>
  );
}

const mapStateToProps = (state: AppState): IProps => ({
  services: getServicesSelector(state)
});

export default connect(mapStateToProps)(injectIntl(ServicesList));
