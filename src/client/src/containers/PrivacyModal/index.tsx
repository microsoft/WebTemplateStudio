import classnames from "classnames";
import * as React from "react";
import { connect } from "react-redux";

import asModal from "../../components/Modal";
import { IDependency } from "../DependencyInfo";
import buttonStyles from "../../css/buttonStyles.module.css";
import styles from "./styles.module.css";
import { ReactComponent as Cancel } from "../../assets/cancel.svg";
import { isPrivacyModalOpenSelector } from "../../selectors/modalSelector";
import { KEY_EVENTS } from "../../utils/constants";

import { defineMessages, injectIntl, InjectedIntlProps } from "react-intl";
import { closeModalAction } from "../../actions/modalActions/modalActions";
import { AppState } from "../../reducers";
import { Dispatch } from "redux";
import RootAction from "../../actions/ActionType";

export interface IPrivacyModalData {
  redirectLink: string;
  redirectLinkLabel: string;
  privacyStatementLink: string;
}

interface IStateProps {
  isModalOpen: boolean;
  privacyData: IPrivacyModalData;
}

interface IDispatchProps {
  closeModal: () => any;
}

type Props = IStateProps & IDispatchProps & InjectedIntlProps;

const messages = defineMessages({
  beingRedirected: {
    id: "privacyModal.beingRedirected",
    defaultMessage: "You are being redirected."
  },
  thirdPartyWebsite: {
    id: "privacyModal.thirdPartyWebsite",
    defaultMessage:
      "You will be taken to {thirdPartyWebsite} which is a non-Microsoft service."
  },
  privacyStatement: {
    id: "privacyModal.privacyStatement",
    defaultMessage: "Privacy Statement"
  },
  OK: {
    id: "privacyModal.OK",
    defaultMessage: "OK"
  }
});

const PrivacyModal = (props: Props) => {
  const { privacyData, intl } = props;

  if (privacyData === null || privacyData === undefined) {
    return null;
  }

  const { redirectLink, privacyStatementLink, redirectLinkLabel } = privacyData;

  const cancelKeyDownHandler = (event: React.KeyboardEvent<SVGSVGElement>) => {
    if (event.key === KEY_EVENTS.ENTER || event.key === KEY_EVENTS.SPACE) {
      event.preventDefault();
      event.stopPropagation();
      props.closeModal();
    }
  };

  return (
    <div>
      <div className={styles.headerContainer}>
        <div className={styles.title}>
          {intl.formatMessage(messages.beingRedirected)}
        </div>
        <Cancel
          tabIndex={0}
          className={styles.cancelIcon}
          onClick={props.closeModal}
          onKeyDown={cancelKeyDownHandler}
        />
      </div>
      <div className={styles.section}>
        {intl.formatMessage(messages.thirdPartyWebsite, {
          thirdPartyWebsite: redirectLinkLabel
        })}
      </div>
      <div className={styles.footerContainer}>
        {privacyStatementLink && (
          <a
            target={"_blank"}
            rel="noreferrer noopener"
            className={styles.link}
            href={privacyStatementLink}
          >
            {intl.formatMessage(messages.privacyStatement)}
          </a>
        )}
        <a
          target={"_blank"}
          rel="noreferrer noopener"
          href={redirectLink}
          onClick={() => {
            props.closeModal();
          }}
          className={classnames(buttonStyles.buttonHighlighted, styles.button)}
        >
          {intl.formatMessage(messages.OK)}
        </a>
      </div>
    </div>
  );
};

const mapStateToProps = (state: AppState): IStateProps => {
  const privacyData = state.modals.openModal.modalData;
  return {
    isModalOpen: isPrivacyModalOpenSelector(state),
    privacyData
  };
};

const mapDispatchToProps = (
  dispatch: Dispatch<RootAction>
): IDispatchProps => ({
  closeModal: () => {
    dispatch(closeModalAction());
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(asModal(injectIntl(PrivacyModal)));
