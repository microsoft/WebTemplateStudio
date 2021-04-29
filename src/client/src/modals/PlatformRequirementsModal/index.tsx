import * as React from "react";
import { InjectedIntlProps, injectIntl } from "react-intl";
import { connect, useSelector } from "react-redux";

import asModal from "../../components/Modal";
import ModalContent from "../../components/ModalContent";
import { AppState } from "../../store/combineReducers";
import { getPlatformRequirementsSelector, getPlatformSelector } from "../../store/config/platform/selector";
import { isPlatformRequirementsModalOpenSelector } from "../../store/navigation/modals/selector";
import { NAVIGATION_MODAL_TYPES } from "../../store/navigation/typeKeys";
import { PLATFORM, WEB_TEMPLATE_STUDIO_LINKS } from "../../utils/constants/constants";
import messages from "./messages";
import RequirementItem from "./RequirementItem";
import styles from "./styles.module.css";

interface IStateProps {
  isModalOpen: boolean;
}

type Props = IStateProps & InjectedIntlProps;

const PlatformRequirementsModal = ({ intl }: Props) => {
  const platform = useSelector(getPlatformSelector);
  const platformRequirements = useSelector(getPlatformRequirementsSelector);
  const requirementsDoc =
    platform.id === PLATFORM.REACTNATIVE ? WEB_TEMPLATE_STUDIO_LINKS.REACT_NATIVE_REQUIREMENTS_DOC : undefined;

  return (
    <ModalContent title={intl.formatMessage(messages.developmentRequirements)}>
      <div>
        <div className={styles.subtitle}>{intl.formatMessage(messages.needToMeetFollowingRequirements)}</div>
        {platformRequirements &&
          platformRequirements.map((requirement, idx) => {
            return <RequirementItem item={requirement} key={idx} />;
          })}
      </div>
      <div className={styles.link}>
        <a target="_blank" rel="noreferrer noopener" href={requirementsDoc}>
          {intl.formatMessage(messages.reviewTheDocs)}
        </a>
      </div>
    </ModalContent>
  );
};

const mapStateToProps = (state: AppState): IStateProps => ({
  isModalOpen: isPlatformRequirementsModalOpenSelector(state),
});

export default connect(mapStateToProps)(
  asModal(injectIntl(PlatformRequirementsModal), NAVIGATION_MODAL_TYPES.VIEW_PLATFORM_REQUIREMENTS_MODAL)
);
