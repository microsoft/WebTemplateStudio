import * as React from "react";
import { ReactNode } from "react";

import styles from "./styles.module.css";

const SectionTitle = ({ children }: { children: ReactNode }): JSX.Element => {
  return <h3 className={styles.title}>{children}</h3>;
};

export default SectionTitle;
