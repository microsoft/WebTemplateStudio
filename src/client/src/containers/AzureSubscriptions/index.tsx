import * as React from "react";
import { connect } from "react-redux";

import AzureProfileCard from "../../components/AzureProfileCard";
import Card from "../../components/Card";
import Title from "../../components/Title";

import grid from "../../css/grid.module.css";
import styles from './styles.module.css';

import * as AzureActions from "../../actions/logOutAzure";

import { IOption } from "../../types/option";
import getAzureServiceOptions from "../../mockData/azureServiceOptions";

interface IDispatchProps {
    startLogOutToAzure: () => any;
}

interface IAzureLoginProps {
    isLoggedIn: boolean;
}

interface IState {
    azureServices?: IOption[] | undefined;
}

type Props = IDispatchProps & IAzureLoginProps;

class AzureSubscriptions extends React.Component<Props,IState> {
    constructor(props: any) {
        super(props);
        this.state = {
            azureServices: undefined,
        };
    }
    public async componentDidMount() {
        const azureServices = await getAzureServiceOptions();
        this.setState({
            azureServices
        })
    }
    public render() {
        const { isLoggedIn } = this.props;
        return (
            isLoggedIn && 
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
                    <div className={grid.row}>
                        {!!this.state.azureServices && 
                            this.state.azureServices.map((option) => (
                                <div className={grid.col6}>
                                    <Card
                                        cardTitle={option.title}
                                        cardBody={option.body}
                                        buttonText="Create Resource"
                                        handleButtonClick={()=>{}}
                                        handleDetailsClick={()=>{}}
                                        svgUrl={option.svgUrl}
                                    />
                                </div>
                        ))}
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

export default connect(mapStateToProps, mapDispatchToProps)(AzureSubscriptions);
