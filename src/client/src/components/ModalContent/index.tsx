import * as React from "react";
import { ReactNode } from "react";
import { useDispatch } from "react-redux";

import { ReactComponent as Cancel } from "../../assets/cancel.svg";
import { closeModalAction } from "../../store/navigation/modals/action";
import { KEY_EVENTS } from "../../utils/constants/constants";
import Title from "../Titles/Title";
import styles from "./styles.module.css";

interface IProps {
  children: ReactNode;
  title?: string;
  canClose?: boolean;
  onClose?: () => void;
}

const ModalContent = ({ title, onClose, canClose = true, children }: IProps): JSX.Element => {
  const dispatch = useDispatch();

  const handleOnClose = () => {
    onClose ? onClose() : dispatch(closeModalAction());
  };

  const cancelKeyDownHandler = (event: React.KeyboardEvent<SVGSVGElement>) => {
    if (event.key === KEY_EVENTS.ENTER || event.key === KEY_EVENTS.SPACE) {
      event.preventDefault();
      event.stopPropagation();
      handleOnClose();
    }
  };

  return (
    <div>
      <div className={styles.headerContainer}>
        {title && <Title>{title}</Title>}
        {canClose && (
          <Cancel
            tabIndex={0}
            className={styles.cancelIcon}
            onClick={handleOnClose}
            onKeyDown={cancelKeyDownHandler}
            data-testid="close-button"
          />
        )}
      </div>
      {children}
    </div>
  );
};

export default ModalContent;
