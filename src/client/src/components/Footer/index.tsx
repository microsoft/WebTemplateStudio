import * as React from 'react';
import { withRouter, Link } from 'react-router-dom';
import { RouteComponentProps } from 'react-router';

import styles from './styles.module.css';

class Footer extends React.Component<RouteComponentProps> {
    public render() {
        // TODO: Needs access to redux to determine where each link should go to
        // TODO: Add previous paths through link prop to track state/history
        return (
            <div className={styles.footer}>
                <Link className={styles.button} to="/">
                    Back
                </Link>
                <Link className={styles.button} to="/">
                    Next
                </Link>
                <Link className={styles.button} to="/">
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