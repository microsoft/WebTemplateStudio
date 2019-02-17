import * as React from "react";
import { connect } from "react-redux";

import AzureProfileCard from "../../components/AzureProfileCard";
import Card from "../../components/Card";
import Title from "../../components/Title";

import grid from "../../css/grid.module.css";
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
            !isLoggedIn && 
                <div>
                    <div className={styles.subscriptionsContainer} >
                        <div className={styles.loginCard}>
                            <AzureProfileCard 
                                handleSignOut={() => { this.props.startLogOutToAzure() }}
                                cardTitle="Your Azure Account" 
                                name="Kelly Ng"
                                email="t-keng@microsoft.com"
                            />
                        </div>
                        <hr className={styles.hr} />
                    </div>
                    <Title>
                        Azure Services
                    </Title>
                    <div className={styles.subscriptionsContainer}>
                        <div className={grid.row}>
                            <div className={grid.col6}>
                                <Card 
                                    cardTitle="Azure Functions"
                                    cardBody="test"
                                    buttonText="Create Resource"
                                    handleButtonClick={()=>{}}
                                    handleDetailsClick={()=>{}}
                                />
                            </div>
                            <div className={grid.col6}>
                                <Card 
                                    cardTitle="Azure Functions"
                                    cardBody="test"
                                    buttonText="Create Resource"
                                    handleButtonClick={()=>{}}
                                    handleDetailsClick={()=>{}}
                                />
                            </div>
                        </div>
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
    startLogOutToAzure: () => { dispatch(AzureActions.startLogOutAzure()) },
})

export default connect(mapStateToProps, mapDispatchToProps)(AzureLogin);
