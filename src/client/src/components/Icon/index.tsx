import * as React from "react";

import styles from "./styles.module.css";

export interface IIconProps {
  name: string;
  svgBase64?: string;
  small?: boolean;
}

const Icon = ({ name, svgBase64, small = false }: IIconProps) => {
  return (
    <>
      {svgBase64 ? (
        <img className={small ? styles.small : styles.icon} alt={name} src={"data:image/svg+xml;base64," + svgBase64} />
      ) : (
        <img className={styles.icon} />
      )}
    </>
  );
};

export default Icon;
