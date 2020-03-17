import * as React from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./styles.module.css";
import * as ModalActions from "../../../actions/modalActions/modalActions";
import { getVersionsSelector } from "../../../selectors/vscodeApiSelector";
import { IVersions } from "../../../types/version";
import { InjectedIntlProps, injectIntl } from "react-intl";
import { AppState } from "../../../reducers";
import { WEB_TEMPLATE_STUDIO_LINKS } from "../../../utils/constants";
import { IRedirectModalData } from "../../RedirectModal";
import messages from "./messages";

type Props = InjectedIntlProps;

const About = ({ intl }: Props) => {
  const versions: IVersions = useSelector((state: AppState) => getVersionsSelector(state));
  const { templatesVersion, wizardVersion } = versions;
  const { formatMessage } = intl;

  const dispatch = useDispatch();

  const openRedirectModal = (redirectLink: string) => {
    const feedbackLinkData: IRedirectModalData = {
      redirectLink,
      redirectLinkLabel: intl.formatMessage(
        messages.feedbackRedirectLinkLabel
      ),
      privacyStatementLink: "",
      isThirdPartyLink: false
    }
    dispatch(ModalActions.openRedirectModalAction(feedbackLinkData));
  }

  return (
    <div className={styles.container}>
      <div>
        <button
          data-testid="linkRepo"
          className={styles.buttonToLink}
          onClick={()=> openRedirectModal(WEB_TEMPLATE_STUDIO_LINKS.REPO)}>
          {formatMessage(messages.visitRepo)}
        </button>
      </div>
      <div>
        <button
          data-testid="linkIssues"
          className={styles.buttonToLink}
          onClick={()=> openRedirectModal(WEB_TEMPLATE_STUDIO_LINKS.ISSUES)}>
          {formatMessage(messages.reportIssue)}
        </button>
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

export default injectIntl(React.memo(About));
