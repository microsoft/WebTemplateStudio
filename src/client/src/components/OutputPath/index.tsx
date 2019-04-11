import * as React from "react";

import { ReactComponent as SaveSVG } from "../../assets/folder.svg";
import Input from "../Input";
import { INTL_MESSAGES } from "../../utils/constants";

import styles from "./styles.module.css";
import { IValidation } from "../../reducers/wizardSelectionReducers/updateOutputPath";

import { injectIntl, defineMessages, InjectedIntlProps } from "react-intl";

const messages = defineMessages({
  outputPath: {
    id: "outputPath.outputPath",
    defaultMessage: "Output Path"
  }
});

interface IProps {
  handleChange: (e: React.SyntheticEvent<HTMLInputElement>) => any;
  handleSaveClick: () => any;
  value: string;
  validation?: IValidation;
  isEmpty: boolean;
  placeholder?: string;
}

const OutputPath = ({
  handleChange,
  handleSaveClick,
  value,
  validation,
  isEmpty,
  intl,
  placeholder
}: IProps & InjectedIntlProps) => {
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
        {(isEmpty && (
          <div className={styles.errorMessage}>
            {intl.formatMessage(INTL_MESSAGES.EMPTY_FIELD, {
              fieldId: intl.formatMessage(messages.outputPath)
            })}
          </div>
        )) ||
          (validation && !validation.isValid && (
            <div className={styles.errorMessage}>{validation.error}</div>
          ))}
      </div>
    </React.Fragment>
  );
};

export default injectIntl(OutputPath);
