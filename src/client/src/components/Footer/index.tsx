import * as React from 'react';
import { withRouter, Link } from 'react-router-dom';
import { RouteComponentProps } from 'react-router';

import styles from './styles.module.css';

class Footer extends React.Component<RouteComponentProps> {
    public render() {
        // TODO: Needs access to redux to determine where each link should go to
        // TODO: Add previous paths through link prop to track state/history

        // TODO: Remove this navigation once redux is implemented
        const { pathname } = this.props.location;
        const pathsNext: any = {
            "/SelectWebApp": "/selectFrontEnd",
            "/selectFrontEnd": "/selectBackEnd",
            "/selectBackEnd": "/selectPages"
        }
        const pathsBack: any = {
            "/selectFrontEnd": "/selectWebApp",
            "/selectBackEnd": "/selectFrontEnd",
            "/selectPages": "/selectBackEnd"
        }

        return (
            <div className={styles.footer}>
                <Link className={styles.button} to={pathsBack[pathname] === undefined ? "/" : pathsBack[pathname]}>
                    Back
                </Link>
                <Link className={styles.button} to={pathsNext[pathname] === undefined ? "/" : pathsNext[pathname]}>
                    Next
                </Link>
                <Link className={styles.button} to={pathname}>
                    Generate
                </Link>
                <Link className={styles.button} to="/">
                    Cancel
                </Link>
            </div>
        )
    }
}

export default withRouter(Footer);