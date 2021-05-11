import * as React from "react";
import { InjectedIntlProps, injectIntl } from "react-intl";
import { connect, useDispatch, useSelector } from "react-redux";

import CollapsibleInfoBox from "../../components/CollapsibleInfoBox";
import asModal from "../../components/Modal";
import ModalContent from "../../components/ModalContent";
import AzureAccount from "../../pages/AddServicesPage/AzureAccount";
import { AppState } from "../../store/combineReducers";
import { isLoggedInSelector } from "../../store/config/azure/selector";
import { closeModalAction } from "../../store/navigation/modals/action";
import * as ModalActions from "../../store/navigation/modals/action";
import { isAzureServicesModalOpenSelector } from "../../store/navigation/modals/selector";
import { AZURE_LINKS } from "../../utils/constants/azure";
import { WIZARD_CONTENT_FEATURES } from "../../utils/constants/internalNames";
import keyUpHandler from "../../utils/keyUpHandler";
import messages from "./messages";
import styles from "./styles.module.css";

interface IStateProps {
  isModalOpen: boolean;
  selectedAzureServiceName: string;
}

type Props = IStateProps & InjectedIntlProps;

const AzureServicesModal = (props: Props) => {
  const { formatMessage } = props.intl;
  const { selectedAzureServiceName } = props;
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state: AppState) => isLoggedInSelector(state));

  React.useEffect(() => {
    // close sign in modal and opens azure service form
    if (isLoggedIn) {
      dispatch(closeModalAction());
      if (selectedAzureServiceName === WIZARD_CONTENT_FEATURES.APP_SERVICE) {
        dispatch(ModalActions.openAppServiceModalAction());
      } else if (selectedAzureServiceName === WIZARD_CONTENT_FEATURES.COSMOS_DB) {
        dispatch(ModalActions.openCosmosDbModalAction());
      }
    }
  }, [isLoggedIn]);

  return (
    <ModalContent title={formatMessage(messages.getStartedWithAzure)}>
      <div>
        <CollapsibleInfoBox
          question={formatMessage(messages.freeAccountQuestion)}
          answer={formatMessage(messages.freeAccountAnswer)}
          initialAnswerShownState={true}
        />
        <CollapsibleInfoBox
          question={formatMessage(messages.paymentQuestion)}
          answer={formatMessage(messages.paymentAnswer)}
        />
        <CollapsibleInfoBox
          question={formatMessage(messages.freeTrialQuestion)}
          answer={formatMessage(messages.freeTrialAnswer)}
        />
        <CollapsibleInfoBox
          question={formatMessage(messages.freeTrialUpgradeQuestion)}
          answer={formatMessage(messages.freeTrialUpgradeAnswer)}
        />
        <p>
          <a href={AZURE_LINKS.CREATE_FREE_ACCOUNT_FAQ} onKeyUp={keyUpHandler}>
            {formatMessage(messages.azureReadMore)}
          </a>
        </p>
      </div>
      <div className={styles.footerContainer}>
        <AzureAccount />
      </div>
    </ModalContent>
  );
};

const mapStateToProps = (state: AppState): IStateProps => {
  return {
    isModalOpen: isAzureServicesModalOpenSelector(state),
    selectedAzureServiceName: state.navigation.modals.openModal.modalData,
  };
};

export default connect(mapStateToProps)(asModal(injectIntl(AzureServicesModal)));
