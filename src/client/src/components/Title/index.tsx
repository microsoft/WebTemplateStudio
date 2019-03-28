import * as React from "react";

import styles from "./styles.module.css";

const Title = ({ children }: { children: string }) => {
  return <div className={styles.title}>{children}</div>;
};

export default Title;
