import * as React from "react";
import { connect } from "react-redux";

import styles from "./styles.module.css";
import { getVersionsSelector } from "../../selectors/vscodeApiSelector";
import { IVersions } from "../../types/version";
import { defineMessages, InjectedIntlProps, injectIntl } from "react-intl";
import { AppState } from "../../reducers";
import keyUpHandler from "../../utils/keyUpHandler";
import { WEB_TEMPLATE_STUDIO } from "../../utils/constants";

interface IStateProps {
  versions: IVersions;
}

type Props = IStateProps & InjectedIntlProps;

const messages = defineMessages({
  templatesVersion: {
    id: "about.templatesVersion",
    defaultMessage: "Templates version:"
  },
  wizardVersion: {
    id: "about.wizardVersion",
    defaultMessage: "Wizard version:"
  },
  about: {
    id: "about.about",
    defaultMessage: "About"
  }
});

const About = ({ versions, intl }: Props) => {
  const { templatesVersion, wizardVersion } = versions;
  const { formatMessage } = intl;
  return (
    <div className={styles.container}>
      <div className={styles.title}>{formatMessage(messages.about)}</div>
      <p className={styles.repo}>
        <a
          className={styles.link}
          target="_blank"
          href={WEB_TEMPLATE_STUDIO.REPO}
          onKeyUp={keyUpHandler}
        >
          Web Template Studio
        </a>
      </p>
      <div>
        {formatMessage(messages.templatesVersion) + ` ${templatesVersion}`}
      </div>
      <div>{formatMessage(messages.wizardVersion) + ` ${wizardVersion}`}</div>
    </div>
  );
};

const mapStateToProps = (state: AppState) => ({
  versions: getVersionsSelector(state)
});

export default connect(mapStateToProps)(injectIntl(About));
