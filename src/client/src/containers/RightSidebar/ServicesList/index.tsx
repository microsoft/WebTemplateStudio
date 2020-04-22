import { connect } from "react-redux";
import { AppState } from "../../../store/combineReducers";
import { getServices } from "../../../store/userSelection/services/servicesSelector";
import React from "react";
import { injectIntl, InjectedIntlProps } from "react-intl";
import messages from "./strings";
import styles from "./styles.module.css";
import CosmosDBSelection from "./CosmosDBSelection";
import AppServiceSelection from "./AppServiceSelection";
import { ServiceState } from "../../../store/userSelection/services/combineReducers";

interface IProps {
  services: ServiceState;
}

type Props = IProps & InjectedIntlProps;

function ServicesList({ services, intl }: Props) {
  const { formatMessage } = intl;
  const hasAppService = services.appService !== null;
  const hasCosmos = services.cosmosDB !== null;

  return (
    <div className={styles.servicesSection}>
      <div className={styles.title}>{formatMessage(messages.services)}</div>
      {hasAppService && <AppServiceSelection appServiceSelection={services.appService} />}
      {hasCosmos && <CosmosDBSelection cosmosSelection={services.cosmosDB} />}
    </div>
  );
}

const mapStateToProps = (state: AppState): IProps => ({
  services: getServices(state)
});

export default connect(mapStateToProps)(injectIntl(ServicesList));
