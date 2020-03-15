import * as React from "react";
import { connect } from "react-redux";

import SidebarItem from "../SidebarItem";

import { removeAppServiceSettingsAction } from "../../../../actions/azureActions/appServiceActions";
import { IAppService } from "../../../../reducers/wizardSelectionReducers/services/appServiceReducer";
import { ReactComponent as EditIcon } from "../../../../assets/edit.svg";

import { openAppServiceModalAction } from "../../../../actions/modalActions/modalActions";

import styles from "./styles.module.css";
import { KEY_EVENTS, EXTENSION_COMMANDS } from "../../../../utils/constants";

import { injectIntl, InjectedIntlProps } from "react-intl";
import { ThunkDispatch } from "redux-thunk";
import { AppState } from "../../../../reducers";
import RootAction from "../../../../actions/ActionType";
import { IVSCodeObject } from "../../../../reducers/vscodeApiReducer";
import { getVSCodeApiSelector } from "../../../../selectors/vscodeApiSelector";
import { sendTelemetry } from "../../../../utils/extensionService/extensionService";

interface IProps {
  appServiceSelection: IAppService;
}

interface IStateProps {
  vscode: IVSCodeObject;
}

interface IDispatchProps {
  removeAppServiceResource: () => any;
  openAppServiceModalAction: () => any;
}

type Props = IProps & IStateProps & IDispatchProps & InjectedIntlProps;

const AppServiceSelection = ({
  appServiceSelection,
  removeAppServiceResource,
  openAppServiceModalAction,
  vscode,
  intl
}: Props) => {
  const { serviceType } = appServiceSelection.wizardContent;
  const openAppServiceModalAndSendTelemetry = () => {
    sendTelemetry(vscode, EXTENSION_COMMANDS.TRACK_OPEN_APP_SERVICE_MODAL_FROM_SERVICES_LIST)
    openAppServiceModalAction();
  }

  const onEditKeyDownHandler = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === KEY_EVENTS.ENTER || event.key === KEY_EVENTS.SPACE) {
      openAppServiceModalAndSendTelemetry();
    }
  };
  return (
    <React.Fragment>
      {appServiceSelection.selection && (
        <React.Fragment>
          <div className={styles.headerContainer}>
            <div>{intl.formatMessage(serviceType)}</div>
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
            key={appServiceSelection.selection.siteName}
            text={appServiceSelection.selection.siteName}
            withIndent={true}
            handleCloseClick={removeAppServiceResource}
            idx={1}
          />
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

const mapStateToProps = (state: AppState): IStateProps => ({
  vscode: getVSCodeApiSelector(state)
});

const mapDispatchToProps = (
  dispatch: ThunkDispatch<AppState, void, RootAction>
) => ({
  removeAppServiceResource: () => {
    dispatch(removeAppServiceSettingsAction());
  },
  openAppServiceModalAction: () => {
    dispatch(openAppServiceModalAction());
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(injectIntl(AppServiceSelection));