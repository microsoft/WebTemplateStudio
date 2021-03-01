import * as React from "react";
import { InjectedIntlProps, injectIntl } from "react-intl";
import { connect, useDispatch } from "react-redux";

import { ReactComponent as Cancel } from "../../assets/cancel.svg";
import asModal from "../../components/Modal";
import Title from "../../components/Titles/Title";
import { AppState } from "../../store/combineReducers";
import { closeModalAction } from "../../store/navigation/modals/action";
import { isViewLicensesModalOpenSelector } from "../../store/navigation/modals/selector";
import { NAVIGATION_MODAL_TYPES } from "../../store/navigation/typeKeys";
import { KEY_EVENTS } from "../../utils/constants/constants";
import Licenses from "./Licenses";
import messages from "./messages";
import styles from "./styles.module.css";

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
        <Title>{intl.formatMessage(messages.licenses)}</Title>
        <Cancel
          tabIndex={0}
          className={styles.cancelIcon}
          onClick={() => dispatch(closeModalAction())}
          onKeyDown={cancelKeyDownHandler}
        />
      </div>
      <Licenses />
    </div>
  );
};

const mapStateToProps = (state: AppState): IStateProps => ({
  isModalOpen: isViewLicensesModalOpenSelector(state),
});

export default connect(mapStateToProps)(
  asModal(injectIntl(ViewLicensesModal), NAVIGATION_MODAL_TYPES.VIEW_LICENSES_MODAL)
);
