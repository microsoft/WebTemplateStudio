import classnames from "classnames";
import * as React from "react";
import { connect } from "react-redux";

import SummaryTile from "../../components/SummaryTile";

import styles from "./styles.module.css";

import { IFunctionApp } from "../AzureFunctionsSelection";
import { RowType } from "../../types/rowType";

import * as AzureFunctionActions from "../../actions/azureActions/azureFunctionActions";
import { FormattedMessage } from "react-intl";
import { AppState } from "../../reducers";
import { Dispatch } from "redux";
import RootAction from "../../actions/ActionType";

interface IProps {
  selectionTitle: string;
  selectionRows: RowType[];
  isEditable?: boolean;
  modalOpeners?: { [key: string]: () => any };
}

interface IStateProps {
  functionApps: any;
}

interface IDispatchProps {
  updateFunctionNames: (functionApp: IFunctionApp) => any;
  removeAzureFunction: (functionIndex: number) => any;
}

type Props = IDispatchProps & IProps & IStateProps;

const SummarySection = ({
  selectionTitle,
  selectionRows,
  isEditable,
  removeAzureFunction,
  updateFunctionNames,
  functionApps,
  modalOpeners
}: Props) => {
  const handleAzureFuncNameChange = (newTitle: string, idx: number) => {
    const { functionNames } = functionApps.selection[0];
    if (functionNames != null) {
      functionNames[idx] = newTitle;
      updateFunctionNames({
        appIndex: 0,
        functionNames
      });
    }
  };
  const handleRemoveFunction = (functionIndex: number) => {
    removeAzureFunction(functionIndex);
  };
  const renderTile = (
    internalName: string | undefined,
    title: string,
    version: string,
    svgUrl?: string,
    author?: string,
    originalTitle?: string,
    canEdit?: boolean,
    serviceTitle?: FormattedMessage.MessageDescriptor,
    withIndent?: boolean,
    handleCloseClick?: (idx: number) => any,
    handleInputChange?: (newTitle: string, idx: number) => any,
    idx?: number
  ) => {
    return (
      <div className={styles.tileContainer} key={idx}>
        <SummaryTile
          title={title}
          version={version}
          svgUrl={svgUrl}
          internalName={internalName}
          author={author}
          originalTitle={originalTitle}
          serviceTitle={serviceTitle}
          isEditable={canEdit}
          withIndent={withIndent}
          handleCloseClick={handleCloseClick}
          handleInputChange={handleInputChange}
          idx={idx}
        />
      </div>
    );
  };
  return (
    <div className={styles.selectionContainer}>
      {selectionRows.map((selection: RowType, idx: number) => (
        <React.Fragment>
          <div
            className={classnames({
              [styles.headerContainer]: idx === 0,
              [styles.headerContainerRest]: idx > 0
            })}
          >
            {idx === 0 && (
              <div className={styles.selectionTitle}>{selectionTitle}</div>
            )}
            {modalOpeners && selection.internalName && (
              <div
                className={styles.editButton}
                onClick={modalOpeners[selection.internalName]}
              >
                <FormattedMessage
                  id="summarySection.editResource"
                  defaultMessage="Edit Resource"
                />
              </div>
            )}
          </div>

          {renderTile(
            selection.internalName,
            selection.title,
            selection.version,
            selection.svgUrl,
            selection.author,
            selection.originalTitle,
            isEditable,
            selection.serviceTitle
          )}
          {selection.functionNames &&
            selection.functionNames.map((functionName, idx: number) =>
              renderTile(
                undefined,
                functionName,
                "v1.0",
                undefined,
                undefined,
                undefined,
                true,
                undefined,
                true,
                handleRemoveFunction,
                handleAzureFuncNameChange,
                idx + 1
              )
            )}
        </React.Fragment>
      ))}
    </div>
  );
};

const mapStateToProps = (state: AppState): IStateProps => ({
  functionApps: state.selection.services.azureFunctions
});

const mapDispatchToProps = (dispatch: Dispatch<RootAction>): IDispatchProps => ({
  updateFunctionNames: (functionApp: IFunctionApp) => {
    dispatch(AzureFunctionActions.updateAzureFunctionNamesAction(functionApp));
  },
  removeAzureFunction: functionIndex => {
    dispatch(AzureFunctionActions.removeAzureFunctionAction(functionIndex));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SummarySection);
