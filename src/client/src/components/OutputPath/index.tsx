import * as React from "react";
import Input from "../Input";
import { INTL_MESSAGES, KEY_EVENTS } from "../../utils/constants";

import styles from "./styles.module.css";
import buttonStyles from "../../css/buttonStyles.module.css";
import { IValidation } from "../../reducers/wizardSelectionReducers/updateOutputPath";
import classNames from "classnames";

import { injectIntl, defineMessages, InjectedIntlProps } from "react-intl";

const messages = defineMessages({
  outputPath: {
    id: "outputPath.outputPath",
    defaultMessage: "Output Path"
  },
  ariaOutputPathLabel: {
    id: "outputPath.ariaOutputPath",
    defaultMessage: "Input for Output Path"
  },
  browseButtonLabel: {
    id: "outputPath.browseButtonLabel",
    defaultMessage: "Browse"
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
  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === KEY_EVENTS.ENTER || event.key === KEY_EVENTS.SPACE) {
      handleSaveClick();
    }
  };

  return (
    <React.Fragment>
      <div className={styles.container} tabIndex={0} onKeyDown={handleKeyDown}>
        <div className={styles.errorStack}>
          <div className={styles.outputPath} onClick={handleSaveClick}>
            <Input
              handleChange={handleChange}
              ariaLabel={intl.formatMessage(messages.ariaOutputPathLabel)}
              value={value}
              customStyle={styles.pathInput}
              placeholder={placeholder}
              disabled={true}
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
        <button
          className={classNames(
            buttonStyles.buttonHighlighted,
            styles.browseButton
          )}
          onClick={handleSaveClick}
          tabIndex={-1}
        >
          {intl.formatMessage(messages.browseButtonLabel)}
        </button>
      </div>
    </React.Fragment>
  );
};

export default injectIntl(OutputPath);
