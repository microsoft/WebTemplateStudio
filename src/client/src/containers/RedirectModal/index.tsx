import classnames from "classnames";
import * as React from "react";
import { connect } from "react-redux";

import asModal from "../../components/Modal";
import buttonStyles from "../../css/buttonStyles.module.css";
import styles from "./styles.module.css";
import { ReactComponent as Cancel } from "../../assets/cancel.svg";
import { isRedirectModalOpenSelector } from "../../selectors/modalSelector";
import { KEY_EVENTS } from "../../utils/constants";

import { defineMessages, injectIntl, InjectedIntlProps } from "react-intl";
import { closeModalAction } from "../../actions/modalActions/modalActions";
import { AppState } from "../../reducers";
import { Dispatch } from "redux";
import RootAction from "../../actions/ActionType";
import keyUpHandler from "../../utils/keyUpHandler";

export interface IRedirectModalData {
  redirectLink: string;
  redirectLinkLabel: string;
  privacyStatementLink: string;
  isThirdPartyLink: boolean;
}

interface IStateProps {
  isModalOpen: boolean;
  privacyData: IRedirectModalData;
}

interface IDispatchProps {
  closeModal: () => any;
}

type Props = IStateProps & IDispatchProps & InjectedIntlProps;

const messages = defineMessages({
  beingRedirected: {
    id: "redirectModal.beingRedirected",
    defaultMessage: "You are being redirected"
  },
  thirdPartyWebsite: {
    id: "redirectModal.thirdPartyWebsite",
    defaultMessage:
      "You will be taken to {thirdPartyWebsite} which is a non-Microsoft service."
  },
  noneThirdPartyWebsite: {
    id: "redirectModal.noneThirdPartyWebsite",
    defaultMessage: "The link will take you to {noneThirdPartyWebsite}."
  },
  toContinue: {
    id: "redirectModal.toContinue",
    defaultMessage: "To continue, press ok."
  },
  privacyStatement: {
    id: "redirectModal.privacyStatement",
    defaultMessage: "Privacy Statement"
  },
  OK: {
    id: "redirectModal.OK",
    defaultMessage: "OK"
  }
});

const RedirectModal = (props: Props) => {
  const { privacyData, intl } = props;

  if (privacyData === null || privacyData === undefined) {
    return null;
  }

  const {
    redirectLink,
    privacyStatementLink,
    redirectLinkLabel,
    isThirdPartyLink
  } = privacyData;

  const cancelKeyDownHandler = (event: React.KeyboardEvent<SVGSVGElement>) => {
    if (event.key === KEY_EVENTS.ENTER || event.key === KEY_EVENTS.SPACE) {
      event.preventDefault();
      event.stopPropagation();
      props.closeModal();
    }
  };

  let content;
  if (isThirdPartyLink) {
    content = intl.formatMessage(messages.thirdPartyWebsite, {
      thirdPartyWebsite: redirectLinkLabel
    });
  } else {
    content = intl.formatMessage(messages.noneThirdPartyWebsite, {
      noneThirdPartyWebsite: redirectLinkLabel
    });
  }

  let footerLink;
  if (privacyStatementLink) {
    footerLink = (
      <a
        target={"_blank"}
        rel="noreferrer noopener"
        className={styles.link}
        href={privacyStatementLink}
        onKeyUp={keyUpHandler}
      >
        {intl.formatMessage(messages.privacyStatement)}
      </a>
    );
  }

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
        {content}
        <div>{intl.formatMessage(messages.toContinue)}</div>
      </div>
      <div
        className={classnames(styles.footerContainer, {
          [styles.spaceBetween]: footerLink,
          [styles.flexEnd]: !footerLink
        })}
      >
        {footerLink}
        <a
          target={"_blank"}
          rel="noreferrer noopener"
          href={redirectLink}
          onClick={() => {
            props.closeModal();
          }}
          className={classnames(buttonStyles.buttonHighlighted, styles.button)}
          onKeyUp={keyUpHandler}
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
    isModalOpen: isRedirectModalOpenSelector(state),
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
)(asModal(injectIntl(RedirectModal)));
