import * as React from "react";
import { connect, useDispatch, useSelector } from "react-redux";

import asModal from "../../components/Modal";

import { injectIntl, InjectedIntlProps } from "react-intl";
import { closeModalAction } from "../../store/navigation/modals/action";
import { AppState } from "../../store/combineReducers";
import { isAzureLoginModalOpenSelector } from "../../store/navigation/modals/selector";
import buttonStyles from "../../css/buttonStyles.module.css";
import styles from "./styles.module.css";
import classnames from "classnames";
import { FormattedMessage } from "react-intl";
import keyUpHandler from "../../utils/keyUpHandler";
import messages from "./messages";
import { KEY_EVENTS } from "../../utils/constants/constants";
import { ReactComponent as Cancel } from "../../assets/cancel.svg";
import CollapsibleInfoBox from "../../components/CollapsibleInfoBox";
import { WIZARD_CONTENT_INTERNAL_NAMES } from "../../utils/constants/internalNames";
import * as ModalActions from "../../store/navigation/modals/action";
import { azureLogin } from "../../utils/extensionService/extensionService";
import { AppContext } from "../../AppContext";
import { logIntoAzureActionAction } from "../../store/config/azure/action";
import { isLoggedInSelector } from "../../store/config/azure/selector";

interface IStateProps {
  isModalOpen: boolean;
  selectedAzureServiceName: string;
}

type Props = IStateProps & InjectedIntlProps;

const AzureLoginModal = (props: Props) => {
  const { formatMessage } = props.intl;
  const { selectedAzureServiceName } = props;
  const { vscode } = React.useContext(AppContext);
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state: AppState) => isLoggedInSelector(state));

  const handleSignInClick = () => {
    azureLogin(vscode).then((event)=>{
      const message = event.data;
      if (message.payload !== null) {
        const loginData = message.payload as AzureProfile;
        dispatch(logIntoAzureActionAction(loginData));
      }
    })
  };

  const cancelKeyDownHandler = (event: React.KeyboardEvent<SVGSVGElement>) => {
    if (event.key === KEY_EVENTS.ENTER || event.key === KEY_EVENTS.SPACE) {
      event.preventDefault();
      event.stopPropagation();
      dispatch(closeModalAction());
    }
  };

  React.useEffect(() => {
    // close sign in modal and opens azure service form
    if (isLoggedIn) {
      dispatch(closeModalAction());
      if (selectedAzureServiceName === WIZARD_CONTENT_INTERNAL_NAMES.APP_SERVICE) {
        dispatch(ModalActions.openAppServiceModalAction());
      } else if (selectedAzureServiceName === WIZARD_CONTENT_INTERNAL_NAMES.COSMOS_DB) {
        dispatch(ModalActions.openCosmosDbModalAction());
      }
    }
  }, [isLoggedIn]);

  return (
    <div>
      <div className={styles.headerContainer}>
        <div className={styles.title}>
          {formatMessage(messages.getStartedWithAzure)}
        </div>
        <Cancel
          tabIndex={0}
          className={styles.cancelIcon}
          onClick={()=> dispatch(closeModalAction())}
          onKeyDown={cancelKeyDownHandler}
        />
      </div>

      <div className={styles.questionaryContainer}>
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
        <div className={styles.paragraph}>
          <a
            className={styles.link}
            href="https://azure.microsoft.com/en-us/free/free-account-faq/"
            onKeyUp={keyUpHandler}
          >
            <FormattedMessage
              id="azureLoginModal.azureReadMore"
              defaultMessage="Learn more about the Azure free account. Read the FAQ >"
            />
          </a>
        </div>
      </div>
      <div className={styles.footerContainer}>
        <button
          onClick={handleSignInClick}
          className={classnames(buttonStyles.buttonDark, styles.button)}
        >
          <FormattedMessage
            id="azureLoginModal.signIn"
            defaultMessage="Sign In"
          />
        </button>
        <div className={styles.buttonContainer}>
          <button
            className={classnames(
              styles.button,
              styles.buttonNext,
              buttonStyles.buttonHighlighted
            )}
          >
            <a
              className={styles.linkToButton}
              href="https://azure.microsoft.com/free/"
              onKeyUp={keyUpHandler}
            >
              <FormattedMessage
                id="azureLoginModal.createAccount"
                defaultMessage="Create Free Account"
              />
            </a>
          </button>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state: AppState): IStateProps => {
  return {
    isModalOpen: isAzureLoginModalOpenSelector(state),
    selectedAzureServiceName: state.navigation.modals.openModal.modalData
  };
};

export default connect(mapStateToProps)(asModal(injectIntl(AzureLoginModal)));
