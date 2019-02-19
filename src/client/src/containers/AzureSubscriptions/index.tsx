import * as React from "react";
import { connect } from "react-redux";

import Card from "../../components/Card";

import grid from "../../css/grid.module.css";

import getAzureServiceOptions from "../../mockData/azureServiceOptions";
import { IOption } from "../../types/option";

interface IAzureLoginProps {
    isLoggedIn: boolean;
}

interface IState {
    azureServices?: IOption[] | undefined;
}

type Props = IAzureLoginProps;

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
                <div className={grid.row}>
                    {!!this.state.azureServices && 
                        this.state.azureServices.map((option) => (
                            <div key={option.title} className={grid.col6}>
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
        )
    }
}

const mapStateToProps = (state: any): IAzureLoginProps => {
    const { isLoggedIn } = state.azureProfileData;
    return {
        isLoggedIn,
    }
}

export default connect(mapStateToProps)(AzureSubscriptions);
