import * as React from "react";
import styles from './styles.module.css'

const InputTitle = ({ children }: { children: any }) => {
  return <div className={styles.title}>{children}</div>;
};

export default InputTitle;
