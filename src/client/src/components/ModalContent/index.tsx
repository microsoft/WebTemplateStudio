import * as React from "react";
import { ReactNode } from "react";
import { InjectedIntlProps, injectIntl } from "react-intl";
import { useDispatch } from "react-redux";

import { ReactComponent as CloseButton } from "../../assets/cancel.svg";
import { closeModalAction } from "../../store/navigation/modals/action";
import { KEY_EVENTS } from "../../utils/constants/constants";
import Title from "../Titles/Title";
import messages from "./messages";
import styles from "./styles.module.css";

interface IProps {
  children: ReactNode;
  title?: string;
  canClose?: boolean;
  onClose?: () => void;
}

type Props = IProps & InjectedIntlProps;

const ModalContent = ({ title, onClose, canClose = true, children, intl }: Props): JSX.Element => {
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
          <CloseButton
            tabIndex={0}
            className={styles.cancelIcon}
            onClick={handleOnClose}
            onKeyDown={cancelKeyDownHandler}
            data-testid="close-button"
            aria-label={intl.formatMessage(messages.ariaCloseModalLabel)}
          />
        )}
      </div>
      {children}
    </div>
  );
};

export default injectIntl(ModalContent);
