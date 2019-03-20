import classnames from "classnames";
import * as React from "react";

import styles from "./styles.module.css";

interface IProps {
    handleChange: (e: React.SyntheticEvent<HTMLInputElement>) => any;
    value?: string;
    customStyle?: string;
    placeholder?: string;
}

const Input = ({ handleChange, value, customStyle, placeholder }: IProps) => {
    return (
        <input
          onChange={handleChange}
          placeholder={placeholder}
          className={classnames(styles.input, customStyle)}
          value={value}
        />
    )
}

export default Input;