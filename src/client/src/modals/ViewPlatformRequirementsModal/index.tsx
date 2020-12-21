import * as React from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import { InjectedIntlProps, injectIntl } from "react-intl";
import { AppState } from "../../store/combineReducers";
import styles from "./styles.module.css";
import asModal from "../../components/Modal";
import { closeModalAction } from "../../store/navigation/modals/action";
import { ReactComponent as Cancel } from "../../assets/cancel.svg";
import { isViewPlatformRequirementsModalOpenSelector } from "../../store/navigation/modals/selector";
import { NAVIGATION_MODAL_TYPES } from "../../store/navigation/typeKeys";
import { KEY_EVENTS, PLATFORM, WEB_TEMPLATE_STUDIO_LINKS } from "../../utils/constants/constants";
import messages from "./messages";
import { getPlatformRequirementsSelector, getPlatformSelector } from "../../store/config/platform/selector";
import RequirementItem from "./RequirementItem";

interface IStateProps {
  isModalOpen: boolean;
}

type Props = IStateProps & InjectedIntlProps;

const ViewPlatformRequirementsModal = ({ intl }: Props) => {
  const dispatch = useDispatch();
  const platform = useSelector(getPlatformSelector);
  const platformRequirements = useSelector(getPlatformRequirementsSelector);
  const requirementsDoc =
    platform.id === PLATFORM.REACTNATIVE ? WEB_TEMPLATE_STUDIO_LINKS.REACT_NATIVE_REQUIREMENTS_DOC : undefined;

  const closeModalIfPressEnterOrSpaceKey = (event: React.KeyboardEvent<SVGSVGElement>) => {
    if (event.key === KEY_EVENTS.ENTER || event.key === KEY_EVENTS.SPACE) {
      event.preventDefault();
      event.stopPropagation();
      dispatch(closeModalAction());
    }
  };

  return (
    <div>
      <div className={styles.headerContainer}>
        <div className={styles.title}>{intl.formatMessage(messages.developmentRequirements)}</div>
        <Cancel
          tabIndex={0}
          className={styles.cancelIcon}
          onClick={() => dispatch(closeModalAction())}
          onKeyDown={closeModalIfPressEnterOrSpaceKey}
        />
      </div>
      <div>
        <div className={styles.subtitle}>
          {intl.formatMessage(messages.checkAndInstallRequirements)}
          <a target="_blank" rel="noreferrer noopener" className={styles.link} href={requirementsDoc}>
            {intl.formatMessage(messages.reviewTheDocs)}
          </a>
        </div>
        {platformRequirements &&
          platformRequirements.map((requirement, idx) => {
            return <RequirementItem item={requirement} key={idx} />;
          })}
      </div>
    </div>
  );
};

const mapStateToProps = (state: AppState): IStateProps => ({
  isModalOpen: isViewPlatformRequirementsModalOpenSelector(state),
});

export default connect(mapStateToProps)(
  asModal(injectIntl(ViewPlatformRequirementsModal), NAVIGATION_MODAL_TYPES.VIEW_PLATFORM_REQUIREMENTS_MODAL)
);
