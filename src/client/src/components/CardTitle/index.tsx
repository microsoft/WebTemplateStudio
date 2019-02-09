import * as React from "react";

import styles from "./styles.module.css";

const CardTitle = ({ title }: { title: string }) => {
  return <div className={styles.title}>{title}</div>;
};

export default CardTitle;
