import * as React from "react";

import LoginCard from "../../components/LoginCard";
import Title from "../../components/Title";

import styles from './styles.module.css';

class AzureLogin extends React.Component {
    public render() {
        return (
            <div>
                <Title>
                    Attach services to your web application
                </Title>
                <div className={styles.loginCard}>
                    <LoginCard cardTitle="Microsoft Azure Deployment" cardBody="Use Azure to help build, manage, and deploy applications on a massive, global network. Sign in to your subscription account to get started." />
                </div>
            </div>
        )
    }
}

export default AzureLogin;
