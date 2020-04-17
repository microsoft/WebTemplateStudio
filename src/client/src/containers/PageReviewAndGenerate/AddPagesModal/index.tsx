import * as React from "react";
import { connect, useDispatch } from "react-redux";
import { AppState } from "../../../store/combineReducers";
import styles from "./styles.module.css";
import asModal from "../../../components/Modal";
import { closeModalAction } from "../../../store/navigation/modals/action";
import PageAddPages from "../../PageAddPages";
import { isAddPagesModalOpenSelector } from "../../../store/navigation/modals/selector";
import { NAVIGATION_MODAL_TYPES } from "../../../store/navigation/typeKeys";
import { KEY_EVENTS } from "../../../utils/constants";
import { ReactComponent as Cancel } from "../../../assets/cancel.svg";

interface IStateProps {
  isModalOpen: boolean;
}

type Props = IStateProps;

const AddPagesModal = () => {
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
        <Cancel
          tabIndex={0}
          className={styles.icon}
          onClick={() => dispatch(closeModalAction())}
          onKeyDown={cancelKeyDownHandler}
        />
      </div>
      <PageAddPages isModal={true} />
    </div>
  );
};

const mapStateToProps = (state: AppState): IStateProps => ({
  isModalOpen: isAddPagesModalOpenSelector(state)
});

export default connect(
  mapStateToProps
)(asModal(AddPagesModal, NAVIGATION_MODAL_TYPES.ADD_PAGES_MODAL));
