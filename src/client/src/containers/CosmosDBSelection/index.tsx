import _ from "lodash";
import * as React from "react";
import { connect } from "react-redux";

import * as getSvg from "../../utils/getSvgUrl";

import DraggableSidebarItem from "../../components/DraggableSidebarItem";

import { removeCosmosSelectionAction } from "../../actions/azureActions/saveCosmosDbSettings";
import { ICosmosDB } from "../../reducers/wizardSelectionReducers/services/cosmosDbReducer";

import { openCosmosDbModalAction } from "../../actions/modalActions/modalActions";

import styles from "./styles.module.css";

import { injectIntl, FormattedMessage, InjectedIntlProps } from "react-intl";
import { ThunkDispatch } from "redux-thunk";
import { AppState } from "../../reducers";
import RootAction from "../../actions/ActionType";

interface IProps {
  cosmosSelection: ICosmosDB;
}

interface IDispatchProps {
  removeCosmosResource: (selectionIndex: number) => any;
  openCosmosDbModal: () => any;
}

type Props = IProps & IDispatchProps & InjectedIntlProps;

// This component lives in "containers" because the accountName can change via redux in the future
const CosmosDBSelection = ({
  cosmosSelection,
  removeCosmosResource,
  openCosmosDbModal,
  intl
}: Props) => {
  const { serviceType } = cosmosSelection.wizardContent;
  const onEditKeyDownHandler = (event: any) => {
    if (event.keyCode === 13 || event.keyCode === 32) {
      openCosmosDbModal();
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
              onClick={openCosmosDbModal}
              onKeyDown={onEditKeyDownHandler}
            >
              <FormattedMessage
                id="cosmosDBSelection.edit"
                defaultMessage="Edit"
              />
            </div>
          </div>
          {cosmosSelection.selection.map((resource: any, idx: number) => {
            const { accountName } = resource;
            return (
              <DraggableSidebarItem
                customInputStyle={styles.input}
                key={accountName}
                text={accountName}
                closeSvgUrl={getSvg.getCancelSvg()}
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
  null,
  mapDispatchToProps
)(injectIntl(CosmosDBSelection));
