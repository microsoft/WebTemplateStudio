import * as React from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";

import { AppState } from "../../reducers";
import styles from "./styles.module.css";
import asModal from "../../components/Modal";
import RootAction from "../../actions/ActionType";
import { closeModalAction } from "../../actions/modalActions/modalActions";
import SelectPages from "../SelectPages";
import { isAddPagesModalOpenSelector } from "../../selectors/modalSelector";
import { MODAL_TYPES } from "../../actions/modalActions/typeKeys";
import { KEY_EVENTS } from "../../utils/constants";
import classnames from "classnames";

import { ReactComponent as Cancel } from "../../assets/cancel.svg";

interface IStateProps {
  isModalOpen: boolean;
}

interface IDispatchProps {
  closeModal: () => any;
}

type Props = IStateProps & IDispatchProps;

const AddPagesModal = ({ closeModal }: Props) => {
  const cancelKeyDownHandler = (event: React.KeyboardEvent<SVGSVGElement>) => {
    if (event.key === KEY_EVENTS.ENTER || event.key === KEY_EVENTS.SPACE) {
      event.preventDefault();
      event.stopPropagation();
      closeModal();
    }
  };

  return (
    <div>
      <div className={styles.headerContainer}>
        <Cancel
          tabIndex={0}
          className={styles.icon}
          onClick={closeModal}
          onKeyDown={cancelKeyDownHandler}
        />
      </div>
      <SelectPages />
    </div>
  );
};

const mapStateToProps = (state: AppState): IStateProps => ({
  isModalOpen: isAddPagesModalOpenSelector(state)
});

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
)(asModal(AddPagesModal, MODAL_TYPES.ADD_PAGES_MODAL));
