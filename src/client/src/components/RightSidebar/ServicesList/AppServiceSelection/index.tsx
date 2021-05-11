import React, { useContext, useEffect, useState } from "react";
import { InjectedIntlProps, injectIntl } from "react-intl";
import { useDispatch } from "react-redux";

import { AppContext } from "../../../../AppContext";
import { openAppServiceModalAction } from "../../../../store/navigation/modals/action";
import { removeAppServiceAction } from "../../../../store/userSelection/services/appService/action";
import { IAppService } from "../../../../store/userSelection/services/appService/model";
import { EXTENSION_COMMANDS } from "../../../../utils/constants/commands";
import { SERVICE_KEYS } from "../../../../utils/constants/constants";
import { sendTelemetry } from "../../../../utils/extensionService/extensionService";
import servicelistStyles from "../servicelistStyles.module.css";
import SidebarItem from "../SidebarItem";
import messages from "./messages";

interface IProps {
  appServiceSelection: IAppService | null;
}

type Props = IProps & InjectedIntlProps;

const AppServiceSelection = ({ appServiceSelection, intl }: Props) => {
  const dispatch = useDispatch();
  const { vscode } = useContext(AppContext);
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    if (openModal) {
      const azureServiceType = SERVICE_KEYS.APP_SERVICE;
      sendTelemetry(vscode, EXTENSION_COMMANDS.TRACK_OPEN_APP_SERVICE_MODAL_FROM_SERVICES_LIST, { azureServiceType });
    }
  }, [openModal]);

  return (
    <>
      {appServiceSelection && (
        <>
          <div className={servicelistStyles.headerContainer}>
            <div>{intl.formatMessage(messages.title)}</div>
          </div>
          <SidebarItem
            appService={true}
            icon={appServiceSelection.icon}
            editable={false} //itemNameEditable does not make sense for AppServices
            configurable={true} //we may need to update this in the future if we add this to the templates
            key={appServiceSelection.siteName}
            text={appServiceSelection.siteName}
            withIndent={true}
            handleOnCloseClick={() => dispatch(removeAppServiceAction())}
            handleConfigClick={() => {
              setOpenModal(!openModal);
              dispatch(openAppServiceModalAction());
            }}
            idx={1}
          />
        </>
      )}
    </>
  );
};

export default injectIntl(AppServiceSelection);
