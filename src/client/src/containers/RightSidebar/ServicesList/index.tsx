import { connect } from "react-redux";
import { AppState } from "../../../reducers";
import { getServicesSelector } from "../../../selectors/servicesSelector";
import React from "react";
import { injectIntl, InjectedIntlProps } from "react-intl";
import messages from "./strings";
import styles from "./styles.module.css";
import CosmosDBSelection from "./CosmosDBSelection";
import AppServiceSelection from "./AppServiceSelection";
import { ServiceState } from "../../../reducers/wizardSelectionReducers/services";
import _ from "lodash";

interface IProps {
  services: ServiceState;
}

type Props = IProps & InjectedIntlProps;

function ServicesList({ services, intl }: Props) {
  const { formatMessage } = intl;
  const hasAppService = services.appService && services.appService.selection;
  const hasCosmos = services.cosmosDB && !_.isEmpty(services.cosmosDB.selection);

  return (
    <div className={styles.servicesSection}>
      <div className={styles.title}>{formatMessage(messages.services)}</div>
      {hasAppService && <AppServiceSelection appServiceSelection={services.appService} />}
      {hasCosmos && <CosmosDBSelection cosmosSelection={services.cosmosDB} />}
    </div>
  );
}

const mapStateToProps = (state: AppState): IProps => ({
  services: getServicesSelector(state)
});

export default connect(mapStateToProps)(injectIntl(ServicesList));
