import _ from "lodash";
import * as React from "react";
import { connect } from "react-redux";

import DraggableSidebarItem from "../../components/DraggableSidebarItem";

import { openAzureFunctionsModalAction } from "../../actions/modalActions/modalActions";

import * as getSvg from "../../utils/getSvgUrl";

import styles from "./styles.module.css";

import * as AzureFunctionActions from "../../actions/azureActions/azureFunctionActions";
import {
  IAzureFunctionsSelection,
  ISelectedAzureFunctionsService
} from "../../reducers/wizardSelectionReducers/services/azureFunctionsReducer";

import {
  FormattedMessage,
  injectIntl,
  InjectedIntlProps,
  defineMessages
} from "react-intl";
import RootAction from "../../actions/ActionType";
import { ThunkDispatch } from "redux-thunk";
import { AppState } from "../../reducers";
import { validateName } from "../../utils/validateName";

interface IProps {
  functionApps: IAzureFunctionsSelection;
}

export interface IFunctionName {
  title: string;
  isValidTitle: boolean;
  error: string;
  id: string;
}

export interface IFunctionApp {
  appIndex: number;
  functionNames: IFunctionName[];
}

interface IDispatchProps {
  updateFunctionNames: (functionApp: IFunctionApp) => any;
  removeAzureFunctionApp: (appIndex: number) => any;
  removeAzureFunction: (functionIndex: number) => any;
  openAzureFunctionsModal: () => any;
}

type Props = IProps & IDispatchProps & InjectedIntlProps;

const messages = defineMessages({
  duplicateFunctionName: {
    id: "azureFunctionsSelection.duplicateName",
    defaultMessage: "Function name has to be unique"
  }
});

/**
 *  The current implementation only allows for one Azure Function application to be created.
 *  This is stored in the redux state in an array at position 0, which is why the value of '0'
 *  is hardcoded in the current implementation.
 *
 *  In the future, more than one Azure Function app can be created, and can simply be appended
 *  to the array data structure holding the Azure Function app selections (see reducer for Azure Functions)
 */
const AzureFunctionsSelection = ({
  functionApps,
  updateFunctionNames,
  removeAzureFunctionApp,
  removeAzureFunction,
  openAzureFunctionsModal,
  intl
}: Props) => {
  const { selection } = functionApps;
  const { serviceType } = functionApps.wizardContent;
  const handleInputChange = (newTitle: string, idx: number) => {
    const { functionNames } = functionApps.selection[0];
    if (functionNames) {
      functionNames[idx].title = newTitle;
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
  const onEditKeyDownHandler = (event: any) => {
    if (event.keyCode === 13 || event.keyCode === 32) {
      openAzureFunctionsModal();
    }
  };
  return (
    <div>
      {!_.isEmpty(selection) &&
        selection.map(
          (functionApp: ISelectedAzureFunctionsService, idx: number) => (
            <React.Fragment key={serviceType + functionApp.appName.value + idx}>
              <div className={styles.headerContainer}>
                <div>{intl.formatMessage(serviceType)}</div>
                <div
                  tabIndex={0}
                  className={styles.edit}
                  onClick={openAzureFunctionsModal}
                  onKeyDown={onEditKeyDownHandler}
                  role="button"
                >
                  <FormattedMessage
                    id="azureFunctionsSelection.edit"
                    defaultMessage="Edit"
                  />
                </div>
              </div>
              <DraggableSidebarItem
                customInputStyle={styles.input}
                key={functionApp.appName.value + idx}
                text={functionApp.appName.value}
                closeSvgUrl={getSvg.getCancelSvg()}
                withIndent={true}
                idx={idx + 1}
                handleCloseClick={removeAzureFunctionApp}
              />
              {functionApp.functionNames &&
                functionApp.functionNames.map(
                  (functionName: IFunctionName, idx: number) => (
                    <DraggableSidebarItem
                      key={functionApp.appName.value + idx.toString()}
                      closeSvgUrl={getSvg.getCancelSvg()}
                      withLargeIndent={true}
                      azureFunctionName={functionName}
                      isAzureFunction={true}
                      handleInputChange={handleInputChange}
                      idx={idx + 1}
                      handleCloseClick={removeAzureFunction}
                    />
                  )
                )}
            </React.Fragment>
          )
        )}
    </div>
  );
};

const mapDispatchToProps = (
  dispatch: ThunkDispatch<AppState, void, RootAction>
): IDispatchProps => ({
  updateFunctionNames: (functionApp: IFunctionApp) => {
    dispatch(AzureFunctionActions.updateAzureFunctionNamesAction(functionApp));
  },
  removeAzureFunctionApp: appIndex => {
    dispatch(AzureFunctionActions.removeAzureFunctionAppAction(appIndex));
  },
  removeAzureFunction: functionIndex => {
    dispatch(AzureFunctionActions.removeAzureFunctionAction(functionIndex));
  },
  openAzureFunctionsModal: () => {
    dispatch(openAzureFunctionsModalAction());
  }
});

export default connect(
  null,
  mapDispatchToProps
)(injectIntl(AzureFunctionsSelection));
