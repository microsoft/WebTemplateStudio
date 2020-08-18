import * as React from "react";
import { ModalType } from "../../store/navigation/typeKeys";
import ReactDOM from "react-dom";
import styles from "./styles.module.css";
import classnames from "classnames";

/**
 * A Higher-Order Component that creates a modal from a normal React component
 * Design guidance from https://medium.com/@jrwebdev/react-higher-order-component-patterns-in-typescript-42278f7590fb
 *
 * Required Props:
 * isModalOpen to be supplied as a prop from the Wrapped component. Calculated via
 * derived state using a selector by defining a ModalType.
 *
 * closeModal to be supplied as a prop from the Wrapped component. Dispatches a global
 * action to remove modal state from the redux store.
 *
 * Custom styling guidance:
 * https://reactcommunity.org/react-modal/styles/
 */
/*const getCustomStyles = (MODAL_TYPE?: ModalType): Modal.Styles => {
  // default width
  let CUSTOM_WIDTH = "50%";
  const backgroundColor = "var(--vscode-menu-background)";

  // depends on modal type, customize width
  if (
    MODAL_TYPE &&
    (MODAL_TYPE === NAVIGATION_MODAL_TYPES.GEN_MODAL ||
      MODAL_TYPE === NAVIGATION_MODAL_TYPES.VIEW_LICENSES_MODAL)
  ) {
    CUSTOM_WIDTH = "40%";
  }
*/

interface IProps {
  closeModal: () => any;
  isModalOpen: boolean;
  el: React.ReactElement;
}

const modalRoot: any = document.getElementById('modal-root');
let el: any;

class ModalClass extends React.Component {
  constructor(props: any) {
    super(props);
    el = document.createElement('div');
  }

  componentDidMount() {
    // El elemento del portal se inserta en el árbol DOM después de
    // que se montan los hijos del Modal, lo que significa que los hijos
    // se montarán en un nodo DOM separado. Si un componente hijo
    // requiere estar conectado inmediatamente cuando se monta al árbol del DOM
    // por ejemplo, para medir un nodo DOM, o usar 'autoFocus' en un descendiente,
    // agrega el estado a Modal y renderiza solo a los hijos 
    // cuando se inserta Modal en el árbol DOM.
    modalRoot.appendChild(el);
  }

  componentWillUnmount() {
    modalRoot.removeChild(el);
  }

  render() {
    return ReactDOM.createPortal(
      this.props.children,
      el
    );
  }
}

const asModal = <P extends object>(
  WrappedComponent: React.ComponentType<P>,
  MODAL_TYPE?: ModalType
) => {
  const modalRoot = document.getElementById('modal-root');

  return class extends React.Component<P & IProps> {
    static defaultProps = {
      closeModal: () => void(0),
      isModalOpen: false
    };

    render() {
      return (
        <ModalClass>
          <div className={classnames(styles.overlayModal)} id="11">
            <div className={classnames(styles.contentModal)} id="22">
              <WrappedComponent {...this.props as P} />
            </div>
          </div>
        </ModalClass>
      );
    }
  };
};

export default asModal;