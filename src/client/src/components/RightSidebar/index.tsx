import * as React from 'react';

import styles from './styles.module.css';

class RightSidebar extends React.Component {
    public render() {
        return (
            <div className={styles.container}>
                <div className={styles.title}>
                    Your Project Details
                </div>
            </div>
        )
    }
}

export default RightSidebar;