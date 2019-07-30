import * as React from "react";

import AzureFunctionsSelection from "../../containers/AzureFunctionsSelection";
import CosmosDBSelection from "../../containers/CosmosDBSelection";
import AppServiceSelection from "../../containers/AppServiceSelection";

import { SERVICE_KEYS } from "../../utils/constants";

interface IProps {
  services: any;
}

type Props = IProps;

const ServicesSidebarItem = ({ services }: Props) => {
  /**
   * Renders a service selected in the wizard. If a service is added to the wizard, then
   * a switch case needs to be added here to render a specific selection on the righthand
   * sidebar.
   *
   * @param serviceName the "key" as specified in the redux state for a particular service
   */
  const renderService = (serviceName: string) => {
    switch (serviceName) {
      case SERVICE_KEYS.AZURE_FUNCTIONS:
        return <AzureFunctionsSelection functionApps={services[serviceName]} />;
      case SERVICE_KEYS.COSMOS_DB:
        return <CosmosDBSelection cosmosSelection={services[serviceName]} />;
      case SERVICE_KEYS.APP_SERVICE:
        return (
          <AppServiceSelection appServiceSelection={services[serviceName]} />
        );
    }
  };
  return (
    <React.Fragment>
      {Object.keys(services).map(serviceName => {
        return <div key={serviceName}>{renderService(serviceName)}</div>;
      })}
    </React.Fragment>
  );
};

export default ServicesSidebarItem;
