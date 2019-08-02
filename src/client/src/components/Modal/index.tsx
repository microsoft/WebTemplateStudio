import * as React from "react";

import Modal from "react-modal";
import { MODAL_TYPES, ModalType } from "../../actions/modalActions/typeKeys";

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
const getCustomStyles = (MODAL_TYPE: ModalType | undefined) => {
  // default width
  let CUSTOM_WIDTH = "50%";
  let backgroundColor = "var(--vscode-menu-background)";

  // depends on modal type, customize width
  if (
    MODAL_TYPE &&
    (MODAL_TYPE === MODAL_TYPES.POST_GEN_MODAL ||
      MODAL_TYPE === MODAL_TYPES.VIEW_LICENSES_MODAL)
  ) {
    CUSTOM_WIDTH = "40%";
  }

  if (MODAL_TYPE && MODAL_TYPE === MODAL_TYPES.ADD_PAGES_MODAL) {
    backgroundColor = "var(--vscode-editor-background)";
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
  return class extends React.Component<P & IProps> {
    static defaultProps = {
      closeModal: () => {},
      isModalOpen: false
    };
    render() {
      return (
        <Modal
          isOpen={this.props.isModalOpen}
          onRequestClose={this.props.closeModal}
          contentLabel="Modal Display"
          style={getCustomStyles(MODAL_TYPE)}
          ariaHideApp={false}
        >
          <WrappedComponent {...this.props as P} />
        </Modal>
      );
    }
  };
};

export default asModal;
