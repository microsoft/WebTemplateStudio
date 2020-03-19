import * as React from "react";
import { connect } from "react-redux";
import styles from "./styles.module.css";
import { getVersionsSelector } from "../../../selectors/vscodeApiSelector";
import { IVersions } from "../../../types/version";
import { InjectedIntlProps, injectIntl } from "react-intl";
import { AppState } from "../../../reducers";
import { WEB_TEMPLATE_STUDIO_LINKS } from "../../../utils/constants";
import messages from "./messages";

interface IStateProps {
  versions: IVersions;
}

type Props = IStateProps & InjectedIntlProps;

const About = ({ versions, intl }: Props) => {
  const { templatesVersion, wizardVersion } = versions;
  const { formatMessage } = intl;

  return (
    <div className={styles.container}>
      <div>
        <a
          className={styles.buttonToLink}
          href={WEB_TEMPLATE_STUDIO_LINKS.REPO}
          target={"_blank"}
          rel="noreferrer noopener"
        >
          {formatMessage(messages.visitRepo)}
        </a>
      </div>
      <div>
        <a
          target={"_blank"}
          rel="noreferrer noopener"
          className={styles.buttonToLink}
          href={WEB_TEMPLATE_STUDIO_LINKS.ISSUES}
        >
          {formatMessage(messages.reportIssue)}
        </a>
      </div>

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

export default connect(
  mapStateToProps
)(injectIntl(About));