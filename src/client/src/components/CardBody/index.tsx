import * as React from 'react';

import styles from './styles.module.css';

const CardBody = ({ body }: { body: string }) => {
    return (
        <div className={styles.body}>
            { body }
        </div>
    )
}

export default CardBody