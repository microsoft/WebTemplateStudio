import * as React from "react";

import styles from "./styles.module.css";

export interface IIconProps {
  name: string;
  svgUrl?: string;
  svgBase64?: string;
}

const Icon = ({ name, svgUrl, svgBase64 }: IIconProps) => {
  return (
    <>
      {svgBase64 && <img className={styles.icon} alt={name} src={"data:image/svg+xml;base64," + svgBase64} />}
      {svgUrl && <img className={styles.icon} alt={name} src={svgUrl} />}
    </>
  );
};

export default Icon;
