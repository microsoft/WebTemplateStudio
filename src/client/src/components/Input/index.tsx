import classnames from "classnames";
import * as React from "react";

import styles from "./styles.module.css";

interface IProps {
  handleChange: (e: React.SyntheticEvent<HTMLInputElement>) => any;
  handleKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => any;
  ariaLabel: string;
  value?: string;
  customStyle?: string;
  placeholder?: string;
  maxLength?: number;
  autoFocus?: boolean;
}

const Input = ({
  handleChange,
  ariaLabel,
  value,
  customStyle,
  placeholder,
  maxLength,
  handleKeyDown,
  autoFocus
}: IProps) => {
  return (
    <input
      aria-label={ariaLabel}
      onChange={handleChange}
      onKeyDown={handleKeyDown}
      placeholder={placeholder}
      className={classnames(styles.input, customStyle)}
      value={value}
      maxLength={maxLength}
      autoFocus={autoFocus}
    />
  );
};

export default Input;
