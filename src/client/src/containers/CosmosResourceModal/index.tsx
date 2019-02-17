import * as React from "react";
import { connect } from "react-redux";

import asModal from "../../components/Modal";

import { closeModalAction } from "../../actions/modalActions";

import { isCosmosDbModalOpenSelector } from "../../selectors/modalSelector";

interface IDispatchProps {
    closeModal: () => any;
}

interface IStateProps {
    isModalOpen: boolean;
}

type Props = IDispatchProps & IStateProps;

class CosmosResourceModal extends React.Component<Props> {
    public render() {
        return (
            <div>
                <h2>Hello</h2>
                <button onClick={this.props.closeModal}>close</button>
                <div>I am a modal</div>
                <form>
                    <input />
                    <button>tab navigation</button>
                    <button>stays</button>
                    <button>inside</button>
                    <button>the modal</button>
                </form>
            </div>
        )
    }
}

const mapStateToProps = (state: any): IStateProps => {
    return {
        isModalOpen: isCosmosDbModalOpenSelector(state),
    }
}

const mapDispatchToProps = (dispatch: any): IDispatchProps => ({
    closeModal: () => { dispatch(closeModalAction()) },
});

export default connect(mapStateToProps, mapDispatchToProps)(asModal(CosmosResourceModal));