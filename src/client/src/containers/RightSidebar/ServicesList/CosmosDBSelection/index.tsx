import _ from "lodash";
import * as React from "react";
import { useDispatch } from "react-redux";
import SidebarItem from "../SidebarItem";
import { ICosmosDB } from "../../../../store/azureProfileData/cosmosDb/model";
import { ReactComponent as EditIcon } from "../../../../assets/edit.svg";
import { openCosmosDbModalAction } from "../../../../store/modals/action";
import styles from "./styles.module.css";
import { KEY_EVENTS, EXTENSION_COMMANDS } from "../../../../utils/constants";
import { injectIntl, InjectedIntlProps } from "react-intl";
import { sendTelemetry } from "../../../../utils/extensionService/extensionService";
import { removeCosmosSelectionAction } from "../../../../store/azureProfileData/cosmosDb/action";
import { AppContext } from "../../../../AppContext";

interface IProps {
  cosmosSelection: ICosmosDB;
}

type Props = IProps & InjectedIntlProps;

const CosmosDBSelection = ({
  cosmosSelection,
  intl
}: Props) => {
  const { serviceType } = cosmosSelection.wizardContent;
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
      {!_.isEmpty(cosmosSelection.selection) && (
        <React.Fragment>
          <div className={styles.headerContainer}>
            <div>{intl.formatMessage(serviceType)}</div>
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
          {cosmosSelection.selection.map((resource: any, idx: number) => {
            const { accountName } = resource;
            return (
              <SidebarItem
                cosmosDB={true}
                customInputStyle={styles.input}
                key={`${accountName} ${idx + 1}`}
                text={accountName}
                withIndent={true}
                handleCloseClick={(selectionIndex: number)=> dispatch(removeCosmosSelectionAction(selectionIndex))}
                idx={idx + 1}
              />
            );
          })}
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default injectIntl(CosmosDBSelection);
