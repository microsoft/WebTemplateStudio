import * as React from "react";
import { ModalType, NAVIGATION_MODAL_TYPES } from "../../store/navigation/typeKeys";
//import ReactDOM from "react-dom";
import styles from "./styles.module.css";
import classnames from "classnames";

interface IProps {
  closeModal: () => any;
  isModalOpen: boolean;
}

/*class ModalClass extends React.Component {
  el: HTMLDivElement;
  modalRoot: HTMLDivElement;
  constructor(props: any) {
    super(props);
    this.el = document.getElementById('modal-el') as HTMLDivElement;
    this.modalRoot = document.getElementById('modal-root') as HTMLDivElement;
  }

  componentDidMount() {
    this.modalRoot.appendChild(this.el);
  }

  componentWillUnmount() {
    this.modalRoot.removeChild(this.el);
  }

  render() {
    return ReactDOM.createPortal(
      this.props.children,
      this.el
    );
  }
}*/

const asModal = <P extends object>(
  WrappedComponent: React.ComponentType<P>,
  MODAL_TYPE?: ModalType
) => {
  return class extends React.Component<P & IProps> {
    render() {
      return (
        <div className={classnames(styles.overlayModal)}>
          <div className={classnames(styles.contentModal,{
            [styles.width40percent]:MODAL_TYPE === NAVIGATION_MODAL_TYPES.GEN_MODAL || MODAL_TYPE === NAVIGATION_MODAL_TYPES.VIEW_LICENSES_MODAL,
            [styles.width50percent]:(MODAL_TYPE !== NAVIGATION_MODAL_TYPES.GEN_MODAL && MODAL_TYPE !== NAVIGATION_MODAL_TYPES.VIEW_LICENSES_MODAL)})}>
            <WrappedComponent {...this.props as P} />
          </div>
        </div>
      );
    }
  };
};

export default asModal;