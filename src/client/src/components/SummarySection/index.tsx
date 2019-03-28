import * as React from "react";
import { connect } from "react-redux";

import SummaryTile from "../SummaryTile";

import { RowType } from "../../types/rowType";

import styles from "./styles.module.css";
import { IFunctionApp } from "../../containers/AzureFunctionsSelection";

import * as AzureFunctionActions from "../../actions/azureFunctionActions";

interface IProps {
  selectionTitle: string;
  selectionRows: RowType[];
  isEditable?: boolean;
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
  functionApps
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
    isEditable?: boolean,
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
          isEditable={isEditable}
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
      <div className={styles.selectionTitle}>{selectionTitle}</div>
      {selectionRows.map(selection => (
        <React.Fragment>
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
