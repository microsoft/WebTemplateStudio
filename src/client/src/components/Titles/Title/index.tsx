import * as React from "react";
import { ReactNode } from "react";

import styles from "./styles.module.css";

const Title = ({ children }: { children: ReactNode }): JSX.Element => {
  return <h2 className={styles.title}>{children}</h2>;
};

export default Title;
