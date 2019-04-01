import _ from "lodash";
import * as React from "react";
import { connect } from "react-redux";

import * as getSvg from "../../utils/getSvgUrl";

import DraggableSidebarItem from "../../components/DraggableSidebarItem";

import { removeCosmosSelectionAction } from "../../actions/saveCosmosDbSettings";
import { ICosmosDB } from "../../reducers/wizardSelectionReducers/services/cosmosDbReducer";

import { openCosmosDbModalAction } from "../../actions/modalActions";

import styles from "./styles.module.css";

interface IProps {
  cosmosSelection: ICosmosDB;
}

interface IDispatchProps {
  removeCosmosResource: (selectionIndex: number) => any;
  openCosmosDbModal: () => any;
}

type Props = IProps & IDispatchProps;

// This component lives in "containers" because the accountName can change via redux in the future
const CosmosDBSelection = ({
  cosmosSelection,
  removeCosmosResource,
  openCosmosDbModal
}: Props) => {
  const { serviceType } = cosmosSelection.wizardContent;
  return (
    <React.Fragment>
      {!_.isEmpty(cosmosSelection.selection) && (
        <React.Fragment>
          <div className={styles.headerContainer}>
            <div>{serviceType}</div>
            <div className={styles.edit} onClick={openCosmosDbModal}>
              Edit
            </div>
          </div>
          {cosmosSelection.selection.map((resource: any, idx: number) => {
            const { accountName } = resource;
            return (
              <DraggableSidebarItem
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

const mapDispatchToProps = (dispatch: any) => ({
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
)(CosmosDBSelection);
