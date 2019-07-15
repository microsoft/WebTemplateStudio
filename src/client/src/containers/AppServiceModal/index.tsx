/**
 * This component uses React Hooks in lieu of Class Components.
 * https://reactjs.org/docs/hooks-intro.html
 */
import classnames from "classnames";
import * as React from "react";
import asModal from "../../components/Modal";
import { isAppServiceModalOpenSelector } from "../../selectors/modalSelector";
import { closeModalAction } from "../../actions/modalActions/modalActions";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import RootAction from "../../actions/ActionType";
import { AppState } from "../../reducers";
import styles from "./styles.module.css";
import { azureMessages as azureModalMessages } from "../../mockData/azureServiceOptions";

interface IStateProps {
  isModalOpen: boolean;
}

interface IDispatchProps {
  closeModal: () => any;
}

type Props = IStateProps & IDispatchProps;

const AppServiceModal = (props: Props) => {
  return <div>{"hello"}</div>;
};

const mapStateToProps = (state: AppState): IStateProps => ({
  isModalOpen: isAppServiceModalOpenSelector(state)
  // vscode: getVSCodeApiSelector(state),
  // subscriptionData: state.azureProfileData.subscriptionData,
  // subscriptions: state.azureProfileData.profileData.subscriptions,
  // appNameAvailability:
  //   state.selection.services.azureFunctions.appNameAvailability,
  // isValidatingName: state.selection.isValidatingName,
  // selection: getFunctionsSelection(state),
  // chooseExistingRadioButtonSelected:
  //   state.selection.services.azureFunctions.chooseExistingRadioButtonSelected
});

const mapDispatchToProps = (
  dispatch: Dispatch<RootAction>
): IDispatchProps => ({
  closeModal: () => {
    dispatch(closeModalAction());
  }
  // saveAzureFunctionsOptions: (azureFunctionsOptions: any) => {
  //   dispatch(saveAzureFunctionsSettingsAction(azureFunctionsOptions));
  // },
  // setAppNameAvailability: (isAvailableObject: IAvailabilityFromExtension) =>
  //   dispatch(setAppNameAvailabilityAction(isAvailableObject)),
  // setValidationStatus: (status: boolean) =>
  //   dispatch(setAzureValidationStatusAction(status))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(asModal(AppServiceModal));
