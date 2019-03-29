import * as React from "react";

import { ReactComponent as SaveSVG } from "../../assets/folder.svg";
import Input from "../Input";

import styles from "./styles.module.css";

interface IProps {
  handleChange: (e: React.SyntheticEvent<HTMLInputElement>) => any;
  handleSaveClick: () => any;
  value: string;
  placeholder?: string;
}

const OutputPath = ({
  handleChange,
  handleSaveClick,
  value,
  placeholder
}: IProps) => {
  return (
    <React.Fragment>
      <Input
        handleChange={handleChange}
        value={value}
        customStyle={styles.pathInput}
        placeholder={placeholder}
      />
      <SaveSVG
        className={styles.saveIcon}
        onClick={() => {
          handleSaveClick();
        }}
      />
    </React.Fragment>
  );
};

export default OutputPath;
