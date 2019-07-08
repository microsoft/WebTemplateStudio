import classnames from "classnames";
import * as React from "react";

import styles from "./styles.module.css";

interface IProps {
  handleChange: (e: React.SyntheticEvent<HTMLInputElement>) => any;
  ariaLabel: string;
  value?: string;
  customStyle?: string;
  placeholder?: string;
  maxLength?: number;
}

const Input = ({
  handleChange,
  ariaLabel,
  value,
  customStyle,
  placeholder,
  maxLength
}: IProps) => {
  return (
    <input
      aria-label={ariaLabel}
      onChange={handleChange}
      placeholder={placeholder}
      className={classnames(styles.input, customStyle)}
      value={value}
      maxLength={maxLength}
    />
  );
};

export default Input;
