import React from "react";
import { InjectedIntlProps, injectIntl } from "react-intl";
import { connect } from "react-redux";

import { AppState } from "../../../store/combineReducers";
import { ServiceState } from "../../../store/userSelection/services/combineReducers";
import { getServices } from "../../../store/userSelection/services/servicesSelector";
import InputTitle from "../../Titles/TitleForInput";
import rightsidebarStyles from "../rightsidebarStyles.module.css";
import AppServiceSelection from "./AppServiceSelection";
import CosmosDBSelection from "./CosmosDBSelection";
import messages from "./messages";

interface IProps {
  services: ServiceState;
}

type Props = IProps & InjectedIntlProps;

function ServicesList({ services, intl }: Props) {
  const { formatMessage } = intl;
  const hasAppService = services.appService !== null;
  const hasCosmos = services.cosmosDB !== null;

  return (
    <div className={rightsidebarStyles.sidebarItem}>
      <InputTitle>{formatMessage(messages.services)}</InputTitle>
      {hasAppService && <AppServiceSelection appServiceSelection={services.appService} />}
      {hasCosmos && <CosmosDBSelection cosmosSelection={services.cosmosDB} />}
    </div>
  );
}

const mapStateToProps = (state: AppState): IProps => ({
  services: getServices(state),
});

export default connect(mapStateToProps)(injectIntl(ServicesList));
