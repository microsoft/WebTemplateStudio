import * as React from "react";
import { INTL_MESSAGES, KEY_EVENTS } from "../../utils/constants/constants";

import styles from "./styles.module.css";
import buttonStyles from "../../css/buttonStyles.module.css";
import { IValidation } from "../../utils/validations/validations";
import classNames from "classnames";

import { injectIntl, InjectedIntlProps } from "react-intl";

import messages from "./messages";
import stylesInput from "../../css/input.module.css";
import classnames from "classnames";

interface IProps {
  handleSaveClick: () => any;
  value: string;
  validation?: IValidation;
  isEmpty: boolean;
  placeholder?: string;
}
const OutputPath = ({ handleSaveClick, value, isEmpty, intl, placeholder }: IProps & InjectedIntlProps) => {
  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === KEY_EVENTS.ENTER || event.key === KEY_EVENTS.SPACE) {
      handleSaveClick();
    }
  };

  return (
    <>
      <div className={styles.container} tabIndex={0} onKeyDown={handleKeyDown}>
        <div className={styles.errorStack}>
          <div className={styles.outputPath} onClick={handleSaveClick}>
            <input
              aria-label={intl.formatMessage(messages.ariaOutputPathLabel)}
              value={value}
              placeholder={placeholder}
              disabled={true}
              className={classnames(stylesInput.input, styles.pathInput)}
            />
          </div>
          {isEmpty && (
            <div className={styles.errorMessage}>
              {intl.formatMessage(INTL_MESSAGES.EMPTY_FIELD, {
                fieldId: intl.formatMessage(messages.outputPath),
              })}
            </div>
          )}
        </div>
        <button
          className={classNames(buttonStyles.buttonHighlighted, styles.browseButton)}
          onClick={handleSaveClick}
          tabIndex={-1}
        >
          {intl.formatMessage(messages.browseButtonLabel)}
        </button>
      </div>
    </>
  );
};

export default injectIntl(OutputPath);
