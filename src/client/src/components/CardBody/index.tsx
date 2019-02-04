import * as React from 'react';

import styles from './styles.module.css';

const CardBody = ({ text }: { text: string }) => {
    return (
        <div className={styles.body}>
            { text }
        </div>
    )
}

export default CardBody