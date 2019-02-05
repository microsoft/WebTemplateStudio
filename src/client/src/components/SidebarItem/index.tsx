import * as React from 'react';

import styles from './styles.module.css';

const SidebarItem = ({ text }: { text: string }) => {
    return (
        <div className={styles.text}>
            { text }
        </div>
    )
}

export default SidebarItem;