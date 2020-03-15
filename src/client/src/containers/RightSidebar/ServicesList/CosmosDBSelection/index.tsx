import _ from "lodash";
import * as React from "react";
import { connect } from "react-redux";

import SidebarItem from "../SidebarItem";

import { removeCosmosSelectionAction } from "../../../../actions/azureActions/saveCosmosDbSettings";
import { ICosmosDB } from "../../../../reducers/wizardSelectionReducers/services/cosmosDbReducer";
import { ReactComponent as EditIcon } from "../../../../assets/edit.svg";

import { openCosmosDbModalAction } from "../../../../actions/modalActions/modalActions";

import styles from "./styles.module.css";
import { KEY_EVENTS, EXTENSION_COMMANDS } from "../../../../utils/constants";

import { injectIntl, InjectedIntlProps } from "react-intl";
import { ThunkDispatch } from "redux-thunk";
import { AppState } from "../../../../reducers";
import RootAction from "../../../../actions/ActionType";
import { sendTelemetry } from "../../../../utils/extensionService/extensionService";
import { getVSCodeApiSelector } from "../../../../selectors/vscodeApiSelector";
import { IVSCodeObject } from "../../../../reducers/vscodeApiReducer";

interface IProps {
  cosmosSelection: ICosmosDB;
}

interface IStateProps {
  vscode: IVSCodeObject;
}

interface IDispatchProps {
  removeCosmosResource: (selectionIndex: number) => any;
  openCosmosDbModal: () => any;
}

type Props = IProps & IStateProps & IDispatchProps & InjectedIntlProps;

// This component lives in "containers" because the accountName can change via redux in the future
const CosmosDBSelection = ({
  cosmosSelection,
  removeCosmosResource,
  openCosmosDbModal,
  vscode,
  intl
}: Props) => {
  const { serviceType } = cosmosSelection.wizardContent;

  const openCosmosDbModalAndSendTelemetry = () => {
    sendTelemetry(vscode, EXTENSION_COMMANDS.TRACK_OPEN_COSMOSDB_SERVICE_MODAL_FROM_SERVICES_LIST)
    openCosmosDbModal();
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
                handleCloseClick={removeCosmosResource}
                idx={idx + 1}
              />
            );
          })}
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
  removeCosmosResource: (selectionIndex: number) => {
    dispatch(removeCosmosSelectionAction(selectionIndex));
  },
  openCosmosDbModal: () => {
    dispatch(openCosmosDbModalAction());
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(injectIntl(CosmosDBSelection));
