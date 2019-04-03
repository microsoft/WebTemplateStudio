import * as React from "react";

import { ReactComponent as SaveSVG } from "../../assets/folder.svg";
import Input from "../Input";
import { EMPTY_FIELD } from "../../utils/constants";

import styles from "./styles.module.css";

interface IProps {
  handleChange: (e: React.SyntheticEvent<HTMLInputElement>) => any;
  handleSaveClick: () => any;
  value: string;
  validation: any;
  isEmpty: boolean;
  placeholder?: string;
}

const OutputPath = ({
  handleChange,
  handleSaveClick,
  value,
  validation,
  isEmpty,
  placeholder
}: IProps) => {
  return (
    <React.Fragment>
      <div className={styles.errorStack}>
        <div className={styles.outputPath}>
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
        </div>
        {(validation.isInvalidProjectPath && (
          <div className={styles.errorMessage}>
            {validation.projectPathError}
          </div>
        )) ||
          (isEmpty && (
            <div className={styles.errorMessage}>
              {EMPTY_FIELD("Output path")}
            </div>
          ))}
      </div>
    </React.Fragment>
  );
};

export default OutputPath;
