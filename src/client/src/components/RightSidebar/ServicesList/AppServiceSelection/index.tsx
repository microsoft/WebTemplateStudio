import React, { useContext, useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { injectIntl, InjectedIntlProps } from "react-intl";

import { AppContext } from "../../../../AppContext";
import { IAppService } from "../../../../store/userSelection/services/appService/model";
import { removeAppServiceAction } from "../../../../store/userSelection/services/appService/action";
import { openAppServiceModalAction } from "../../../../store/navigation/modals/action";
import { EXTENSION_COMMANDS } from "../../../../utils/constants/commands";
import { SERVICE_KEYS } from "../../../../utils/constants/constants";
import { sendTelemetry } from "../../../../utils/extensionService/extensionService";

import messages from "./messages";
import SidebarItem from "../SidebarItem";
import styles from "./styles.module.css";

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
          <div className={styles.headerContainer}>
            <div>{intl.formatMessage(messages.title)}</div>
          </div>
          <SidebarItem
            appService={true}
            svgBase64={appServiceSelection.svgBase64}
            editable={false} //itemNameEditable does not make sense for AppServices
            configurable={true} //we may need to update this in the future if we add this to the templates
            customInputStyle={styles.input}
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
