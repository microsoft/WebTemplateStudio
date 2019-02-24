import * as React from "react";
import { connect } from "react-redux";

import LoginCard from "../../components/LoginCard";
import Title from "../../components/Title";

import styles from './styles.module.css';

import AzureSubscriptions from "../AzureSubscriptions";

interface IDispatchProps {
    startLoginToAzure: () => any;
}

interface IAzureLoginProps {
    isLoggedIn: boolean;
    vscode: any,
}

type Props = IDispatchProps & IAzureLoginProps;

class AzureLogin extends React.Component<Props> {
    handleClick = () => {
        // initiates a login command to VSCode ReactPanel class
        if (process.env.NODE_ENV === "production") {
            this.props.vscode.postMessage({
                command: "login",
            });
        } else {
            // @ts-ignore produces a mock login response from VSCode in development
            window.postMessage({
                command: "login",
                email: "devEnvironment@email.com"
            });
        }
    }
    public render() {
        const { isLoggedIn } = this.props;
        return (
            <div>
                <Title>
                    Attach services to your web application
                </Title>
                <div className={styles.loginCard}>
                    {!isLoggedIn && <LoginCard 
                        handleClick={() => { this.handleClick() }}
                        cardTitle="Microsoft Azure Deployment" 
                        cardBody="Use Azure to help build, manage, and deploy applications on a massive, global network. Sign in to your subscription account to get started." 
                    />}
                </div>
                <AzureSubscriptions />
            </div>
        )
    }
}

const mapStateToProps = (state: any): IAzureLoginProps => {
    const { isLoggedIn } = state.azureProfileData;
    const { vscodeObject } = state.vscode;
    return {
        isLoggedIn,
        vscode: vscodeObject,
    }
}

export default connect(mapStateToProps, null)(AzureLogin);
