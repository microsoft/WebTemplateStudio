import * as React from "react";
import { useDispatch } from "react-redux";
import SidebarItem from "../SidebarItem";
import { ICosmosDB } from "../../../../store/userSelection/services/cosmosDb/model";
import { ReactComponent as EditIcon } from "../../../../assets/edit.svg";
import { openCosmosDbModalAction } from "../../../../store/navigation/modals/action";
import styles from "./styles.module.css";
import { KEY_EVENTS } from "../../../../utils/constants/constants";
import { injectIntl, InjectedIntlProps } from "react-intl";
import { sendTelemetry } from "../../../../utils/extensionService/extensionService";
import { removeCosmosDbAction } from "../../../../store/userSelection/services/cosmosDb/action";
import { AppContext } from "../../../../AppContext";
import messages from "./messages";
import { EXTENSION_COMMANDS } from "../../../../utils/constants/commands";

interface IProps {
  cosmosSelection: ICosmosDB | null;
}

type Props = IProps & InjectedIntlProps;

const CosmosDBSelection = ({
  cosmosSelection,
  intl
}: Props) => {
  const { vscode } = React.useContext(AppContext);
  const dispatch = useDispatch();

  const openCosmosDbModalAndSendTelemetry = () => {
    sendTelemetry(vscode, EXTENSION_COMMANDS.TRACK_OPEN_COSMOSDB_SERVICE_MODAL_FROM_SERVICES_LIST)
    dispatch(openCosmosDbModalAction());
  }

  const onEditKeyDownHandler = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === KEY_EVENTS.ENTER || event.key === KEY_EVENTS.SPACE) {
      openCosmosDbModalAndSendTelemetry();
    }
  };
  return (
    <React.Fragment>
      {cosmosSelection && (
        <React.Fragment>
          <div className={styles.headerContainer}>
            <div>{intl.formatMessage(messages.title)}</div>
            <div
              role="button"
              tabIndex={0}
              className={styles.edit}
              onClick={openCosmosDbModalAndSendTelemetry}
              onKeyDown={onEditKeyDownHandler}
            >
              <EditIcon className={styles.editIcon} />
            </div>
          </div>
          <SidebarItem
                cosmosDB={true}
                customInputStyle={styles.input}
                key={cosmosSelection.accountName}
                text={cosmosSelection.accountName}
                withIndent={true}
                handleCloseClick={()=> dispatch(removeCosmosDbAction())}
                idx={1}
              />
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default injectIntl(CosmosDBSelection);
