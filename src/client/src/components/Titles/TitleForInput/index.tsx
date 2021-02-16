import * as React from "react";
import styles from './styles.module.css'

const InputTitle = ({ children }: { children: any }) : JSX.Element  => {
  return <div className={styles.title}>{children}</div>;
};

export default InputTitle;
