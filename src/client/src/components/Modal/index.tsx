import * as React from "react";

import Modal from "react-modal";
import { NAVIGATION_MODAL_TYPES, ModalType } from "../../store/navigation/typeKeys";

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
const getCustomStyles = (MODAL_TYPE?: ModalType): Modal.Styles => {
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

  return {
    overlay: {
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      zIndex: 2000,
      backgroundColor: "rgba(0, 0, 0, 0.6)"
    },
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      borderRadius: "3px",
      width: CUSTOM_WIDTH,
      padding: "4vh",
      background: backgroundColor,
      border: "0.5px solid var(--vscode-editor-foreground)",
      maxWidth: "700px",
      minWidth: "300px"
    }
  };
};

interface IProps {
  closeModal: () => any;
  isModalOpen: boolean;
}

const asModal = <P extends object>(
  WrappedComponent: React.ComponentType<P>,
  MODAL_TYPE?: ModalType
) => {
  const modalRoot:any = document.getElementById('modal-root');

  return class extends React.Component<P & IProps> {
    constructor(props : any){
      super(props);
    }

    componentDidMount() {
      // El elemento del portal se inserta en el árbol DOM después de
      // que se montan los hijos del Modal, lo que significa que los hijos
      // se montarán en un nodo DOM separado. Si un componente hijo
      // requiere estar conectado inmediatamente cuando se monta al árbol del DOM
      // por ejemplo, para medir un nodo DOM, o usar 'autoFocus' en un descendiente,
      // agrega el estado a Modal y renderiza solo a los hijos 
      // cuando se inserta Modal en el árbol DOM.
      //modalRoot.appendChild("ssss");
      debugger;
    }

    static defaultProps = {
      closeModal: () => void(0),
      isModalOpen: false
    };

    render() {
      return (
        <div id="kk">
          <h1>hhhhhhhhhhhhhhhhhhhh</h1>
        </div>
      );
    }
  };
};

export default asModal;