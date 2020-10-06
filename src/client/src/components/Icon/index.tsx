import * as React from "react";

import styles from "./styles.module.css";

export interface IIconProps {
  name: string;
  icon: string;
  small?: boolean;
}

const Icon = ({ name, icon, small = false }: IIconProps) => {
  return (
    <>
      <img className={small ? styles.small : styles.icon} alt={name} src={"data:image/svg+xml;base64," + icon} />
    </>
  );
};

export default Icon;
