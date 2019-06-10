import * as React from "react";

import Modal from "react-modal";

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
const getCustomStyles = (isPostGenModalOpen: boolean) => {
  return {
    overlay: {
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: "rgba(0, 0, 0, 0.6)"
    },
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      borderRadius: "0px",
      width: isPostGenModalOpen ? "30%" : "40%",
      padding: "2.4%",
      background: "var(--vscode-menu-background)",
      border: "0.5px solid var(--vscode-editor-foreground)"
    }
  };
};

interface IProps {
  closeModal: () => any;
  isModalOpen: boolean;
  isPostGenModalOpen: boolean;
}

const asModal = <P extends object>(
  WrappedComponent: React.ComponentType<P>
) => {
  return class extends React.Component<P & IProps> {
    static defaultProps = {
      isModalOpen: false,
      isPostGenModalOpen: false,
      closeModal: () => {}
    };
    render() {
      const { isPostGenModalOpen } = this.props;
      return (
        <Modal
          isOpen={this.props.isModalOpen}
          onRequestClose={this.props.closeModal}
          contentLabel="Modal Display"
          style={getCustomStyles(isPostGenModalOpen)}
          ariaHideApp={false}
        >
          <WrappedComponent {...this.props as P} />
        </Modal>
      );
    }
  };
};

export default asModal;
