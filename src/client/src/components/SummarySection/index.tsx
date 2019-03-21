import classnames from "classnames";
import * as React from "react";
import { connect } from "react-redux";

import SummaryTile from "../SummaryTile";

import styles from "./styles.module.css";

import { IFunctionApp } from "../../containers/AzureFunctionsSelection";
import { RowType } from "../../types/rowType";

import * as AzureFunctionActions from "../../actions/azureFunctionActions";

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
    title: string,
    svgUrl?: string,
    company?: string,
    originalTitle?: string,
    canEdit?: boolean,
    withIndent?: boolean,
    handleCloseClick?: (idx: number) => any,
    handleInputChange?: (newTitle: string, idx: number) => any,
    idx?: number
  ) => {
    return (
      <div className={styles.tileContainer} key={idx}>
        <SummaryTile
          title={title}
          version="v1.0"
          svgUrl={svgUrl}
          company={company}
          originalTitle={originalTitle}
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
                Edit Resource
              </div>
            )}
          </div>

          {renderTile(
            selection.title,
            selection.svgUrl,
            selection.company,
            selection.originalTitle,
            isEditable
          )}
          {selection.functionNames &&
            selection.functionNames.map((functionName, idx: number) =>
              renderTile(
                functionName,
                undefined,
                undefined,
                undefined,
                true,
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

const mapStateToProps = (state: any): IStateProps => ({
  functionApps: state.selection.services.azureFunctions
});

const mapDispatchToProps = (dispatch: any): IDispatchProps => ({
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
