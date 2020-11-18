import * as React from "react";
import { connect, useDispatch } from "react-redux";
import { InjectedIntlProps, injectIntl } from "react-intl";
import { AppState } from "../../store/combineReducers";
import styles from "./styles.module.css";
import asModal from "../../components/Modal";
import { closeModalAction } from "../../store/navigation/modals/action";
import Licenses from "./Licenses";
import { ReactComponent as Cancel } from "../../assets/cancel.svg";
import { isViewLicensesModalOpenSelector } from "../../store/navigation/modals/selector";
import { NAVIGATION_MODAL_TYPES } from "../../store/navigation/typeKeys";
import { KEY_EVENTS } from "../../utils/constants/constants";
import messages from "./messages";

interface IStateProps {
  isModalOpen: boolean;
}

type Props = IStateProps & InjectedIntlProps;

const ViewLicensesModal = ({ intl }: Props) => {
  const dispatch = useDispatch();
  const cancelKeyDownHandler = (event: React.KeyboardEvent<SVGSVGElement>) => {
    if (event.key === KEY_EVENTS.ENTER || event.key === KEY_EVENTS.SPACE) {
      event.preventDefault();
      event.stopPropagation();
      dispatch(closeModalAction());
    }
  };

  return (
    <div>
      <div className={styles.headerContainer}>
        <div className={styles.title}>
          {intl.formatMessage(messages.licenses)}
        </div>
        <Cancel
          tabIndex={0}
          className={styles.cancelIcon}
          onClick={()=> dispatch(closeModalAction())}
          onKeyDown={cancelKeyDownHandler}
        />
      </div>
      <Licenses />
    </div>
  );
};

const mapStateToProps = (state: AppState): IStateProps => ({
  isModalOpen: isViewLicensesModalOpenSelector(state)
});

export default connect(
  mapStateToProps
)(asModal(injectIntl(ViewLicensesModal), NAVIGATION_MODAL_TYPES.VIEW_LICENSES_MODAL));
