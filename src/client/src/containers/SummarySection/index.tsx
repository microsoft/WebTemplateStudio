import classnames from "classnames";
import * as React from "react";
import { connect } from "react-redux";

import SummaryTile from "../../components/SummaryTile";

import { validateName } from "../../utils/validateName";

import styles from "./styles.module.css";

import { IFunctionApp } from "../AzureFunctionsSelection";
import { RowType } from "../../types/rowType";

import * as AzureFunctionActions from "../../actions/azureActions/azureFunctionActions";
import {
  FormattedMessage,
  injectIntl,
  InjectedIntlProps,
  defineMessages
} from "react-intl";
import { AppState } from "../../reducers";
import { Dispatch } from "redux";
import RootAction from "../../actions/ActionType";
import { WIZARD_CONTENT_INTERNAL_NAMES } from "../../utils/constants";
import { removeCosmosSelectionAction } from "../../actions/azureActions/saveCosmosDbSettings";

interface IProps {
  selectionTitle: string;
  selectionRows: RowType[];
  isEditable?: boolean;
  canDelete?: boolean;
}

interface IStateProps {
  functionApps: any;
}

interface IDispatchProps {
  updateFunctionNames: (functionApp: IFunctionApp) => any;
  removeAzureFunction: (functionIndex: number) => any;
  removeCosmosResource: (selectionIndex: number) => any;
  removeAzureFunctionApp: (appIndex: number) => any;
}

type Props = IDispatchProps & IProps & IStateProps & InjectedIntlProps;

const messages = defineMessages({
  duplicateFunctionName: {
    id: "summarySection.duplicateName",
    defaultMessage: "Function name has to be unique"
  }
});

const SummarySection = ({
  selectionTitle,
  selectionRows,
  isEditable,
  removeAzureFunction,
  updateFunctionNames,
  functionApps,
  intl,
  canDelete,
  removeCosmosResource,
  removeAzureFunctionApp
}: Props) => {
  const handleAzureFuncNameChange = (newTitle: string, idx: number) => {
    const { functionNames } = functionApps.selection[0];
    if (functionNames) {
      functionNames[idx].title = newTitle;
      functionNames[idx].isValidTitle = true;
      functionNames[idx].error = "";
      const validationResult = validateName(
        functionNames[idx].title,
        "function"
      );
      if (validationResult.error) {
        functionNames[idx].error = intl.formatMessage(validationResult.error);
      }
      functionNames[idx].isValidTitle = validationResult.isValid;
      for (let i = 0; i < functionNames.length; i++) {
        if (functionNames[i].title === functionNames[idx].title && i !== idx) {
          functionNames[idx].isValidTitle = false;
          functionNames[idx].error = intl.formatMessage(
            messages.duplicateFunctionName
          );
          break;
        }
      }
      updateFunctionNames({
        appIndex: 0,
        functionNames
      });
    }
  };
  const handleRemoveFunction = (functionIndex: number) => {
    removeAzureFunction(functionIndex);
  };
  const handleRemoveCosmosResource = () => {
    const COSMOS_RESOURCE_INDEX = 0;
    removeCosmosResource(COSMOS_RESOURCE_INDEX);
  };
  const handleRemoveAzureFunctionApp = () => {
    const AZURE_FUNCTIONS_APP_INDEX = 0;
    removeAzureFunctionApp(AZURE_FUNCTIONS_APP_INDEX);
  };
  const handleRemoveResourceMap = {
    [WIZARD_CONTENT_INTERNAL_NAMES.COSMOS_DB]: handleRemoveCosmosResource,
    [WIZARD_CONTENT_INTERNAL_NAMES.AZURE_FUNCTIONS]: handleRemoveAzureFunctionApp
  };
  const getRemovalResourceHandler = (internalName?: string) => {
    if (internalName) {
      return handleRemoveResourceMap[internalName];
    }
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
    idx?: number,
    error?: string | FormattedMessage.MessageDescriptor,
    id?: string,
    canDelete?: boolean
  ) => {
    return (
      <div className={styles.tileContainer} key={id ? id : idx}>
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
          error={error}
          canDelete={canDelete}
        />
      </div>
    );
  };
  return (
    <div className={styles.selectionContainer}>
      {selectionRows.map((selection: RowType, idx: number) => (
        <div key={JSON.stringify(`${selection.svgUrl} + ${idx}`)}>
          <div
            className={classnames({
              [styles.headerContainer]: idx === 0,
              [styles.headerContainerRest]: idx > 0
            })}
          >
            {idx === 0 && (
              <div className={styles.selectionTitle}>{selectionTitle}</div>
            )}
          </div>
          {renderTile(
            selection.internalName,
            selection.title,
            selection.version,
            selection.svgUrl,
            selection.author,
            selection.originalTitle,
            isEditable || canDelete,
            selection.serviceTitle,
            undefined,
            getRemovalResourceHandler(selection.internalName),
            undefined,
            idx + 1,
            undefined,
            undefined,
            canDelete
          )}
          {selection.functionNames &&
            selection.functionNames.map((functionName, idx: number) =>
              renderTile(
                undefined,
                functionName.title,
                "",
                undefined,
                undefined,
                undefined,
                true,
                undefined,
                true,
                handleRemoveFunction,
                handleAzureFuncNameChange,
                idx + 1,
                functionName.error,
                functionName.id
              )
            )}
        </div>
      ))}
    </div>
  );
};

const mapStateToProps = (state: AppState): IStateProps => ({
  functionApps: state.selection.services.azureFunctions
});

const mapDispatchToProps = (
  dispatch: Dispatch<RootAction>
): IDispatchProps => ({
  updateFunctionNames: (functionApp: IFunctionApp) => {
    dispatch(AzureFunctionActions.updateAzureFunctionNamesAction(functionApp));
  },
  removeAzureFunction: functionIndex => {
    dispatch(AzureFunctionActions.removeAzureFunctionAction(functionIndex));
  },
  removeCosmosResource: (selectionIndex: number) => {
    dispatch(removeCosmosSelectionAction(selectionIndex));
  },
  removeAzureFunctionApp: (appIndex: number) => {
    dispatch(AzureFunctionActions.removeAzureFunctionAppAction(appIndex));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(injectIntl(SummarySection));
