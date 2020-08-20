import * as React from "react";
import { useDispatch } from "react-redux";
import SidebarItem from "../SidebarItem";
import { IAppService } from "../../../../store/userSelection/services/appService/model";
import { ReactComponent as EditIcon } from "../../../../assets/edit.svg";
import styles from "./styles.module.css";
import { KEY_EVENTS } from "../../../../utils/constants/constants";
import { injectIntl, InjectedIntlProps } from "react-intl";
import { sendTelemetry } from "../../../../utils/extensionService/extensionService";
import { removeAppServiceAction } from "../../../../store/userSelection/services/appService/action";
import { AppContext } from "../../../../AppContext";
import { openAppServiceModalAction } from "../../../../store/navigation/modals/action";
import messages from "./messages";
import { EXTENSION_COMMANDS } from "../../../../utils/constants/commands";

interface IProps {
  appServiceSelection: IAppService | null;
}

type Props = IProps & InjectedIntlProps;

const AppServiceSelection = ({
  appServiceSelection,
  intl
}: Props) => {
  const { vscode } = React.useContext(AppContext);
  const dispatch = useDispatch();

  const openAppServiceModalAndSendTelemetry = () => {
    sendTelemetry(vscode, EXTENSION_COMMANDS.TRACK_OPEN_APP_SERVICE_MODAL_FROM_SERVICES_LIST)
    dispatch(openAppServiceModalAction());
  }

  const onEditKeyDownHandler = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === KEY_EVENTS.ENTER || event.key === KEY_EVENTS.SPACE) {
      openAppServiceModalAndSendTelemetry();
    }
  };
  return (
    <React.Fragment>
      {appServiceSelection && (
        <React.Fragment>
          <div className={styles.headerContainer}>
            <div>{intl.formatMessage(messages.title)}</div>
            <div
              role="button"
              tabIndex={0}
              className={styles.edit}
              onClick={openAppServiceModalAndSendTelemetry}
              onKeyDown={onEditKeyDownHandler}
            >
              <EditIcon className={styles.editIcon} />
            </div>
          </div>
          <SidebarItem
            appService={true}
            customInputStyle={styles.input}
            key={appServiceSelection.siteName}
            text={appServiceSelection.siteName}
            withIndent={true}
            handleCloseClick={()=> dispatch(removeAppServiceAction())}
            idx={1}
          />
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default injectIntl(AppServiceSelection);