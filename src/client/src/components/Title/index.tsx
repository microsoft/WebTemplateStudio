import * as React from "react";

import styles from "./styles.module.css";

const Title = ({ children }: { children: string }) => {
  return <h1 className={styles.title}>{children}</h1>;
};

export default Title;
