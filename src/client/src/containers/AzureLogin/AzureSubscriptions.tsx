import * as React from "react";
import { connect } from "react-redux";

import AzureProfileCard from "../../components/AzureProfileCard";

import styles from './styles.module.css';

import * as AzureActions from "../../actions/logOutAzure";

interface IDispatchProps {
    startLogOutToAzure: () => any;
}

interface IAzureLoginProps {
    isLoggedIn: boolean;
}

type Props = IDispatchProps & IAzureLoginProps;

class AzureLogin extends React.Component<Props> {
    public render() {
        const { isLoggedIn } = this.props;
        return (
            <div>
                {isLoggedIn && 
                    <AzureProfileCard 
                        handleSignOut={() => { this.props.startLogOutToAzure() }}
                        cardTitle="Your Azure Account" 
                        name="Kelly Ng"
                        email="t-keng@microsoft.com"
                    />}
            </div>
        )
    }
}

const mapStateToProps = (state: any): IAzureLoginProps => {
    const { isLoggedIn } = state.azureProfileData;
    return {
        isLoggedIn,
    }
}

const mapDispatchToProps = (dispatch: any): IDispatchProps => ({
    startLogOutToAzure: () => { dispatch(AzureActions.startLogOutAzure()) },
})

export default connect(mapStateToProps, mapDispatchToProps)(AzureLogin);
