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
  autoFocus?: boolean;
  readOnly?: boolean;
  disabled?: boolean;
}

const Input = ({
  handleChange,
  ariaLabel,
  value,
  customStyle,
  placeholder,
  maxLength,
  autoFocus,
  readOnly,
  disabled
}: IProps) => {
  return (
    <input
      aria-label={ariaLabel}
      onChange={handleChange}
      placeholder={placeholder}
      className={classnames(styles.input, customStyle)}
      value={value}
      maxLength={maxLength}
      autoFocus={autoFocus}
      readOnly={readOnly}
      disabled={disabled}
    />
  );
};

export default Input;
