import * as React from "react";
import { InjectedIntlProps, injectIntl } from "react-intl";
import { useDispatch } from "react-redux";

import { AppContext } from "../../../../AppContext";
import { openCosmosDbModalAction } from "../../../../store/navigation/modals/action";
import { removeCosmosDbAction } from "../../../../store/userSelection/services/cosmosDb/action";
import { ICosmosDB } from "../../../../store/userSelection/services/cosmosDb/model";
import { EXTENSION_COMMANDS } from "../../../../utils/constants/commands";
import { SERVICE_KEYS } from "../../../../utils/constants/constants";
import { sendTelemetry } from "../../../../utils/extensionService/extensionService";
import servicelistStyles from "../servicelistStyles.module.css";
import SidebarItem from "../SidebarItem";
import messages from "./messages";

interface IProps {
  cosmosSelection: ICosmosDB | null;
}

type Props = IProps & InjectedIntlProps;

const CosmosDBSelection = ({ cosmosSelection, intl }: Props) => {
  const dispatch = useDispatch();
  const { vscode } = React.useContext(AppContext);
  const [openModal, setOpenModal] = React.useState(false);

  React.useEffect(() => {
    if (openModal) {
      const azureServiceType = SERVICE_KEYS.COSMOS_DB;
      sendTelemetry(vscode, EXTENSION_COMMANDS.TRACK_OPEN_COSMOSDB_SERVICE_MODAL_FROM_SERVICES_LIST, {
        azureServiceType,
      });
    }
  }, [openModal]);

  return (
    <>
      {cosmosSelection && (
        <>
          <div className={servicelistStyles.headerContainer}>
            <div>{intl.formatMessage(messages.title)}</div>
          </div>
          <SidebarItem
            icon={cosmosSelection.icon}
            cosmosDB={true}
            editable={false} //itemNameEditable does not make sense for AppServices
            configurable={true} //we may need to update this in the future if we add this to the templates
            key={cosmosSelection.accountName}
            text={cosmosSelection.accountName}
            withIndent={true}
            handleOnCloseClick={() => dispatch(removeCosmosDbAction())}
            handleConfigClick={() => {
              setOpenModal(!openModal);
              dispatch(openCosmosDbModalAction());
            }}
            idx={1}
          />
        </>
      )}
    </>
  );
};

export default injectIntl(CosmosDBSelection);
