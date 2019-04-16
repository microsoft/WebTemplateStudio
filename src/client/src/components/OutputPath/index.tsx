import * as React from "react";

import { ReactComponent as SaveSVG } from "../../assets/folder.svg";
import Input from "../Input";
import { INTL_MESSAGES } from "../../utils/constants";

import styles from "./styles.module.css";

import { injectIntl, defineMessages, InjectedIntlProps } from "react-intl";

const messages = defineMessages({
  outputPath: {
    id: "outputPath.outputPath",
    defaultMessage: "Output Path"
  },
  ariaOutputPathLabel: {
    id: "outputPath.ariaOutputPath",
    defaultMessage: "Input for Output Path"
  }
});

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
  intl,
  placeholder
}: IProps & InjectedIntlProps) => {
  return (
    <React.Fragment>
      <div className={styles.errorStack}>
        <div className={styles.outputPath}>
          <Input
            handleChange={handleChange}
            ariaLabel={intl.formatMessage(messages.ariaOutputPathLabel)}
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
              {intl.formatMessage(INTL_MESSAGES.EMPTY_FIELD, {
                fieldId: intl.formatMessage(messages.outputPath)
              })}
            </div>
          ))}
      </div>
    </React.Fragment>
  );
};

export default injectIntl(OutputPath);
