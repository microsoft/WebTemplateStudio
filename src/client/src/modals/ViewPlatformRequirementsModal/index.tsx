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
import { KEY_EVENTS } from "../../utils/constants/constants";
import messages from "./messages";
import { getPlatformRequirementsSelector } from "../../store/config/platform/selector";

interface IStateProps {
  isModalOpen: boolean;
}

type Props = IStateProps & InjectedIntlProps;

const ViewPlatformRequirementsModal = ({ intl }: Props) => {
  const dispatch = useDispatch();
  const platformRequirements = useSelector(getPlatformRequirementsSelector);

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
        <div className={styles.title}>{intl.formatMessage(messages.platformRequirements)}</div>
        <Cancel
          tabIndex={0}
          className={styles.cancelIcon}
          onClick={() => dispatch(closeModalAction())}
          onKeyDown={closeModalIfPressEnterOrSpaceKey}
        />
      </div>
      <div className={styles.body}>
        {platformRequirements && platformRequirements.map((requirement, idx) => {
         return (<p key={idx}>{requirement.name}</p>);
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
