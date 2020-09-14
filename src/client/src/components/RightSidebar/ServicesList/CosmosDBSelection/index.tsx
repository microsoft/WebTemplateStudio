import * as React from "react";
import { useDispatch } from "react-redux";
import SidebarItem from "../SidebarItem";
import { ICosmosDB } from "../../../../store/userSelection/services/cosmosDb/model";
import { openCosmosDbModalAction } from "../../../../store/navigation/modals/action";
import styles from "./styles.module.css";
import { injectIntl, InjectedIntlProps } from "react-intl";
import { removeCosmosDbAction } from "../../../../store/userSelection/services/cosmosDb/action";
import messages from "./messages";
import { AppContext } from "../../../../AppContext";
import { sendTelemetry } from "../../../../utils/extensionService/extensionService";
import { EXTENSION_COMMANDS } from "../../../../utils/constants/commands";
import {SERVICE_KEYS } from "../../../../utils/constants/constants";

interface IProps {
  cosmosSelection: ICosmosDB | null;
}

type Props = IProps & InjectedIntlProps;

const CosmosDBSelection = ({
  cosmosSelection,
  intl
}: Props) => {
  const dispatch = useDispatch();
  const { vscode } = React.useContext(AppContext);
  const [openModal, setOpenModal] = React.useState(false);

  React.useEffect(() => {
    if (openModal) {
      const azureServiceType = SERVICE_KEYS.COSMOS_DB;
      sendTelemetry(vscode, EXTENSION_COMMANDS.TRACK_OPEN_COSMOSDB_SERVICE_MODAL_FROM_SERVICES_LIST, { azureServiceType })
    }
  }, [openModal]);

  return (
    <React.Fragment>
      {cosmosSelection && (
        <React.Fragment>
          <div className={styles.headerContainer}>
            <div>{intl.formatMessage(messages.title)}</div>
          </div>
          <SidebarItem
            cosmosDB={true}
            editable={false}
            configurable={true}
            customInputStyle={styles.input}
            key={cosmosSelection.accountName}
            text={cosmosSelection.accountName}
            withIndent={true}
            handleOnCloseClick={() => dispatch(removeCosmosDbAction())}
            handleConfigClick={() => {
              setOpenModal(!openModal);
              dispatch(openCosmosDbModalAction())
            }}
            idx={1}
          />
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default injectIntl(CosmosDBSelection);
