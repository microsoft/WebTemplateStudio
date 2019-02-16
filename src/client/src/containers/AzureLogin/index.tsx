import * as React from "react";
import { connect } from "react-redux";

import LoginCard from "../../components/LoginCard";
import Title from "../../components/Title";

import styles from './styles.module.css';

import * as AzureActions from "../../actions/logIntoAzure";

interface IDispatchProps {
    startLoginToAzure: () => any;
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
                <Title>
                    Attach services to your web application
                </Title>
                <div className={styles.loginCard}>
                    {!isLoggedIn && <LoginCard 
                        handleClick={() => { this.props.startLoginToAzure() }}
                        cardTitle="Microsoft Azure Deployment" 
                        cardBody="Use Azure to help build, manage, and deploy applications on a massive, global network. Sign in to your subscription account to get started." 
                    />}
                </div>
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
    startLoginToAzure: () => { dispatch(AzureActions.startLoginToAzure()) },
})

export default connect(mapStateToProps, mapDispatchToProps)(AzureLogin);
