import * as React from "react";
import { connect } from "react-redux";

import styles from "./styles.module.css";
import { getVersionsSelector } from "../../selectors/vscodeApiSelector";
import { IVersions } from "../../types/version";
import { defineMessages, InjectedIntlProps, injectIntl } from "react-intl";
import { AppState } from "../../reducers";
import keyUpHandler from "../../utils/keyUpHandler";
import { WEB_TEMPLATE_STUDIO_LINKS } from "../../utils/constants";

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
  reportIssue: {
    id: "about.reportAnIssue",
    defaultMessage: "Report an issue"
  },
  visitRepo: {
    id: "about.visitRepo",
    defaultMessage: "Visit our Github"
  }
});

const About = ({ versions, intl }: Props) => {
  const { templatesVersion, wizardVersion } = versions;
  const { formatMessage } = intl;
  return (
    <div className={styles.container}>
      <p className={styles.repo}>
        <a
          target="_blank"
          rel="noopener noreferrer"
          className={styles.link}
          target="_blank"
          href={WEB_TEMPLATE_STUDIO_LINKS.REPO}
          onKeyUp={keyUpHandler}
        >
          {formatMessage(messages.visitRepo)}
        </a>
        <a
          className={styles.link}
          href="https://github.com/Microsoft/WebTemplateStudio/issues"
        >
          {formatMessage(messages.reportIssue)}
        </a>
      </p>
      <div className={styles.wizardInfo}>
        {formatMessage(messages.templatesVersion) + ` ${templatesVersion}`}
      </div>
      <div className={styles.wizardInfo}>
        {formatMessage(messages.wizardVersion) + ` ${wizardVersion}`}
      </div>
    </div>
  );
};

const mapStateToProps = (state: AppState) => ({
  versions: getVersionsSelector(state)
});

export default connect(mapStateToProps)(injectIntl(About));
